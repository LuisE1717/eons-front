interface Props {
  message: string;
  title: string;
}

export default function Message({ message, title }: Props) {
  return (
    <div className="flex flex-col text-center mb-8">
      <h1 className="mb-4 sm:text-2xl text-xl font-medium">{title}</h1>
      <p className="text-gray-600 font-thin sm:text-base text-sm">{message}</p>
    </div>
  );
}
