export default function Span({ children }: { children: React.ReactNode }) {
  return (
    <span className="">
      <span className="text-primary">{children}</span>
    </span>
  );
}
