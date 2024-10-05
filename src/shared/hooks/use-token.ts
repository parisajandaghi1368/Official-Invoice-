import { atom, useAtom } from "jotai";
import { useEffect } from "react";

const tokenAtom = atom<string | null>(null);
const checkedForTokenInStorageAtom = atom<boolean>(false);
const useToken = () => {
  const [tokenInState, setTokenInState] = useAtom(tokenAtom);
  const [checkedForTokenInStorage, setCheckedForTokenInStorage] = useAtom(
    checkedForTokenInStorageAtom
  );

  useEffect(() => {
    if (tokenInState) return;

    const tokenInStorage = localStorage.getItem("token");

    setCheckedForTokenInStorage(true);
    if (tokenInStorage) {
      setTokenInState(tokenInStorage);
    }
  }, [setCheckedForTokenInStorage, setTokenInState, tokenInState]);

  const setToken = (newToken: string) => {
    localStorage.setItem("token", newToken);
    setTokenInState(newToken);
  };

  const removeToken = () => {
    localStorage.removeItem("token");
    setTokenInState(null);
  };

  return {
    token: tokenInState,
    setToken,
    removeToken,
    checkedForTokenInStorage,
  };
};

export default useToken;
