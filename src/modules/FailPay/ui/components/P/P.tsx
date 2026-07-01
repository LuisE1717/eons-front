import clsx from "clsx";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export default function P({ children, className }: Props) {
  return <p className={clsx("sm:text-lg text-base", className)}>{children}</p>;
}
