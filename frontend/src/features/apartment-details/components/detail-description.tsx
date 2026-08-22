import { Section } from "./section";

export function DetailDescription({ description }: { description: string | null }) {
  const paragraphs = (description ?? "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  if (paragraphs.length === 0) {
    return null;
  }

  return (
    <Section title="Description">
      <div className="space-y-3 text-sm leading-relaxed text-foreground/90">
        {paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </Section>
  );
}
