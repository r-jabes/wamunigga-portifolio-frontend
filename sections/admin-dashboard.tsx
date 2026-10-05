"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  setAdminSessionToken,
  useAdminSessionToken,
} from "@/lib/admin/client-session";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { bookingConfig } from "@/data/content/booking-config";
import { bookingStatuses, type BookingRecord } from "@/lib/booking/types";
import { focusRingClass } from "@/lib/a11y";
import { cn } from "@/lib/utils";

type Tab = "bookings" | "availability" | "gallery" | "customers";

export function AdminDashboard() {
  const [token, setToken] = useState("");
  const storedToken = useAdminSessionToken();
  const [tab, setTab] = useState<Tab>("bookings");
  const [bookings, setBookings] = useState<BookingRecord[]>([]);
  const [availabilityJson, setAvailabilityJson] = useState("");
  const [galleryJson, setGalleryJson] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  const authHeaders = useMemo(
    () =>
      storedToken
        ? { Authorization: `Bearer ${storedToken}`, "Content-Type": "application/json" }
        : undefined,
    [storedToken],
  );

  const loadBookings = useCallback(async () => {
    if (!authHeaders) return;
    const response = await fetch("/api/admin/bookings", { headers: authHeaders });
    if (!response.ok) return;
    const data = (await response.json()) as { bookings: BookingRecord[] };
    setBookings(data.bookings);
  }, [authHeaders]);

  const loadAvailability = useCallback(async () => {
    if (!authHeaders) return;
    const response = await fetch("/api/admin/availability", { headers: authHeaders });
    if (!response.ok) return;
    const data = (await response.json()) as { config: unknown };
    setAvailabilityJson(JSON.stringify(data.config, null, 2));
  }, [authHeaders]);

  const loadGallery = useCallback(async () => {
    if (!authHeaders) return;
    const response = await fetch("/api/admin/gallery", { headers: authHeaders });
    if (!response.ok) return;
    const data = (await response.json()) as { overrides: unknown };
    setGalleryJson(JSON.stringify(data.overrides, null, 2));
  }, [authHeaders]);

  const refreshAll = useCallback(async () => {
    await loadBookings();
    await loadAvailability();
    await loadGallery();
  }, [loadBookings, loadAvailability, loadGallery]);

  useEffect(() => {
    if (!storedToken) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- load admin data when session is active
    void refreshAll();
  }, [storedToken, refreshAll]);

  const customers = useMemo(() => {
    const map = new Map<string, { name: string; phone: string; count: number }>();
    for (const booking of bookings) {
      const key = booking.customerPhone;
      const existing = map.get(key);
      if (existing) {
        existing.count += 1;
      } else {
        map.set(key, {
          name: booking.customerName,
          phone: booking.customerPhone,
          count: 1,
        });
      }
    }
    return [...map.values()];
  }, [bookings]);

  const signIn = () => {
    setAdminSessionToken(token);
    setMessage(null);
  };

  const signOut = () => {
    setAdminSessionToken(null);
  };

  const updateStatus = async (id: string, status: string) => {
    if (!authHeaders) return;
    await fetch(`/api/admin/bookings/${id}`, {
      method: "PATCH",
      headers: authHeaders,
      body: JSON.stringify({ status }),
    });
    await loadBookings();
  };

  const saveAvailability = async () => {
    if (!authHeaders) return;
    try {
      const config = JSON.parse(availabilityJson);
      const response = await fetch("/api/admin/availability", {
        method: "PUT",
        headers: authHeaders,
        body: JSON.stringify(config),
      });
      setMessage(response.ok ? "Availability saved." : "Could not save availability.");
    } catch {
      setMessage("Invalid availability JSON.");
    }
  };

  const saveGallery = async () => {
    if (!authHeaders) return;
    try {
      const overrides = JSON.parse(galleryJson);
      const response = await fetch("/api/admin/gallery", {
        method: "PUT",
        headers: authHeaders,
        body: JSON.stringify(overrides),
      });
      setMessage(response.ok ? "Gallery overrides saved." : "Could not save gallery.");
    } catch {
      setMessage("Invalid gallery JSON.");
    }
  };

  if (!storedToken) {
    return (
      <div className="mx-auto flex max-w-md flex-col gap-4 p-6">
        <Text variant="heading">Admin</Text>
        <Text variant="body-sm" className="text-muted">
          {bookingConfig.adminNote}
        </Text>
        <input
          type="password"
          value={token}
          onChange={(event) => setToken(event.target.value)}
          placeholder="Admin secret"
          className={cn(
            "h-12 border border-border bg-surface px-4 text-ivory",
            focusRingClass,
          )}
        />
        <Button type="button" onClick={signIn}>
          Enter
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-6 p-6 pb-24">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Text variant="display-md">Admin</Text>
        <Button type="button" variant="ghost" onClick={signOut}>
          Sign out
        </Button>
      </div>

      {message ? (
        <Text variant="body-sm" className="text-ivory-muted">
          {message}
        </Text>
      ) : null}

      <div className="flex flex-wrap gap-2">
        {(
          [
            ["bookings", "Bookings"],
            ["customers", "Customers"],
            ["availability", "Availability"],
            ["gallery", "Gallery"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => setTab(id)}
            className={cn(
              "type-label border px-4 py-2",
              tab === id
                ? "border-ivory text-ivory"
                : "border-border text-ivory-subtle",
              focusRingClass,
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === "bookings" ? (
        <ul className="flex flex-col gap-3">
          {bookings.length === 0 ? (
            <Text variant="body-sm" className="text-muted">
              No bookings yet.
            </Text>
          ) : (
            bookings.map((booking) => (
              <li
                key={booking.id}
                className="border border-border p-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <Text variant="subhead" className="text-ivory">
                    {booking.customerName} · {booking.date} {booking.time}
                  </Text>
                  <Text variant="caption" className="text-muted">
                    {booking.serviceId} · {booking.status} · {booking.customerPhone}
                  </Text>
                </div>
                <select
                  value={booking.status}
                  onChange={(event) =>
                    void updateStatus(booking.id, event.target.value)
                  }
                  className={cn(
                    "h-10 border border-border bg-surface px-3 type-label text-ivory",
                    focusRingClass,
                  )}
                >
                  {bookingStatuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </li>
            ))
          )}
        </ul>
      ) : null}

      {tab === "customers" ? (
        <ul className="flex flex-col gap-2">
          {customers.map((customer) => (
            <li key={customer.phone} className="border border-border p-4">
              <Text variant="subhead" className="text-ivory">
                {customer.name}
              </Text>
              <Text variant="caption" className="text-muted">
                {customer.phone} · {customer.count} booking(s)
              </Text>
            </li>
          ))}
        </ul>
      ) : null}

      {tab === "availability" ? (
        <div className="flex flex-col gap-3">
          <textarea
            value={availabilityJson}
            onChange={(event) => setAvailabilityJson(event.target.value)}
            rows={16}
            className={cn(
              "w-full border border-border bg-surface p-4 font-mono text-sm text-ivory",
              focusRingClass,
            )}
          />
          <Button type="button" onClick={() => void saveAvailability()}>
            Save availability
          </Button>
        </div>
      ) : null}

      {tab === "gallery" ? (
        <div className="flex flex-col gap-3">
          <Text variant="body-sm" className="text-muted">
            Override archive image paths:{" "}
            <code>{`{ "items": { "fade-01": { "src": "/images/..." } } }`}</code>
          </Text>
          <textarea
            value={galleryJson}
            onChange={(event) => setGalleryJson(event.target.value)}
            rows={12}
            className={cn(
              "w-full border border-border bg-surface p-4 font-mono text-sm text-ivory",
              focusRingClass,
            )}
          />
          <Button type="button" onClick={() => void saveGallery()}>
            Save gallery overrides
          </Button>
        </div>
      ) : null}
    </div>
  );
}
