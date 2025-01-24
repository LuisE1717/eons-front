import React from "react";
import Button from "../../components/UI/Button/Button";
import { toast } from "react-toastify";
import { validateService } from "../Services/components/Second/components/MessageInfo/MessageInfo";
import useTranslation from "../Shared/hooks/useTranslation";
import Free from "../Services/shared/components/Free/Free";
import Span from "../Services/shared/components/Span/Span";

export default function Inf() {
  const { translation } = useTranslation();
  const handleRoute =()=>   window.location.href = '/launch';
  return (
    <main className="flex w-full px-10 mb-10 justify-center">
      <div className="flex lg:flex-row flex-col w-full gap-y-10 max-w-[1100px] justify-center items-center">
        <img
          src="/lens.webp"
          alt="lens"
          className="object-contain w-full max-w-[600px]"
        />

        <div className="w-full max-w-[500px] flex flex-col items-center">
          <p className="text-lg mb-5 text-gray-500 text-center">
            Aún no ha realizado su Evaluación General.
          </p>

          <Button
          onClick={() => handleRoute()}
           loading={false} full={false}>
            <div>
            {translation.ServiceMenu.general_evaluation}. 
            <div>
            {" "}
            (<Span color="secundary">{translation.ServiceMenu.free}</Span>)
            </div>
            </div>
          </Button>
        </div>
      </div>
    </main>
  );
}
