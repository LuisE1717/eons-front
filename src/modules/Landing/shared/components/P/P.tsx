import clsx from "clsx";

interface Props {
  children: React.ReactNode;
  bold?: boolean;
}

export default function P({ children, bold }: Props) {
  return (
    <p
      className={clsx("leading-8", {
        "font-semibold text-2xl": bold,
        "text-lg": !bold,
      })}
    >
      {children}
    </p>
  );
}
