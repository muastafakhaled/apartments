import { CheckIcon } from "@heroicons/react/24/outline";
import { Section } from "./section";

export function Amenities({ amenities }: { amenities: string[] }) {
  if (amenities.length === 0) return null;

  return (
    <Section title="Amenities">
      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {amenities.map((amenity) => (
          <li key={amenity} className="flex items-center gap-2 text-sm text-foreground">
            <CheckIcon className="h-5 w-5 shrink-0 text-primary" />
            {amenity}
          </li>
        ))}
      </ul>
    </Section>
  );
}
