import React from 'react'
import { FC } from 'react'
import { useAppSelector } from '../../app/hooks'
import style from './select.module.css'

export interface LSelect {
    setValue: (str: string) => void,
    currentCurrency: string
}

export const Select: FC<LSelect> = ({ setValue, currentCurrency }) => {

    const listOfCurrency = useAppSelector(state=> state.defaultSlice.listOfCurrency)

    const changeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setValue(e.target.value)
    }

    return <select
    className={style.select}
        value={currentCurrency}
        onChange={changeHandler}>
        {
            Object.keys(listOfCurrency).map((item) => {

                if (item === currentCurrency) {
                    return <option
                        key={item}
                        value={item}
                    >{item}</option>
                }
                return <option
                    key={item}
                    value={item}
                >{item}</option>
            })
        }
    </select>
}