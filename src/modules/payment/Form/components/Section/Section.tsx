import Input from "../Input/Input";

interface Props {
  label: string;
  value: string;
  handleChange(v: string): void;
}

export default function Section({ label, handleChange, value }: Props) {
  return (
    <section className="flex flex-col">
      <label htmlFor="" className="mb-1.5 text-base font-semibold">
        {label}
      </label>

      <Input value={value} handleChange={handleChange} />
    </section>
  );
}
