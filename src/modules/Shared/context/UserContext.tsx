import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { refreshSection } from "../../../utils/api/userApi";
import { setCookie } from "../../../utils/cookies/Cookies";
import type { ICurrentUser } from "../../user/domain/user";
import { userProfile } from "../../../UserStore";

interface Props {
  user: ICurrentUser | null;
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
  const [user, setUser] = useState<ICurrentUser | null>(null);
  const [loading, setLoading] = useState(false);

  const handleRefreshSection = async () => {
    try {
      if (!Cookies.get("eons_token")) {
        if (token) {
          setLoading(true);
          const response = await refreshSection(token);
          if (response.data) {
            const profile = response.data;
            setUser(response.data);
            console.log(response.data);

            setCookie("eons_user", profile.email, 0.25);
            setCookie("eons_essence", profile.essence, 0.25);
            setCookie("eons_token", profile.accessToken, 0.25);
            setCookie("eons_refresh_token", profile.refreshToken, 7);

            userProfile.set({
              email: profile.email || "",
              valid: profile.valid || false,
              essence: profile.essence || 0,
            });

            if (window.location.pathname == "/auth") {
              window.location.href = "/services";
            } else {
              window.location.reload();
            }
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
