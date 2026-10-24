import { createJSONStorage, persist } from "zustand/middleware"
import { INewPayment, IPayment } from "./types"
import { nanoid } from 'nanoid'
import { create } from "zustand"
interface IPaymentsState {
    items: IPayment[]
    addPayment: (data: INewPayment) => void
    removePayment: (id: string) => void
    togglePaid: (id: string) => void
}
export const usePaymentsStore = create<IPaymentsState>() (
    persist(
        (set) => (
            {
                items:[],
                addPayment: (data) => set((state) => (
                    {
                        items: [...state.items, {...data, id: nanoid(), paid: false}]
                    })),
                    removePayment: (id) => set((state) => (
                        {
                            items: state.items.filter((p) => p.id != id)
                        })),
                        togglePaid: (id) => set((state) => ( 
                            {
                                items: state.items.map((p) =>
                                p.id === id ? {...p, paid: !p.paid} : p)
                            })),
            }), 
            {
                name: 'payments',
                storage: createJSONStorage(() => localStorage)
            }
    )
)
