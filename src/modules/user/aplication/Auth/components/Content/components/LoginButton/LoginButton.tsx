import Button from "../../../../../../../../components/UI/Button/Button";

interface Props {
  text: string;
  loading: boolean;
}

export function LoginButton({ text, loading }: Props) {
  return (
    <Button type="submit" loading={loading}>
      {text}
    </Button>
  );
}
