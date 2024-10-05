import useToken from "./use-token";
import { useRouter } from "next/navigation";

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
