import { CustomSessionType, SessionDataType } from "../definitions";
import { useSession } from "next-auth/react";

export default function useSessionData() {
  const session = useSession();
  const { data: sessionData, status } = session as CustomSessionType;
  const user = (sessionData as SessionDataType)?.user;
  const loading = status === "loading";
  const authenticated = status === "authenticated";
  const unauthenticated = status === "unauthenticated";

  return { session, user, loading, authenticated, unauthenticated, status };
}
