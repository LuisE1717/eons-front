import Fire from "./components/Fire/Fire";

interface Props {
  icon: React.FC<{ size: number }>;
  text: string;
  fire: number;
}

export default function Card({ icon, text, fire }: Props) {
  return (
    <div className="bg-white shadow-lg rounded-xl sm:px-4 px-2 sm:py-3 py-2 flex flex-col items-center relative cursor-pointer transition-all duration-300 hover:scale-110">
      <div className="flex items-center gap-x-1 bg-red-400 rounded-full text-white px-2 py-1 absolute -top-3 -right-4">
        <Fire />
        <span className="text-sm mb-0">{fire}</span>
      </div>

      <i className="mb-1">{icon({ size: 32 })}</i>
      <p className="mb-0 text-sm font-semibold text-center">{text}</p>
    </div>
  );
}
