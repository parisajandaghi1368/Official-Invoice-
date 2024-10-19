import { atom } from "jotai";

export const pageIndexAtom = atom<number>(1);
export const searchTermAtom = atom<string | null>(null);
