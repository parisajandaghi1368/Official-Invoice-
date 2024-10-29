import { useRouter } from "next/navigation";
import useToken from "./use-token";

const useLogout = () => {
  const { removeToken } = useToken();
  const router = useRouter();
  const goToLogin = () => router.push("/login");

  return () => {
    removeToken();
    return goToLogin();
  };
};

export default useLogout;
