import { contactContent } from "@/data/content/contact";
import { Text } from "@/components/ui/text";
import { TextLink } from "@/components/ui/text-link";

/** Footer connect block — social, location, booking slots from content data. */
export function FooterContact() {
  const { instagram, whatsapp, location, booking } = contactContent;

  return (
    <div className="flex flex-col gap-6">
      <Text variant="label" className="text-ivory-subtle">
        Connect
      </Text>
      <ul className="flex flex-col gap-3">
        <li>
          <TextLink href={booking.href} variant="cta">
            {booking.label}
          </TextLink>
        </li>
        {instagram.href ? (
          <li>
            <TextLink href={instagram.href} external variant="quiet">
              {instagram.label}
            </TextLink>
          </li>
        ) : (
          <li>
            <span className="type-label text-ivory/25">{instagram.label}</span>
          </li>
        )}
        {whatsapp.href ? (
          <li>
            <TextLink href={whatsapp.href} external variant="quiet">
              {whatsapp.label}
            </TextLink>
          </li>
        ) : (
          <li>
            <span className="type-label text-ivory/25">{whatsapp.label}</span>
          </li>
        )}
        {location.text ? (
          <li>
            <Text variant="body-sm" className="text-ivory-muted">
              {location.label}: {location.text}
            </Text>
          </li>
        ) : (
          <li>
            <span className="type-label text-ivory/25">{location.label}</span>
          </li>
        )}
      </ul>
    </div>
  );
}
