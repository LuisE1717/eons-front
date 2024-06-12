interface Props {
  children: React.ReactNode;
}

export default function Description({ children }: Props) {
  return <p className="leading-7 text-base text-justify">{children}</p>;
}
