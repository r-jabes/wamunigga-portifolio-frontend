import { contactContent, getPhoneHref } from "@/data/content/contact";
import { Text } from "@/components/ui/text";
import { TextLink } from "@/components/ui/text-link";

/** Footer connect block — conversion + social slots from contact content. */
export function FooterContact() {
  const { instagram, tiktok, whatsapp, location, booking, phone, maps } =
    contactContent;
  const phoneHref = getPhoneHref();

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
        <li>
          <TextLink href="/contact" variant="quiet">
            Contact
          </TextLink>
        </li>
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
        {phoneHref && phone.display ? (
          <li>
            <TextLink href={phoneHref} variant="quiet">
              {phone.display}
            </TextLink>
          </li>
        ) : (
          <li>
            <span className="type-label text-ivory/25">{phone.label}</span>
          </li>
        )}
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
        {tiktok.href ? (
          <li>
            <TextLink href={tiktok.href} external variant="quiet">
              {tiktok.label}
            </TextLink>
          </li>
        ) : null}
        {maps.href ? (
          <li>
            <TextLink href={maps.href} external variant="quiet">
              {maps.label}
            </TextLink>
          </li>
        ) : null}
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
