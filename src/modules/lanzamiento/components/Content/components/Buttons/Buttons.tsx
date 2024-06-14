import React from "react";
import Button from "../../../../../../components/UI/Button/Button";
import useTranslation from "../../../../../Shared/hooks/useTranslation";

interface Props {
  loading: boolean;
  handleClickMontado(): void;
  handleClickTranversal(): void;
  handleClickParado(): void;
}

export default function Buttons({
  loading,
  handleClickMontado,
  handleClickParado,
  handleClickTranversal,
}: Props) {
  const { translation } = useTranslation();

  return (
    <div className={`flex flex-wrap gap-2 justify-center my-4`}>
      <Button loading={loading} onClick={handleClickMontado}>
        {translation.Throw.mount_throw}
      </Button>

      <Button onClick={handleClickParado} loading={loading}>
        {translation.Throw.stops_throw}
      </Button>

      <Button loading={loading} onClick={handleClickTranversal}>
        {translation.Throw.tranversal_throw}
      </Button>
    </div>
  );
}
