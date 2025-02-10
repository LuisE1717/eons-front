import clsx from "clsx";

interface Props {
  children: React.ReactNode;
  bold?: boolean;
  className?: string;
}

export default function P({ children, bold, className }: Props) {
  return (
    <p
    className={clsx(
      "leading-8",
      {
        "font-semibold text-2xl": bold,
        "text-lg": !bold,
      },
      className 
    )}
    >
      {children}
    </p>
  );
}
