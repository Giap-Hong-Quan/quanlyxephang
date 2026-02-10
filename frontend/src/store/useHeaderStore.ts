import {create} from "zustand"
type title={
    title: string;
    subTitle: string;
    setTitle: (title: string) => void;
    setSubTitle: (sub: string) => void;
}
export const useHeaderStore = create<title>((set)=>(
    {
    title: "",
    subTitle: "",
    setTitle: (title) => set({ title }),
    setSubTitle: (subTitle) => set({ subTitle }),
    }
))