import { useState, FormEvent } from "react"
import { todayISO } from "../format"
import { TCategory } from "../types"
import { usePaymentsStore } from "../store"
import { CATEGORY_LABELS, CATEGORY_LIST } from "../categories"

export default function PaymentForm() {
    const [title, setTitle] = useState<string>('')
    const [amount, setAmount] = useState<string>('')
    const [due, setDue] = useState<string>(todayISO())
    const [category, setCategory] = useState<TCategory>('video')
    const [error, setError] = useState<string>('')

    const addPayment = usePaymentsStore((state) => state.addPayment)
    
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => 
    {
        e.preventDefault()
        const cleanTitle = title.trim()
        const numAmount = Number(amount.trim().replace(',','.'))
        
        if(!cleanTitle) 
        {
            setError('Введите название!')
            return
        }
        if (!Number.isFinite(numAmount) || numAmount <= 0) 
        {
            setError('Введите корректную цену!')
            return
        }
        if(!due) 
            {
                setError('Выберите дату!')
                return
            }    
            addPayment(
                {
                    title: cleanTitle, amount: numAmount, due, category
                })
                setTitle('')
                setAmount('')
                setError('')
    }  
    return (
        <form 
        className="box"
        onSubmit={handleSubmit}>
            <h2 
            className="h">Новая подписка
            </h2>
            <label
                className="field">
                <span>
                    Название
                </span>
                <input
                    type="text"
                    placeholder="Например, Figma"
                    maxLength={60}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </label>
            <div 
                className="two">
                <label
                    className="field">
                    <span>
                    Цена, ₽
                    </span>
                    <input
                        type="text" 
                        inputMode="decimal" 
                        placeholder="0" 
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}/>
                </label>
                <label 
                    className="field">
                    <span>
                        Оплатить до
                    </span>
                    <input 
                    type="date" 
                    value={due}
                    onChange={(e) => setDue(e.target.value)}/>
                </label>
            </div>

            <label 
                className="field">
                <span>
                    Категория
                </span>
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as TCategory)}>
                    {CATEGORY_LIST.map((cat) => (
                        <option key={cat} value={cat} >
                            {CATEGORY_LABELS[cat]} 
                        </option>
                    ))}
                </select>
            </label>
            {error && <p className="error" role="alert">{error}</p>}
            <button
            className="btn" 
            type="submit">
                Добавить
            </button>
        </form>
    )
}
