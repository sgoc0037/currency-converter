import React from 'react'
import { useState } from 'react';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Input } from '../../reComponent/input'
import { Select } from '../../reComponent/select';
import { defaultCurrencies } from '../../Types/types';

interface changeEffectHandler {
    (value: number, setValue: (num: number) => void, currency: number): void
}

export const Converter: FC = () => {

    const listOfCurrency = useAppSelector(state => state.defaultSlice.listOfCurrency)
    const dispatch = useAppDispatch()

    const { register, setValue, handleSubmit, formState: { errors } } = useForm<FormData>();

    // const oneInputCurrency = defaultCurrencies.USD_RUB
    // const secondInputCurrency = defaultCurrencies.RUB_USD
    const oneInputCurrency = 0
    const secondInputCurrency = 0

    const [oneInput, setOneInput] = useState<number>(oneInputCurrency);
    const [secondInput, setSecondInput] = useState<number>(secondInputCurrency);
    const [oneSelect, setOneSelect] = useState<string>('USD');
    const [secondSelect, setSecondSelect] = useState<string>('RUB');

    const changeHandlerTest = handleSubmit(data => {
        console.log(oneSelect, "<-====->", secondSelect)
        console.log(listOfCurrency)
        console.log(oneInput)
    })

    return <form onChange={changeHandlerTest}>
        <Input currency={oneInput}
            setCurrency={setOneInput}
        ></Input>
        <Select currentCurrency={oneSelect}
            setValue={setOneSelect}
        ></Select>
        <Input currency={secondInput}
            setCurrency={setSecondInput}
        ></Input>
        <Select currentCurrency={secondSelect}
            setValue={setSecondSelect}
        ></Select>
    </form>
}