interface Props {
  children: React.ReactNode;
}

export default function Step({ children }: Props) {
  return (
    <div className="text-center flex w-full py-14 text-lg px-14">
      {children}
    </div>
  );
}
