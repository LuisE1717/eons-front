import { createContext, useEffect, useState } from "react";

interface CurrentUser {
  id: string;
  email: string;
}

interface Props {
  user: CurrentUser | null;
  loading: boolean;
}

export const UserContext = createContext<Props>({
  user: null,
  loading: true,
});

export function UserProvider({
  children,
}: {
  children: React.ReactNode;
  token: string | undefined;
}) {
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {}, []);

  return (
    <UserContext.Provider value={{ user, loading }}>
      {children}
    </UserContext.Provider>
  );
}
