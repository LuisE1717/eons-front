import useTranslation from "../../../../../Shared/hooks/useTranslation";

interface Props {
  count: number;
}

export default function Header({ count }: Props) {
  const { translation } = useTranslation();

  return (
    <div className="mb-4 flex justify-center">
      <label className="font-semibold text-center text-2xl">
        {translation.Throw.throw} {count}
      </label>
    </div>
  );
}
