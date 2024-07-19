import React from "react";
import Button from "../../components/UI/Button/Button";

export default function Inf() {
  return (
    <main className="flex w-full px-10 mb-10 justify-center">
      <div className="flex lg:flex-row flex-col w-full gap-y-10 max-w-[1100px] justify-center items-center">
        <img
          src="/lens.png"
          alt="lens"
          className="object-contain w-full max-w-[600px]"
        />

        <div className="w-full max-w-[500px] flex flex-col items-center">
          <p className="text-lg mb-5 text-gray-500 text-center">
            No haz realizado tu evaluación generalizada
          </p>

          <Button loading={false} full={false}>
            Realizar evaluación
          </Button>
        </div>
      </div>
    </main>
  );
}
