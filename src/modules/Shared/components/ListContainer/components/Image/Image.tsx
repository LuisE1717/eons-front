interface Props {
  src: string;
}

export default function Image({ src }: Props) {
  return (
    <img src={src} alt="" className="w-full object-contain max-w-[600px]" />
  );
}
