interface Props {
  name: string;
}

export default function Spirit({ name }: Props) {
  return (
    <div className="flex flex-col items-center">
      <article className="w-[40px] h-[40px] bg-gray-200 rounded-full"></article>
      <p className="text-sm">{name}</p>
    </div>
  );
}
