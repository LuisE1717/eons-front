import React from "react";
import useTranslation from "../../../../../Shared/hooks/useTranslation";
import Cookies from "js-cookie";

export default function Header() {
  const { translation } = useTranslation();

  return (
    <header>
      <h1 className="sm:text-3xl text-2xl font-semibold mb-5 text-center">
        {translation.Spiritual_Family.header}
      </h1>
    </header>
  );
}
