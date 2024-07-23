import Button from "../../../../../../../../components/UI/Button/Button";

interface Props {
  text: string;
  loading: boolean;
  text_loading?:string;
  handleSubmit: () => void;
}

export function LoginButton({ text, loading, text_loading, handleSubmit }: Props) {
  return (
    <Button onClick={()=> handleSubmit()} loading={loading} text_loading={text_loading}>
      {text}
    </Button>
  );
}
