interface Props {
  children: React.ReactNode;
}

export default function PhoneView({ children }: Props) {
  return <div className="w-full sm:hidden">{children}</div>;
}
