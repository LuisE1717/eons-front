import useTranslation from "../../../../../Shared/hooks/useTranslation";

interface Props {
  count: number;
}

export default function Header({ count }: Props) {
  const { translation } = useTranslation();

  return (
    <div className="my-4">
      <label>
        {translation.Throw.throw} {count}
      </label>
    </div>
  );
}
