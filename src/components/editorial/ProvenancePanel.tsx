import Link from "next/link";
import { EvidenceBadge } from "@/components/editorial/EvidenceBadge";
import type { ObjectProvenance } from "@/data/object-provenance";
import { getMuseum } from "@/data/museums";

/**
 * Object provenance, rendered wherever an image of an object appears.
 *
 * The compact variant sits under a bust on a figure page and answers the
 * question the photograph raises and never used to: what is this object,
 * where did it come from, who dug it up, who holds it, and how secure is
 * the identification.
 *
 * Where a field is not recorded it says so rather than leaving a gap the
 * reader might read as completeness.
 */
export function ProvenancePanel({
  object,
  variant = "compact",
}: {
  object: ObjectProvenance;
  variant?: "compact" | "full";
}) {
  const museum = object.museumSlug ? getMuseum(object.museumSlug) : undefined;

  return (
    <section className="mt-6 border-l-2 border-rule bg-parchment-50 py-5 pl-5 pr-4">
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-2">
        <p className="text-xs uppercase tracking-eyebrow text-stone">
          Object provenance
        </p>
        {object.objectStatus === "modern-commemorative" ? (
          <span className="border-l-2 border-stone-100 bg-white py-0.5 pl-2 pr-2.5 text-[0.62rem] uppercase tracking-eyebrow text-stone-400">
            Modern, not ancient
          </span>
        ) : null}
        <span className="text-[0.62rem] uppercase tracking-eyebrow text-stone-400">
          {object.completeness === "full"
            ? "Record checked"
            : "Record incomplete"}
        </span>
      </div>

      <dl className="mt-4 space-y-3 text-sm">
        <Row label="Object">{object.objectType}</Row>
        {object.material ? <Row label="Material">{object.material}</Row> : null}
        {object.dimensions ? (
          <Row label="Dimensions">{object.dimensions}</Row>
        ) : null}
        <Row label="Made">
          <span className="inline-flex flex-wrap items-baseline gap-x-3">
            <EvidenceBadge level={object.dateMade.level} />
            <span>{object.dateMade.claim}</span>
          </span>
        </Row>
        {object.copyOf ? <Row label="Copy of">{object.copyOf}</Row> : null}
        <Row label="Found">
          {object.findspot ? (
            <span className="inline-flex flex-wrap items-baseline gap-x-3">
              <EvidenceBadge level={object.findspot.level} />
              <span>{object.findspot.place}</span>
            </span>
          ) : (
            <span className="text-stone-400">Not recorded in this catalogue</span>
          )}
        </Row>
        <Row label="Excavated">
          {object.excavation ? (
            <>
              {object.excavation.year}
              {object.excavation.byWhom ? ` · ${object.excavation.byWhom}` : ""}
            </>
          ) : (
            <span className="text-stone-400">Not recorded in this catalogue</span>
          )}
        </Row>
        <Row label="Now at">
          {museum ? (
            <Link href={`/museums/${museum.slug}`} className="vp-link">
              {museum.name}, {museum.city}
            </Link>
          ) : object.displayContext ? (
            object.displayContext
          ) : (
            <span className="text-stone-400">Not recorded in this catalogue</span>
          )}
        </Row>
        <Row label="Inventory">
          {object.inventoryNumber ?? (
            <span className="text-stone-400">Not recorded in this catalogue</span>
          )}
        </Row>
        <Row label="Identification">
          <span className="inline-flex flex-wrap items-baseline gap-x-3">
            <EvidenceBadge level={object.identification.level} />
            <span>{object.identification.claim}</span>
          </span>
        </Row>
      </dl>

      {object.identification.note ? (
        <p className="mt-4 text-sm leading-relaxed text-charcoal-100">
          {object.identification.note}
        </p>
      ) : null}

      {variant === "full" ? (
        <>
          {object.condition ? (
            <p className="mt-4 text-sm leading-relaxed text-charcoal-100">
              <span className="text-xs uppercase tracking-eyebrow text-stone">
                Condition —{" "}
              </span>
              {object.condition}
            </p>
          ) : null}
          {object.restoration ? (
            <p className="mt-3 text-sm leading-relaxed text-charcoal-100">
              <span className="text-xs uppercase tracking-eyebrow text-stone">
                Restoration —{" "}
              </span>
              {object.restoration}
            </p>
          ) : null}
        </>
      ) : null}

      {object.gaps?.length ? (
        <div className="mt-4 border-t border-rule pt-3">
          <p className="text-xs uppercase tracking-eyebrow text-stone">
            Not recorded here
          </p>
          <ul className="mt-2 space-y-1 text-sm text-stone-400">
            {object.gaps.map((g) => (
              <li key={g}>{g}</li>
            ))}
          </ul>
        </div>
      ) : null}

      <p className="mt-4 text-sm">
        <Link href={`/objects/${object.slug}`} className="vp-link">
          Full object record
        </Link>
      </p>
    </section>
  );
}

function Row({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-1 sm:grid-cols-[7.5rem_1fr] sm:gap-4">
      <dt className="text-xs uppercase tracking-eyebrow text-stone">{label}</dt>
      <dd className="text-charcoal-100">{children}</dd>
    </div>
  );
}
