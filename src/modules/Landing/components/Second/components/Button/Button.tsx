import Button from "../../../../../../components/UI/Button/Button";
import useTranslation from "../../../../../Shared/hooks/useTranslation";

export default function SectionButton() {
  const { translation } = useTranslation();

  return (
    <div className="flex justify-center mt-4">
      <a href="/services">
        <Button loading={false}>
          {translation.Landing.text15} {">"}
        </Button>
      </a>
    </div>
  );
}
