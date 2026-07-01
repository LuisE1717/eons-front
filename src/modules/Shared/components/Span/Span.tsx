export default function Span({ children,color }: { children: React.ReactNode,color?:string }) {
  return (
    <span className="">
      <span className={color?"text-secundary":"text-primary"}>{children}</span>
    </span>
  );
}
