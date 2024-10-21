"use client";
import React, { useEffect } from "react";
import useToken from "@/shared/hooks/use-token";
import { useRouter } from "next/navigation";
import useMyself from "@/shared/hooks/use-myself";
import useLogout from "@/shared/hooks/use-logout";
import PageLoader from "@/shared/utils/page-loader";
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
