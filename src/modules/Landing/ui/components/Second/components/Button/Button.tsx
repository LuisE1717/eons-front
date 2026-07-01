import Button from "@components/UI/Button/Button";
import useTranslation from "@modules/Shared/hooks/useTranslation";
import { useStore } from "@nanostores/react";
import { userProfile } from "src/UserStore";

export default function SectionButton({auth} : {auth:string}) {
  const { translation } = useTranslation();
  useStore(userProfile)
  return (
    <div className="flex mb-4 mt-4">
      <a href={auth?'/services':'/auth'}>
        <Button loading={false}>
          {translation.Landing.text15} {">"}
        </Button>
      </a>
    </div>
  );
}
