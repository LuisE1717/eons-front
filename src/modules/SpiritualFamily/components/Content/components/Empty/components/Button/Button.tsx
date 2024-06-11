import Icon from "./components/Icon/Icon";

interface Props {
  handleClick(): void;
}

export default function Button({ handleClick }: Props) {
  return (
    <button
      onClick={handleClick}
      className="rounded-full bg-black p-2 mt-6 transition-all duration-200 hover:shadow-md hover:shadow-gray-400"
    >
      <Icon />
    </button>
  );
}
