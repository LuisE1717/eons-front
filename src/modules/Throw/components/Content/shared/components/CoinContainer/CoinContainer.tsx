interface Props {
  children: React.ReactNode;
}

export default function CoinContainer({ children }: Props) {
  return <div className="flex justify-center my-4 gap-x-5">{children}</div>;
}
