interface Props {
  image: string;
}

export default function Image({ image }: Props) {
  return (
    <img
      src={image}
      alt="service-image"
      className="object-contain w-full max-w-[600px]"
    />
  );
}
