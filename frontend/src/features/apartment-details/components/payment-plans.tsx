import { formatPrice } from "@/shared/lib/format";
import { PaymentPlan } from "../types";
import { Section } from "./section";

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-muted">{label}</p>
      <p className="text-sm font-semibold text-foreground">{value}</p>
    </div>
  );
}

export function PaymentPlans({
  plans,
  currency,
}: {
  plans: PaymentPlan[];
  currency: string;
}) {
  if (plans.length === 0) return null;

  return (
    <Section title="Payment plans">
      <div className="flex flex-col gap-3">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="grid grid-cols-2 gap-4 rounded-xl border border-border bg-surface p-4 sm:grid-cols-4"
          >
            <Field
              label="Down payment"
              value={
                plan.downPaymentPct != null ? `${plan.downPaymentPct}%` : "—"
              }
            />
            <Field
              label="Term"
              value={
                plan.termMonths != null ? `${plan.termMonths} months` : "—"
              }
            />
            <Field
              label="Installment"
              value={
                plan.installmentAmount != null
                  ? formatPrice(plan.installmentAmount, currency)
                  : "—"
              }
            />
            <Field label="Frequency" value={plan.installmentFrequency ?? "—"} />
          </div>
        ))}
      </div>
    </Section>
  );
}
