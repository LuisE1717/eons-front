import Button from "../../../../../../../../components/UI/Button/Button";

interface Props {
  text: string;
  loading: boolean;
  text_loading?:string;
}

export function LoginButton({ text, loading, text_loading }: Props) {
  return (
    <Button type="submit" loading={loading} text_loading={text_loading}>
      {text}
    </Button>
  );
}
