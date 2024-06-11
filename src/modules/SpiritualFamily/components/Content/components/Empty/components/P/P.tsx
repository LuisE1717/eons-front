interface Props {
  children: React.ReactNode;
}

export default function P({ children }: Props) {
  return (
    <p className="sm:mb-4 mb-2.5 sm:text-lg text-base text-gray-500 text-center">
      {children}
    </p>
  );
}
