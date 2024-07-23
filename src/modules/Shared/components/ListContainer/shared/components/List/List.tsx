interface Props {
  children: React.ReactNode;
}

export default function List({ children }: Props) {
  return (
    <div className="flex flex-col w-full gap-y-6 py-5 overflow-y-auto max-h-[600px] hide-scrollbar">
      {children}
    </div>
  );
}
