/**
 * Barber roster for booking. Update names/availability when the team is confirmed.
 */
export type Barber = {
  id: string;
  name: string;
  /** When false, hidden from booking UI */
  active: boolean;
};

export const barbers: Barber[] = [
  { id: "wamunigga", name: "Wamunigga", active: true },
  { id: "team", name: "Any available barber", active: true },
];

export function getActiveBarbers(): Barber[] {
  return barbers.filter((barber) => barber.active);
}

export function getBarberById(id: string): Barber | undefined {
  return barbers.find((barber) => barber.id === id);
}
