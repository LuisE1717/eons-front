interface Props {
  value: boolean;
  handleChange(v: boolean): void;
}

export default function Check({ handleChange, value }: Props) {
  return (
    <div className="flex items-center gap-x-4">
      <input
        type="checkbox"
        onChange={(e) => handleChange(e.target.checked)}
        checked={value}
      />
      <p className="text-base mb-0 text-gray-600 font-medium">
        Salvar información para futuros pagos
      </p>
    </div>
  );
}
