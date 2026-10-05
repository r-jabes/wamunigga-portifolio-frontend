"use client";

import { useCallback, useMemo, useState } from "react";
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

export function BookingFlow() {
  const searchParams = useSearchParams();
  const preselectedService = searchParams.get("service");

  const [step, setStep] = useState<Step>("service");
  const [serviceId, setServiceId] = useState(preselectedService ?? "");
  const [barberId, setBarberId] = useState<string | null>("team");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [dates, setDates] = useState<string[]>([]);
  const [slots, setSlots] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [booking, setBooking] = useState<BookingRecord | null>(null);

  const activeBarbers = getActiveBarbers();
  const selectedService = getServiceById(serviceId);

  const steps = getFlowSteps();
  const stepIndex = steps.indexOf(step);

  const loadDates = useCallback(async () => {
    const response = await fetch("/api/booking/availability");
    const data = (await response.json()) as { dates: string[] };
    setDates(data.dates ?? []);
  }, []);

  const loadSlots = useCallback(async (selectedDate: string, barber: string | null) => {
    setLoadingSlots(true);
    setError(null);
    const params = new URLSearchParams({ date: selectedDate });
    if (barber) params.set("barberId", barber);
    const response = await fetch(`/api/booking/availability?${params}`);
    const data = (await response.json()) as { slots: string[] };
    setSlots(data.slots ?? []);
    setLoadingSlots(false);
  }, []);

  const canContinue = useMemo(() => {
    switch (step) {
      case "service":
        return Boolean(serviceId);
      case "barber":
        return bookingConfig.requireBarberSelection ? Boolean(barberId) : true;
      case "date":
        return Boolean(date);
      case "time":
        return Boolean(time);
      case "details":
        return customerName.trim().length >= 2 && customerPhone.trim().length >= 8;
      default:
        return true;
    }
  }, [step, serviceId, barberId, date, time, customerName, customerPhone]);

  const goNext = async () => {
    setError(null);
    const next = steps[stepIndex + 1];
    if (next === "date" && dates.length === 0) {
      await loadDates();
    }
    if (next === "time" && date) {
      await loadSlots(date, barberId);
    }
    if (next) setStep(next);
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
      const response = await fetch("/api/booking", {
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
        setError(data.error ?? "Could not create booking.");
        return;
      }
      setBooking(data.booking ?? null);
      setStep("success");
    } catch {
      setError("Network error. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const whatsappUrl = booking ? buildBookingWhatsAppUrl(booking) : null;

  return (
    <div className="flex flex-col gap-8">
      {step !== "success" ? (
        <div className="flex flex-wrap gap-2">
          {steps.slice(0, -1).map((item, index) => (
            <span
              key={item}
              className={cn(
                "type-label px-2 py-1",
                index <= stepIndex
                  ? "text-ivory"
                  : "text-ivory/25",
              )}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
          ))}
        </div>
      ) : null}

      {error ? (
        <p className="type-body-sm text-accent" role="alert">
          {error}
        </p>
      ) : null}

      {step === "service" ? (
        <div className="flex flex-col gap-4">
          <Text variant="heading">Select service</Text>
          <ul className="flex flex-col gap-3">
            {services.map((service) => (
              <li key={service.id}>
                <button
                  type="button"
                  data-cursor="interactive"
                  onClick={() => setServiceId(service.id)}
                  className={cn(
                    "w-full border p-4 text-left transition-colors",
                    serviceId === service.id
                      ? "border-ivory bg-ivory/5"
                      : "border-border hover:border-border-strong",
                    focusRingClass,
                  )}
                >
                  <Text variant="subhead" className="text-ivory">
                    {service.name}
                  </Text>
                  <Text variant="body-sm" className="mt-1">
                    {formatServicePrice(service.price)} ·{" "}
                    {formatServiceDuration(service.duration)}
                  </Text>
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {step === "barber" ? (
        <div className="flex flex-col gap-4">
          <Text variant="heading">Select barber</Text>
          <Text variant="body-sm" className="text-muted">
            Optional — choose a barber or any available chair.
          </Text>
          <ul className="flex flex-col gap-3">
            {activeBarbers.map((barber) => (
              <li key={barber.id}>
                <button
                  type="button"
                  onClick={() => setBarberId(barber.id)}
                  className={cn(
                    "w-full border p-4 text-left type-label",
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
        </div>
      ) : null}

      {step === "date" ? (
        <div className="flex flex-col gap-4">
          <Text variant="heading">Select date</Text>
          <select
            value={date}
            onChange={(event) => {
              const value = event.target.value;
              setDate(value);
              setTime("");
              if (value) void loadSlots(value, barberId);
            }}
            className={cn(
              "h-12 border border-border bg-surface px-4 type-body text-ivory",
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
        </div>
      ) : null}

      {step === "time" ? (
        <div className="flex flex-col gap-4">
          <Text variant="heading">Select time</Text>
          {loadingSlots ? (
            <Text variant="body-sm" className="text-muted">
              Loading availability…
            </Text>
          ) : slots.length === 0 ? (
            <Text variant="body-sm" className="text-muted">
              No slots available for this date.
            </Text>
          ) : (
            <ul className="grid grid-cols-3 gap-2 sm:grid-cols-4">
              {slots.map((slot) => (
                <li key={slot}>
                  <button
                    type="button"
                    onClick={() => setTime(slot)}
                    className={cn(
                      "w-full border py-3 type-label",
                      time === slot
                        ? "border-ivory bg-ivory text-background"
                        : "border-border text-ivory-subtle hover:border-border-strong",
                      focusRingClass,
                    )}
                  >
                    {slot}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : null}

      {step === "details" ? (
        <div className="flex flex-col gap-4">
          <Text variant="heading">Your details</Text>
          <label className="flex flex-col gap-2">
            <Text variant="label" className="text-ivory-subtle">
              Name
            </Text>
            <input
              value={customerName}
              onChange={(event) => setCustomerName(event.target.value)}
              className={cn(
                "h-12 border border-border bg-surface px-4 text-ivory",
                focusRingClass,
              )}
              autoComplete="name"
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
                "h-12 border border-border bg-surface px-4 text-ivory",
                focusRingClass,
              )}
              autoComplete="tel"
              inputMode="tel"
            />
          </label>
        </div>
      ) : null}

      {step === "confirm" && selectedService ? (
        <div className="flex flex-col gap-4 border border-border p-5">
          <Text variant="heading">Confirm booking</Text>
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
        <div className="flex flex-col gap-6 border border-border p-6">
          <Text variant="display-md">Booking received</Text>
          <Text variant="body" className="max-w-md text-ivory-muted">
            Your appointment request is in. We will confirm shortly — reference{" "}
            <span className="text-ivory">{booking.id.slice(0, 8)}</span>.
          </Text>
          {whatsappUrl ? (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-14 items-center justify-center bg-ivory px-8 text-sm font-medium uppercase tracking-[0.18em] text-background transition-colors hover:bg-ivory/90"
            >
              Confirm via WhatsApp
            </a>
          ) : (
            <Text variant="body-sm" className="text-muted">
              Add WhatsApp in `data/content/contact.ts` to enable one-tap confirmation.
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
              onClick={submitBooking}
              isLoading={submitting}
              disabled={!canContinue}
            >
              Confirm booking
            </Button>
          ) : (
            <Button type="button" onClick={goNext} disabled={!canContinue}>
              Continue
            </Button>
          )}
        </div>
      ) : null}
    </div>
  );
}
