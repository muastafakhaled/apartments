export function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-border pt-6">
      <h2 className="mb-4 text-xl font-bold text-foreground">{title}</h2>
      {children}
    </section>
  );
}
