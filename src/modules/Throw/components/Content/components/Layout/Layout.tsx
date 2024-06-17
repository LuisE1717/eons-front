interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <main className="flex flex-col w-full items-center">
      <div className="rounded-xl bg-white shadow-xl w-full shadow-black/5 ring-1 ring-slate-700/10 px-10 py-5">
        {children}
      </div>
    </main>
  );
}
