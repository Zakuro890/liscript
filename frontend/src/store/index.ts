import { api } from "@/lib/api";
import { atom, selector, useRecoilValue, useSetRecoilState } from "recoil";

const fileState = atom<File | null>({
  key: "FileState",
  default: null,
})

export function useFile() {
  return useRecoilValue(fileState)
}

export function useSetFile() {
  return useSetRecoilState(fileState)
}

const fileTextState = selector({
  key: "FileText",
  async get({ get }) {
    const file = get(fileState)

    if (file === null) {
      return null
    }

    const form = new FormData()
    form.append('file', file)

    return api.post("/convert", form)
  }
})

export function useFileText() {
  return useRecoilValue(fileTextState)
}