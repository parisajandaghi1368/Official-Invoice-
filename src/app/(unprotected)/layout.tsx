"use client";

import useToken from "@/shared/hooks/use-token";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function UnprotectedPageWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { token } = useToken();
  useEffect(() => {
    const goToApp = () => router.push("/");
    if (token) {
      goToApp();
    }
  }, [router, token]);
  return <>{children}</>;
}
