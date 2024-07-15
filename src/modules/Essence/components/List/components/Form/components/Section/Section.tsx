interface Props {
  label: string;
  children: React.ReactNode;
}

export default function Section({ label, children }: Props) {
  return (
    <section className="flex flex-col">
      <label htmlFor="" className="font-semibold mb-2 text-base">
        {label}
      </label>

      {children}
    </section>
  );
}
