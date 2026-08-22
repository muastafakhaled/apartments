import { MapPinIcon } from "@heroicons/react/24/outline";
import { Section } from "./section";

export function LocationMap({
  lat,
  lng,
  address,
}: {
  lat: number | null;
  lng: number | null;
  address: string | null;
}) {
  if (lat == null || lng == null) return null;

  // Small bounding box around the point so OpenStreetMap zooms in on the marker.
  const delta = 0.01;
  const bbox = `${lng - delta},${lat - delta},${lng + delta},${lat + delta}`;
  const src = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lng}`;

  return (
    <Section title="Location">
      {address && (
        <p className="mb-3 flex items-center gap-1.5 text-sm text-muted">
          <MapPinIcon className="h-4 w-4 text-primary" />
          {address}
        </p>
      )}
      <iframe
        title="Map location"
        src={src}
        className="h-[280px] w-full rounded-2xl border border-border"
        loading="lazy"
      />
    </Section>
  );
}
