import type { ReactNode } from "react";
import { Text } from "@/components/ui/text";
import { TextLink } from "@/components/ui/text-link";
import {
  contactContent,
  formatHourRange,
  getPhoneHref,
  hasConfiguredHours,
} from "@/data/content/contact";
import { cn } from "@/lib/utils";

type ChannelRowProps = {
  label: string;
  description?: string;
  children: ReactNode;
  pending?: boolean;
};

function ChannelRow({ label, description, children, pending }: ChannelRowProps) {
  return (
    <div
      className={cn(
        "grid gap-3 border-t border-border py-6 sm:grid-cols-[8rem_1fr] sm:gap-8",
        pending && "opacity-60",
      )}
    >
      <Text variant="label" className="text-ivory-subtle">
        {label}
      </Text>
      <div className="flex flex-col gap-2">
        {children}
        {description ? (
          <Text variant="caption" className="text-muted">
            {description}
          </Text>
        ) : null}
      </div>
    </div>
  );
}

/** Structured contact directory — WhatsApp, phone, social, location, hours, maps. */
export function ContactChannels() {
  const { whatsapp, phone, instagram, tiktok, location, maps, hours, booking } =
    contactContent;
  const phoneHref = getPhoneHref();
  const hoursReady = hasConfiguredHours();

  return (
    <div className="flex flex-col border-b border-border">
      <ChannelRow label={booking.label} description={booking.description}>
        <TextLink href={booking.href} variant="cta">
          Open booking
        </TextLink>
      </ChannelRow>

      <ChannelRow
        label={whatsapp.label}
        description={whatsapp.description}
        pending={!whatsapp.href}
      >
        {whatsapp.href ? (
          <TextLink href={whatsapp.href} external variant="cta">
            Message on WhatsApp
          </TextLink>
        ) : (
          <Text variant="body-sm" className="text-ivory/30">
            Link pending
          </Text>
        )}
      </ChannelRow>

      <ChannelRow
        label={phone.label}
        description={phone.description}
        pending={!phoneHref}
      >
        {phoneHref && phone.display ? (
          <TextLink href={phoneHref} variant="cta">
            {phone.display}
          </TextLink>
        ) : (
          <Text variant="body-sm" className="text-ivory/30">
            Number pending
          </Text>
        )}
      </ChannelRow>

      <ChannelRow
        label={instagram.label}
        description={instagram.description}
        pending={!instagram.href}
      >
        {instagram.href ? (
          <TextLink href={instagram.href} external variant="cta">
            {instagram.handle ?? instagram.label}
          </TextLink>
        ) : (
          <Text variant="body-sm" className="text-ivory/30">
            Handle pending
          </Text>
        )}
      </ChannelRow>

      <ChannelRow
        label={tiktok.label}
        description={tiktok.description}
        pending={!tiktok.href}
      >
        {tiktok.href ? (
          <TextLink href={tiktok.href} external variant="cta">
            {tiktok.handle ?? tiktok.label}
          </TextLink>
        ) : (
          <Text variant="body-sm" className="text-ivory/30">
            Handle pending
          </Text>
        )}
      </ChannelRow>

      <ChannelRow label={location.label} pending={!location.text}>
        {location.text ? (
          <>
            <Text variant="body" className="text-ivory">
              {location.text}
            </Text>
            {location.streetAddress ? (
              <Text variant="body-sm" className="text-ivory-muted">
                {location.streetAddress}
              </Text>
            ) : null}
          </>
        ) : (
          <Text variant="body-sm" className="text-ivory/30">
            Address pending
          </Text>
        )}
      </ChannelRow>

      <ChannelRow label={maps.label} pending={!maps.href && !maps.embedSrc}>
        {maps.href ? (
          <TextLink href={maps.href} external variant="cta">
            Open in Google Maps
          </TextLink>
        ) : (
          <Text variant="body-sm" className="text-ivory/30">
            Map link pending
          </Text>
        )}
      </ChannelRow>

      <ChannelRow label={hours.label} pending={!hoursReady}>
        {hoursReady ? (
          <ul className="flex flex-col gap-2">
            {hours.days.map((day) => (
              <li
                key={day.day}
                className="flex justify-between gap-6 type-body-sm text-ivory-muted"
              >
                <span>{day.day}</span>
                <span className="text-ivory-subtle tabular-nums">
                  {formatHourRange(day)}
                </span>
              </li>
            ))}
            {hours.note ? (
              <li>
                <Text variant="caption" className="text-muted">
                  {hours.note}
                </Text>
              </li>
            ) : null}
          </ul>
        ) : (
          <Text variant="body-sm" className="text-ivory/30">
            Hours pending — set open/close in contact.ts
          </Text>
        )}
      </ChannelRow>
    </div>
  );
}

/** Optional Google Maps embed when embedSrc is configured. */
export function ContactMapEmbed() {
  const { embedSrc, label } = contactContent.maps;
  if (!embedSrc) return null;

  return (
    <div className="overflow-hidden border border-border">
      <iframe
        title={label}
        src={embedSrc}
        className="aspect-[16/10] w-full border-0 bg-surface"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </div>
  );
}
