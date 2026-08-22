import { Container } from "@/shared/components/container";

export function DetailSkeleton() {
  return (
    <Container className="py-6">
      <div className="animate-pulse space-y-4">
        <div className="aspect-[16/9] w-full rounded-2xl bg-surface-muted" />
        <div className="h-8 w-1/2 rounded bg-surface-muted" />
        <div className="h-4 w-1/3 rounded bg-surface-muted" />
        <div className="h-32 w-full rounded bg-surface-muted" />
      </div>
    </Container>
  );
}
