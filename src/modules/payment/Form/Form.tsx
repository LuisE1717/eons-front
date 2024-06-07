import Button from "./components/Button/Button";
import Check from "./components/Check/Check";
import Section from "./components/Section/Section";
import useForm from "./hooks/useForm";

interface Props {
  numberLabel: string;
  dateLabel: string;
  nameLabel: string;
}

export default function Form({ dateLabel, nameLabel, numberLabel }: Props) {
  const {
    form,
    handleChangeCVV,
    handleChangeExpirationDate,
    handleChangeName,
    handleChangeNumber,
    handleChangeSave,
    handleSubmit,
    loading,
  } = useForm();

  return (
    <form className="flex flex-col gap-y-7" onSubmit={handleSubmit}>
      <Section
        value={form.number}
        handleChange={handleChangeNumber}
        label={numberLabel}
      />
      <Section
        value={form.expirationDate}
        handleChange={handleChangeExpirationDate}
        label={dateLabel}
      />
      <Section
        value={form.name}
        handleChange={handleChangeName}
        label={nameLabel}
      />
      <Section value={form.cvv} handleChange={handleChangeCVV} label="CVV" />

      <Check handleChange={handleChangeSave} value={form.save} />

      <Button loading={loading} />
    </form>
  );
}
