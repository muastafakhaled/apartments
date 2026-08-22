import Image from "next/image";
import { PhotoIcon } from "@heroicons/react/24/outline";

export function DetailHero({
  image,
  title,
  status,
}: {
  image: string | null;
  title: string;
  status: string | null;
}) {
  return (
    <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-surface-muted">
      {image ? (
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 1024px) 100vw, 900px"
          className="object-cover"
          priority
        />
      ) : (
        <div className="grid h-full w-full place-items-center text-muted">
          <div className="flex flex-col items-center gap-2">
            <PhotoIcon className="h-12 w-12" />
            <span className="text-sm">No photo available</span>
          </div>
        </div>
      )}
      {status && (
        <span className="absolute left-4 top-4 rounded-full bg-surface/95 px-3 py-1 text-xs font-semibold text-foreground shadow-sm">
          {status}
        </span>
      )}
    </div>
  );
}
