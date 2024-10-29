"use client";
import useLogout from "@/shared/hooks/use-logout";
import useMyself from "@/shared/hooks/use-myself";
import useToken from "@/shared/hooks/use-token";
import PageLoader from "@/shared/utils/page-loader";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
export default function ProtectedPageWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { token, checkedForTokenInStorage } = useToken();
  const logout = useLogout();
  const { error: userError, user } = useMyself();

  useEffect(() => {
    (async () => {
      if (!token && !checkedForTokenInStorage) {
        return;
      }

      if (!token) {
        return logout();
      }

      if (userError) {
        return logout();
      }
    })();
  }, [checkedForTokenInStorage, logout, router, token, userError]);

  if (!user) {
    return <PageLoader />;
  }
  return <>{children}</>;
}
