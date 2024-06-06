interface Props {
  loading: boolean;
}

export default function Button({ loading }: Props) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="text-white font-semibold hover:opacity-70 text-base sm:text-lg rounded-full bg-black w-full sm:py-4 py-3 px-5 transition-all duration-300"
    >
      Pagar
    </button>
  );
}
