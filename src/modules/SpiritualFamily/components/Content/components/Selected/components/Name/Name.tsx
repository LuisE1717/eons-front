interface Props {
  children: React.ReactNode;
}

export default function Name({ children }: Props) {
  return (
    <h2 className="text-center w-full font-semibold sm:text-3xl text-2xl sm:mb-4 mb-2.5">
      {children}
    </h2>
  );
}
