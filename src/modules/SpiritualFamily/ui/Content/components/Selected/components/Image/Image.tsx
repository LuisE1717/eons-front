import { createRef, type ChangeEvent } from "react";

interface Props {
  image: string;
  name: string;
  handleChangeImage(f: FileList): void;
}

export default function Image({ image, name, handleChangeImage }: Props) {
  const ref = createRef<HTMLInputElement>();

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;

    if (files) {
      handleChangeImage(files);
    }
  }

  function handleClick() {
    if (ref.current) {
      ref.current.click();
    }
  }

  return (
    <figure
      className="flex items-center flex-col mb-5 cursor-pointer"
      onClick={handleClick}
    >
      <img
        src={image}
        alt={name}
        className="object-cover rounded-full w-[180px] h-[180px]"
      />

      <input
        multiple={false}
        ref={ref}
        type="file"
        className="hidden"
        onChange={handleChange}
        accept=".png,.jpg,.jpeg"
      />
    </figure>
  );
}
