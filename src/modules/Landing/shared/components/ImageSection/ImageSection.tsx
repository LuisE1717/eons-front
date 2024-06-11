import clsx from "clsx";

interface Props {
  reverse: boolean;
  children: React.ReactNode;
  image: string;
}

export default function ImageSection({ children, reverse, image }: Props) {
  const CLASS = clsx("flex items-center", "gap-x-10", {
    "flex-row-reverse": !reverse,
  });

  return (
    <section className={CLASS}>
      <div className="flex flex-col w-full max-w-[500px] gap-y-4">
        {children}
      </div>

      <div className="w-full">
        <img
          src={image}
          alt="landing-image"
          className="object-contain w-full"
        />
      </div>
    </section>
  );
}
