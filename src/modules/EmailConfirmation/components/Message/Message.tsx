import React from "react";

export default function Message() {
  return (
    <div className="flex flex-col text-center mb-8">
      <h1 className="mb-4 sm:text-2xl text-xl font-medium">
        Verificar tu cuenta de correo
      </h1>
      <p className="text-gray-600 font-thin sm:text-base text-sm">
        Ingresa correctamente el código asociado a tu cuenta. Pronto recibirás
        un correo con la clave para restablecer tu contraseña
      </p>
    </div>
  );
}
