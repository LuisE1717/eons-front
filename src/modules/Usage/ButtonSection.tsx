import Button from "../../components/UI/Button/Button";
import Span from "../Services/shared/components/Span/Span";
import useTranslation from "../Shared/hooks/useTranslation";

const ButtonSection = () => {
      const { translation } = useTranslation();
    
    const handleRoute=()=>   window.location.href = '/general-evaluation';
  return (
    <Button onClick={() => handleRoute()} loading={false} full={false}>
      <div>
        {translation.ServiceMenu.general_evaluation}.
        <div>
          {" "}
          (<Span color="secundary">{translation.ServiceMenu.free}</Span>)
        </div>
      </div>
    </Button>
  );
};
export default ButtonSection;
