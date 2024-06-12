import { useState } from "react";
import Image from "./components/Image/Image";
import Name from "./components/Name/Name";
import Description from "./components/Description/Description";
import { type Spirit } from "../../../../interfaces";
import Buttons from "./components/Buttons/Buttons";
import Header from "./components/Header/Header";

interface Props {
  spirit: Spirit;
  handleClose(): void;
}

export default function Selected({ spirit, handleClose }: Props) {
  const [showImage, setShowImage] = useState(spirit.image);

  function handleChangeImage(list: FileList) {
    for (let i = 0; i < list.length; i++) {
      const data = list.item(i);

      if (data) {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target && typeof e.target.result === "string") {
            setShowImage(e.target.result);
          }
        };

        reader.readAsDataURL(data);
      }
    }
  }

  return (
    <div>
      <Header handleClose={handleClose} />
      <Image
        image={showImage}
        name={spirit.name}
        handleChangeImage={handleChangeImage}
      />
      <Name>{spirit.name}</Name>
      <Description>{spirit.description}</Description>

      <Buttons />
    </div>
  );
}
