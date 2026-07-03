import { create } from "zustand";

const states = create((set) => ({
    email: null,
    setEmail: (email) => set({ email: email })
}))

export default states;
