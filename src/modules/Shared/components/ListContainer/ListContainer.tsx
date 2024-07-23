import Image from "./components/Image/Image";
import Switch from "./components/Switch/Switch";
import type { SwitchItem } from "./domain";
import "react-responsive-modal/styles.css";

interface Props {
  items: SwitchItem[];
  image: string;
  children: React.ReactNode;
}

export default function ListContainer({ items, children, image }: Props) {
  return (
    <main className="flex flex-col items-center px-6 pb-20">
      <div className="w-full max-w-[1100px] flex flex-col">
        <div className="flex lg:flex-row flex-col-reverse items-center justify-between w-full gap-x-10 gap-y-10">
          <div className="flex flex-col items-center lg:items-start w-full max-w-[500px]">
            <Switch items={items} />

            {children}
          </div>

          <Image src={image} />
        </div>
      </div>
    </main>
  );
}
