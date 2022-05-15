import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Input } from '../../reComponent/input'
import { Select } from '../../reComponent/select';
import { currencyInput, setOneInput, setOneSelect, setSecondInput, setSecondSelect } from '../../Reducers/currencySlice';
import { defaultCurrencies } from '../../Types/types';

interface changeEffectHandler {
    (value: number, setValue: (num: number) => void, currency: number): void
}

export const Converter: FC = () => {
    const dispatch = useAppDispatch()
    const listOfCurrency = useAppSelector(state => state.defaultSlice.listOfCurrency)
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
        return Math.floor(count * rate * 100) / 100
    }

    const { register, handleSubmit, formState: { errors } } = useForm<currencyInput>();

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
        <form onChange={changeHandlerTest}>
            <div className='one'>
                <input
                    type='number'
                    {...register('oneInput')}
                    value={oneInput}
                    onFocus={() => setToggle(true)}
                ></input>
                <Select
                    setValue={handlerForOneSelect}
                    currentCurrency={oneType}
                />
            </div>
            <hr />
            <div className='second'>
                <input
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