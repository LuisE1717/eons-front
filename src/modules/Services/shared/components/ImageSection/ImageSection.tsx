import clsx from "clsx";
import Image from "../Image/Image";

interface Props {
  children: React.ReactNode;
  reverse: boolean;
  image: string;
  phoneReverse: boolean;
  className?: string;
  imageInPhone: boolean;
}

export default function ImageSection({
  children,
  image,
  reverse,
  className,
  phoneReverse,
  imageInPhone,
}: Props) {
  const CLASS = clsx(
    "flex ",
    "gap-x-8 sm:gap-y-12",
    "lg:items-start items-center",
    className,
    {
      "lg:flex-row-reverse": reverse,
      "lg:flex-row": !reverse,
    },
    { "flex-col-reverse": phoneReverse, "flex-col": !phoneReverse }
  );

  return (
    <section className={CLASS}>
      <div
        className={clsx("w-full xl:max-w-[500px] max-w-[700px] lg:pt-24 pt-10")}
      >
        {children}
      </div>

      <div
        className={clsx("w-full", {
          "hidden lg:flex": !imageInPhone,
          "flex justify-center": imageInPhone,
        })}
      >
        <Image image={image} />
      </div>
    </section>
  );
}
