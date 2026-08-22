import { Suspense } from "react";
import { ListApartmentsView } from "@/features/list-apartments/components/list-apartments-view";

export default function HomePage() {
  return (
    <Suspense>
      <ListApartmentsView />
    </Suspense>
  );
}
