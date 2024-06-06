interface Props {
  value: string;
  handleChange(v: string): void;
}

export default function Input({ handleChange, value }: Props) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => handleChange(e.target.value)}
      className="outline-none border-b-2 border-gray-300 pb-1.5 focus:border-gray-400 transition-all duration-200"
    />
  );
}
