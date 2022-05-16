import React from 'react'
import { useState } from 'react';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Select } from '../../reComponent/select/select';
import {
    currencyInput, setOneInput, setOneSelect, setSecondInput, setSecondSelect
} from '../../Reducers/currencySlice';
import style from './Converter.module.css'

export const Converter: FC = () => {
    const dispatch = useAppDispatch()
    const oneInput = useAppSelector(state => state.currencySlice.oneInput)
    const secondInput = useAppSelector(state => state.currencySlice.secondInput)
    const oneType = useAppSelector(state => state.currencySlice.workCurrencies.oneType)
    const secondType = useAppSelector(state => state.currencySlice.workCurrencies.secondType)
    const oneRate = useAppSelector(state => state.currencySlice.workCurrencies.oneRate)
    const secondRate = useAppSelector(state => state.currencySlice.workCurrencies.secondRate)

    const [toggle, setToggle] = useState<boolean>(true) //<--- True === oneInput/False === secondInput

    const handlerForOneSelect = (value: string) => {
        dispatch(setOneSelect(value))
    }
    const handlerForSecondSelect = (value: string) => {
        dispatch(setSecondSelect(value))
    }

    const counting = (count: number, rate: number) => {
        return String(Math.floor(count * rate * 100) / 100)
    }

    const { register, handleSubmit } = useForm<currencyInput>();

    const changeHandlerTest = handleSubmit(data => {
        if (toggle) {
            dispatch(setSecondInput(counting(+data.oneInput, oneRate)))
            dispatch(setOneInput(data.oneInput))
        } else if (!toggle) {
            dispatch(setOneInput(counting(+data.secondInput, secondRate)))
            dispatch(setSecondInput(data.secondInput))
        }
    })

    return <>
        <form className={style.form} onChange={changeHandlerTest}>
            <div className={style.oneBlock}>
                <input
                    className={style.input}
                    type='number'
                    {...register('oneInput')}
                    value={oneInput}
                    onFocus={(e) => setToggle(true)}
                ></input>
                <Select
                    setValue={handlerForOneSelect}
                    currentCurrency={oneType}
                />
                <input
                    className={style.input}
                    type='number'
                    {...register('secondInput')}
                    value={secondInput}
                    onFocus={() => setToggle(false)}
                ></input>
                <Select
                    setValue={handlerForSecondSelect}
                    currentCurrency={secondType} />
            </div>
        </form>
    </>
}