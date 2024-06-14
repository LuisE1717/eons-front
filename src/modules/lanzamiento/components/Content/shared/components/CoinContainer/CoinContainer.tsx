interface Props {
  children: React.ReactNode;
}

export default function CoinContainer({ children }: Props) {
  return <div className="flex justify-center my-4">{children}</div>;
}
