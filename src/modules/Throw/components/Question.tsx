interface Props {
  question: string;
  handleChangeQuestion(q: string): void;
  disabled: boolean;
}

export default function Question({
  handleChangeQuestion,
  question,
  disabled,
}: Props) {
  return (
    <header className="flex items-center w-full flex-col mb-5">
      <h2 className="text-xl mb-2 font-bold">Haga su pregunta</h2>
      <input
        type="text"
        disabled={disabled}
        value={question}
        onChange={(e) => handleChangeQuestion(e.target.value)}
        className="outline-none w-full max-w-[300px] border-b-2 border-gray-300 pb-1.5 focus:border-gray-400 transition-all duration-200"
      />
    </header>
  );
}
