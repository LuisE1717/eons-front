import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { refreshSection } from "../../../utils/api/userApi";
import { setCookie } from "../../../utils/cookies/Cookies";
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
  token,
}: {
  children: React.ReactNode;
  token: string | undefined;
}) {
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [loading, setLoading] = useState(false);

  //console.log(token)

  const handleRefreshSection = async () => {
    try {
      if (!Cookies.get("eons_token")) {
        if (token) {
          setLoading(true);
          const response = await refreshSection(token);
          const profile = response.data;
          console.log(response);

          setCookie("eons_token", profile.accessToken, 1);
          setCookie("eons_user", profile.email, 1);
          setCookie("eons_refresh_token", profile.refreshToken, 7);

          if (window.location.pathname == "/auth") {
            window.location.href = "/services";
          }
        } else {
          if (
            window.location.pathname != "/auth" &&
            window.location.pathname != "/"
          ) {
            // window.location.href = "/auth";
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleRefreshSection();
  }, []);

  return (
    <UserContext.Provider value={{ user, loading }}>
      {children}
    </UserContext.Provider>
  );
}
