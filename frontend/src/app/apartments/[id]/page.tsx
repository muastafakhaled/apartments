import { notFound } from "next/navigation";
import { ApartmentDetailsView } from "@/features/apartment-details/components/apartment-details-view";

export default async function ApartmentDetailPage({
  params,
}: PageProps<"/apartments/[id]">) {
  const { id } = await params;
  const numericId = Number(id);

  if (!Number.isInteger(numericId) || numericId <= 0) {
    notFound();
  }

  return <ApartmentDetailsView id={numericId} />;
}
