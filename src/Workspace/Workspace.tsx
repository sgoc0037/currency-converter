import React from 'react'
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { getCurrency, getListOfCurrencies } from '../DAL/request'
import { currencyFetch } from '../Reducers/currencySlice';
import { defaultFetch, setCurrencies, setDefaultCurrencies } from '../Reducers/defaultSlice';
import { Converter } from './Converter/Converter';

export const Workspace = () => {

    const dispatch = useAppDispatch()

    const arrayCurrency = useAppSelector(state => state.defaultSlice.listOfCurrency)
    console.log(arrayCurrency)

    useEffect(() => {
        dispatch(defaultFetch())
        dispatch(currencyFetch({'USD','RUB'}))
    }, [])

    const getDefaultCurrencies = async () => {
        let answer = await getCurrency()
        dispatch(setDefaultCurrencies(answer))
    }

    return <div>
        <Converter />
    </div>
}