type JsonLdProps = {
  data: Record<string, unknown> | Array<Record<string, unknown>>;
};

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      // server-only output; safe by construction
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
