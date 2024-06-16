interface Props {
  children: React.ReactNode;
}

export default function ButtonsContainer({ children }: Props) {
  return (
    <div className="flex lg:flex-row flex-col gap-y-2 gap-x-3 justify-center my-4">
      {children}
    </div>
  );
}
