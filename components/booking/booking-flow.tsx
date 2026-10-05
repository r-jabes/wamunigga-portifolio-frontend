"use client";

import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ButtonLink } from "@/components/ui/button-link";
import { Text } from "@/components/ui/text";
import { bookingConfig } from "@/data/content/booking-config";
import { getActiveBarbers } from "@/data/content/barbers";
import {
  formatServiceDuration,
  formatServicePrice,
  getServiceById,
  services,
} from "@/data/content/services";
import { buildBookingWhatsAppUrl } from "@/lib/booking/whatsapp";
import type { BookingRecord } from "@/lib/booking/types";
import { fetchWithTimeout, NetworkTimeoutError } from "@/lib/network";
import { cn } from "@/lib/utils";
import { focusRingClass } from "@/lib/a11y";

type Step =
  | "service"
  | "barber"
  | "date"
  | "time"
  | "details"
  | "confirm"
  | "success";

function getFlowSteps(): Step[] {
  const base: Step[] = [
    "service",
    "barber",
    "date",
    "time",
    "details",
    "confirm",
    "success",
  ];
  if (bookingConfig.requireBarberSelection) return base;
  return base.filter((step) => step !== "barber");
}

function formatDisplayDate(iso: string): string {
  return new Date(`${iso}T12:00:00`).toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function toErrorMessage(error: unknown, fallback: string): string {
  if (error instanceof NetworkTimeoutError) return error.message;
  if (error instanceof Error && error.message) return error.message;
  return fallback;
}

export function BookingFlow() {
  const searchParams = useSearchParams();
  const preselectedService = searchParams.get("service");
  const stepHeadingId = useId();
  const stepHeadingRef = useRef<HTMLHeadingElement>(null);

  const [step, setStep] = useState<Step>("service");
  const [serviceId, setServiceId] = useState(preselectedService ?? "");
  const [barberId, setBarberId] = useState<string | null>("team");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [dates, setDates] = useState<string[]>([]);
  const [slots, setSlots] = useState<string[]>([]);
  const [loadingDates, setLoadingDates] = useState(false);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [advancing, setAdvancing] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [booking, setBooking] = useState<BookingRecord | null>(null);

  const activeBarbers = getActiveBarbers();
  const selectedService = getServiceById(serviceId);

  const steps = getFlowSteps();
  const stepIndex = steps.indexOf(step);
  const progressSteps = steps.filter((item) => item !== "success");

  const loadDates = useCallback(async () => {
    setLoadingDates(true);
    setError(null);
    try {
      const response = await fetchWithTimeout("/api/booking/availability");
      if (!response.ok) {
        throw new Error("Could not load available dates.");
      }
      const data = (await response.json()) as { dates: string[] };
      setDates(data.dates ?? []);
      if ((data.dates ?? []).length === 0) {
        setError("No bookable dates right now. Try again later or message us.");
      }
    } catch (err) {
      setDates([]);
      setError(toErrorMessage(err, "Could not load dates. Check your connection."));
    } finally {
      setLoadingDates(false);
    }
  }, []);

  const loadSlots = useCallback(async (selectedDate: string, barber: string | null) => {
    setLoadingSlots(true);
    setError(null);
    try {
      const params = new URLSearchParams({ date: selectedDate });
      if (barber) params.set("barberId", barber);
      const response = await fetchWithTimeout(
        `/api/booking/availability?${params}`,
      );
      if (!response.ok) {
        throw new Error("Could not load times for this date.");
      }
      const data = (await response.json()) as { slots: string[] };
      setSlots(data.slots ?? []);
    } catch (err) {
      setSlots([]);
      setError(toErrorMessage(err, "Could not load times. Check your connection."));
    } finally {
      setLoadingSlots(false);
    }
  }, []);

  useEffect(() => {
    stepHeadingRef.current?.focus({ preventScroll: true });
  }, [step]);

  const canContinue = useMemo(() => {
    switch (step) {
      case "service":
        return Boolean(serviceId);
      case "barber":
        return bookingConfig.requireBarberSelection ? Boolean(barberId) : true;
      case "date":
        return Boolean(date) && !loadingDates;
      case "time":
        return Boolean(time) && !loadingSlots;
      case "details":
        return customerName.trim().length >= 2 && customerPhone.trim().length >= 8;
      default:
        return true;
    }
  }, [
    step,
    serviceId,
    barberId,
    date,
    time,
    customerName,
    customerPhone,
    loadingDates,
    loadingSlots,
  ]);

  const goNext = async () => {
    setError(null);
    setAdvancing(true);
    try {
      const next = steps[stepIndex + 1];
      if (next === "date" && dates.length === 0) {
        await loadDates();
      }
      if (next === "time" && date) {
        await loadSlots(date, barberId);
      }
      if (next) setStep(next);
    } finally {
      setAdvancing(false);
    }
  };

  const goBack = () => {
    setError(null);
    const prev = steps[stepIndex - 1];
    if (prev && prev !== "success") setStep(prev);
  };

  const submitBooking = async () => {
    setSubmitting(true);
    setError(null);
    try {
      const response = await fetchWithTimeout("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceId,
          barberId,
          date,
          time,
          customerName: customerName.trim(),
          customerPhone: customerPhone.trim(),
        }),
      });
      const data = (await response.json()) as {
        booking?: BookingRecord;
        error?: string;
      };
      if (!response.ok) {
        setError(data.error ?? "Could not create booking. That slot may be taken.");
        return;
      }
      setBooking(data.booking ?? null);
      setStep("success");
    } catch (err) {
      setError(toErrorMessage(err, "Network error. Try again."));
    } finally {
      setSubmitting(false);
    }
  };

  const whatsappUrl = booking ? buildBookingWhatsAppUrl(booking) : null;

  const stepTitle: Record<Step, string> = {
    service: "Select service",
    barber: "Select barber",
    date: "Select date",
    time: "Select time",
    details: "Your details",
    confirm: "Confirm booking",
    success: "Booking received",
  };

  return (
    <div className="flex flex-col gap-8">
      {step !== "success" ? (
        <ol
          className="flex flex-wrap gap-2"
          aria-label={`Booking progress, step ${stepIndex + 1} of ${progressSteps.length}`}
        >
          {progressSteps.map((item, index) => (
            <li
              key={item}
              className={cn(
                "type-label min-h-8 px-2 py-1",
                index <= stepIndex ? "text-ivory" : "text-ivory-subtle",
              )}
              aria-current={index === stepIndex ? "step" : undefined}
            >
              <span className="sr-only">
                {index + 1}. {stepTitle[item]}
                {index === stepIndex ? " (current)" : ""}
              </span>
              <span aria-hidden>{String(index + 1).padStart(2, "0")}</span>
            </li>
          ))}
        </ol>
      ) : null}

      <div aria-live="polite" aria-atomic="true">
        {error ? (
          <p
            className="border border-border-strong bg-surface px-4 py-3 type-body-sm text-ivory"
            role="alert"
          >
            {error}
          </p>
        ) : null}
      </div>

      {step === "service" ? (
        <fieldset className="flex flex-col gap-4 border-0 p-0">
          <Text
            as="legend"
            variant="heading"
            id={stepHeadingId}
            ref={stepHeadingRef}
            tabIndex={-1}
            className="outline-none"
          >
            {stepTitle.service}
          </Text>
          {services.length === 0 ? (
            <Text variant="body-sm" className="text-muted">
              No services listed yet. Check back soon.
            </Text>
          ) : (
            <ul className="flex flex-col gap-3">
              {services.map((service) => (
                <li key={service.id}>
                  <button
                    type="button"
                    data-cursor="interactive"
                    aria-pressed={serviceId === service.id}
                    onClick={() => setServiceId(service.id)}
                    className={cn(
                      "min-h-14 w-full border p-4 text-left transition-colors",
                      serviceId === service.id
                        ? "border-ivory bg-ivory/5"
                        : "border-border hover:border-border-strong",
                      focusRingClass,
                    )}
                  >
                    <Text variant="subhead" className="text-ivory">
                      {service.name}
                    </Text>
                    <Text variant="body-sm" className="mt-1 text-ivory-muted">
                      {formatServicePrice(service.price)} ·{" "}
                      {formatServiceDuration(service.duration)}
                    </Text>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </fieldset>
      ) : null}

      {step === "barber" ? (
        <fieldset className="flex flex-col gap-4 border-0 p-0">
          <Text
            as="legend"
            variant="heading"
            id={stepHeadingId}
            ref={stepHeadingRef}
            tabIndex={-1}
            className="outline-none"
          >
            {stepTitle.barber}
          </Text>
          <Text variant="body-sm" className="text-muted">
            Optional — choose a barber or any available chair.
          </Text>
          <ul className="flex flex-col gap-3">
            {activeBarbers.map((barber) => (
              <li key={barber.id}>
                <button
                  type="button"
                  aria-pressed={barberId === barber.id}
                  onClick={() => setBarberId(barber.id)}
                  className={cn(
                    "min-h-12 w-full border p-4 text-left type-label",
                    barberId === barber.id
                      ? "border-ivory text-ivory"
                      : "border-border text-ivory-subtle",
                    focusRingClass,
                  )}
                >
                  {barber.name}
                </button>
              </li>
            ))}
          </ul>
        </fieldset>
      ) : null}

      {step === "date" ? (
        <div className="flex flex-col gap-4">
          <Text
            as="h2"
            variant="heading"
            id={stepHeadingId}
            ref={stepHeadingRef}
            tabIndex={-1}
            className="outline-none"
          >
            {stepTitle.date}
          </Text>
          {loadingDates ? (
            <Text variant="body-sm" className="text-muted" role="status">
              Loading dates…
            </Text>
          ) : dates.length === 0 ? (
            <div className="flex flex-col gap-3">
              <Text variant="body-sm" className="text-muted">
                No dates available right now.
              </Text>
              <Button type="button" variant="secondary" onClick={() => void loadDates()}>
                Retry
              </Button>
            </div>
          ) : (
            <label className="flex flex-col gap-2">
              <span className="sr-only">Appointment date</span>
              <select
                value={date}
                onChange={(event) => {
                  const value = event.target.value;
                  setDate(value);
                  setTime("");
                  if (value) void loadSlots(value, barberId);
                }}
                className={cn(
                  "min-h-12 border border-border bg-surface px-4 type-body text-ivory",
                  focusRingClass,
                )}
              >
                <option value="">Choose a date</option>
                {dates.map((value) => (
                  <option key={value} value={value}>
                    {formatDisplayDate(value)}
                  </option>
                ))}
              </select>
            </label>
          )}
        </div>
      ) : null}

      {step === "time" ? (
        <div className="flex flex-col gap-4">
          <Text
            as="h2"
            variant="heading"
            id={stepHeadingId}
            ref={stepHeadingRef}
            tabIndex={-1}
            className="outline-none"
          >
            {stepTitle.time}
          </Text>
          {loadingSlots ? (
            <Text variant="body-sm" className="text-muted" role="status">
              Loading availability…
            </Text>
          ) : slots.length === 0 ? (
            <div className="flex flex-col gap-3">
              <Text variant="body-sm" className="text-muted">
                No slots available for this date.
              </Text>
              <Button
                type="button"
                variant="secondary"
                onClick={() => date && void loadSlots(date, barberId)}
              >
                Retry
              </Button>
            </div>
          ) : (
            <div
              className="grid grid-cols-3 gap-2 sm:grid-cols-4"
              role="radiogroup"
              aria-label="Available times"
            >
              {slots.map((slot) => (
                <button
                  key={slot}
                  type="button"
                  role="radio"
                  aria-checked={time === slot}
                  onClick={() => setTime(slot)}
                  className={cn(
                    "min-h-12 w-full border py-3 type-label",
                    time === slot
                      ? "border-ivory bg-ivory text-background"
                      : "border-border text-ivory-subtle hover:border-border-strong",
                    focusRingClass,
                  )}
                >
                  {slot}
                </button>
              ))}
            </div>
          )}
        </div>
      ) : null}

      {step === "details" ? (
        <div className="flex flex-col gap-4">
          <Text
            as="h2"
            variant="heading"
            id={stepHeadingId}
            ref={stepHeadingRef}
            tabIndex={-1}
            className="outline-none"
          >
            {stepTitle.details}
          </Text>
          <label className="flex flex-col gap-2">
            <Text variant="label" className="text-ivory-subtle">
              Name
            </Text>
            <input
              value={customerName}
              onChange={(event) => setCustomerName(event.target.value)}
              className={cn(
                "min-h-12 border border-border bg-surface px-4 text-ivory",
                focusRingClass,
              )}
              autoComplete="name"
              required
              name="name"
            />
          </label>
          <label className="flex flex-col gap-2">
            <Text variant="label" className="text-ivory-subtle">
              Phone
            </Text>
            <input
              value={customerPhone}
              onChange={(event) => setCustomerPhone(event.target.value)}
              className={cn(
                "min-h-12 border border-border bg-surface px-4 text-ivory",
                focusRingClass,
              )}
              autoComplete="tel"
              inputMode="tel"
              required
              name="tel"
            />
          </label>
        </div>
      ) : null}

      {step === "confirm" && selectedService ? (
        <div className="flex flex-col gap-4 border border-border p-5">
          <Text
            as="h2"
            variant="heading"
            id={stepHeadingId}
            ref={stepHeadingRef}
            tabIndex={-1}
            className="outline-none"
          >
            {stepTitle.confirm}
          </Text>
          <dl className="flex flex-col gap-3">
            <div>
              <Text variant="label" className="text-ivory-subtle">
                Service
              </Text>
              <Text variant="body">{selectedService.name}</Text>
            </div>
            <div>
              <Text variant="label" className="text-ivory-subtle">
                When
              </Text>
              <Text variant="body">
                {formatDisplayDate(date)} · {time}
              </Text>
            </div>
            <div>
              <Text variant="label" className="text-ivory-subtle">
                Contact
              </Text>
              <Text variant="body">
                {customerName} · {customerPhone}
              </Text>
            </div>
          </dl>
        </div>
      ) : null}

      {step === "success" && booking ? (
        <div
          className="flex flex-col gap-6 border border-border p-5 sm:p-6"
          role="status"
        >
          <Text
            as="h2"
            variant="display-md"
            id={stepHeadingId}
            ref={stepHeadingRef}
            tabIndex={-1}
            className="outline-none"
          >
            {stepTitle.success}
          </Text>
          <Text variant="body" className="max-w-md text-ivory-muted">
            Your appointment request is in. We will confirm shortly — reference{" "}
            <span className="text-ivory">{booking.id.slice(0, 8)}</span>.
          </Text>
          {whatsappUrl ? (
            <ButtonLink href={whatsappUrl} external variant="primary" size="lg">
              Confirm via WhatsApp
            </ButtonLink>
          ) : (
            <Text variant="body-sm" className="text-muted">
              WhatsApp confirmation unlocks when the number is set in contact
              settings.
            </Text>
          )}
          <ButtonLink href="/" variant="secondary">
            Back to home
          </ButtonLink>
        </div>
      ) : null}

      {step !== "success" ? (
        <div className="flex flex-wrap gap-3">
          {stepIndex > 0 ? (
            <Button type="button" variant="ghost" onClick={goBack}>
              Back
            </Button>
          ) : null}
          {step === "confirm" ? (
            <Button
              type="button"
              onClick={() => void submitBooking()}
              isLoading={submitting}
              disabled={!canContinue || submitting}
            >
              Confirm booking
            </Button>
          ) : (
            <Button
              type="button"
              onClick={() => void goNext()}
              disabled={!canContinue || advancing}
              isLoading={advancing}
            >
              Continue
            </Button>
          )}
        </div>
      ) : null}
    </div>
  );
}
