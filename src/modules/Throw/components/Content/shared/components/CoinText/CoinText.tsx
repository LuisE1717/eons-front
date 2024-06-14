interface Props {
  children: React.ReactNode;
}

export default function CoinText({ children }: Props) {
  return (
    <div className="flex flex-col my-4">
      <span>{children}</span>
    </div>
  );
}
