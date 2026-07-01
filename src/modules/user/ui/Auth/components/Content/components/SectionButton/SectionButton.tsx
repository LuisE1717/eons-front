interface Props {
  handleClick(): void;
  text: string;
  selected: boolean;
}

export default function SectionButton({ handleClick, selected, text }: Props) {
  return (
    <button
      onClick={handleClick}
      className="py-1 px-5 login rounded-full"
      style={{
        borderColor: selected ? "#d161b4" : "#e5e5e6",
        borderWidth: selected ? "1px" : "0px",
      }}
    >
      {text}
    </button>
  );
}
