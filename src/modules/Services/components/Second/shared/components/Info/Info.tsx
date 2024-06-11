interface Props {
  children: React.ReactNode;
}

export default function Info({ children }: Props) {
  return (
    <div className="rounded-xl w-full max-w-[650px] flex-col flex sm:py-12 py-4 sm:px-20 px-8 bg-white shadow-gray-400 shadow-md">
      {children}
    </div>
  );
}
