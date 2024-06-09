import clsx from "clsx";

interface Props {
  children: React.ReactNode;
  reverse: boolean;
  image: string;
  className?: string;
}

export default function ImageSection({
  children,
  image,
  reverse,
  className,
}: Props) {
  const CLASS = clsx(
    "flex xl:flex-row",
    "gap-x-8 sm:gap-y-12",
    "xl:items-start items-center",
    className,
    {
      "xl:flex-row-reverse": reverse,
      "flex-col-reverse": reverse,
      "flex-col": !reverse,
    }
  );

  return (
    <section className={CLASS}>
      <div
        className={clsx("w-full xl:max-w-[500px] max-w-[700px] xl:pt-24 pt-10")}
      >
        {children}
      </div>

      <div className="w-full flex justify-center">
        <img
          src={image}
          alt="service"
          className="object-contain w-full max-w-[600px]"
        />
      </div>
    </section>
  );
}
