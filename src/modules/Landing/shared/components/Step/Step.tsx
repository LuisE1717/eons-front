interface Props {
  children: React.ReactNode;
}

export default function Step({ children }: Props) {
  return (
    <div className="text-center flex w-full lg:pt-14 lg:pb-14 pb-14 pt-4 text-lg px-14">
      {children}
    </div>
  );
}
