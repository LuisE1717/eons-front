interface Props {
  children: React.ReactNode;
}

export default function List({ children }: Props) {
  return <div className="flex flex-col w-full gap-y-6 pt-5">{children}</div>;
}
