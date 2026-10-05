import { ButtonLink } from "@/components/ui/button-link";
import { Text } from "@/components/ui/text";
import {
  contactContent,
  getActiveConversionChannels,
} from "@/data/content/contact";

type ConversionActionsProps = {
  /** Emphasize booking + WhatsApp for social-origin traffic */
  layout?: "stack" | "row";
};

/**
 * Primary conversion paths — booking first, then WhatsApp / phone when set.
 * Designed for Instagram / TikTok / WhatsApp inbound traffic.
 */
export function ConversionActions({ layout = "stack" }: ConversionActionsProps) {
  const channels = getActiveConversionChannels();

  return (
    <div
      className={
        layout === "row"
          ? "flex flex-wrap items-center gap-3"
          : "flex flex-col gap-3 sm:flex-row sm:flex-wrap"
      }
    >
      <ButtonLink href={channels.booking.href} size="lg">
        {channels.booking.label}
      </ButtonLink>

      {channels.whatsapp ? (
        <ButtonLink
          href={channels.whatsapp.href!}
          external
          variant="secondary"
          size="lg"
        >
          {channels.whatsapp.label}
        </ButtonLink>
      ) : null}

      {channels.phone ? (
        <ButtonLink
          href={channels.phone.href}
          variant="ghost"
          size="lg"
        >
          {channels.phone.label}
        </ButtonLink>
      ) : null}

      {!channels.whatsapp && !channels.phone ? (
        <Text variant="caption" className="self-center text-muted sm:ml-2">
          WhatsApp & phone unlock when set in{" "}
          <code className="text-ivory-subtle">contact.ts</code>
        </Text>
      ) : null}
    </div>
  );
}

/** Compact social follow row for feed-origin visitors. */
export function SocialFollowLinks() {
  const { instagram, tiktok } = getActiveConversionChannels();

  if (!instagram && !tiktok) {
    return (
      <Text variant="body-sm" className="text-muted">
        {contactContent.page.pendingNote}
      </Text>
    );
  }

  return (
    <ul className="flex flex-wrap gap-4">
      {instagram ? (
        <li>
          <ButtonLink href={instagram.href!} external variant="secondary" size="sm">
            {instagram.label}
            {instagram.handle ? ` · ${instagram.handle}` : ""}
          </ButtonLink>
        </li>
      ) : null}
      {tiktok ? (
        <li>
          <ButtonLink href={tiktok.href!} external variant="secondary" size="sm">
            {tiktok.label}
            {tiktok.handle ? ` · ${tiktok.handle}` : ""}
          </ButtonLink>
        </li>
      ) : null}
    </ul>
  );
}
