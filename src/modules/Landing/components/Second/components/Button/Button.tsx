import Button from "../../../../../../components/UI/Button/Button";
import useTranslation from "../../../../../Shared/hooks/useTranslation";
import Cookies from "js-cookie";
import { useStore } from "@nanostores/react";
import { userProfile } from "../../../../../../UserStore";

export default function SectionButton({auth} : {auth:string}) {
  const { translation } = useTranslation();
  const $user = useStore(userProfile)
  console.log($user)
  return (
    <div className="flex mt-4">
      <a href={auth?'/services':'/auth'}>
        <Button loading={false}>
          {translation.Landing.text15} {">"}
        </Button>
      </a>
    </div>
  );
}
