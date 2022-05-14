import React from 'react'
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { currencyFetch, testCurrentCurrency } from '../Reducers/currencySlice';
import { defaultFetch, testSetAllCurrencies } from '../Reducers/defaultSlice';
import { getTestAllCurrencies, getTestCurrentCurrency } from '../Test/test';
import { Converter } from './Converter/Converter';

export const Workspace = () => {

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(testSetAllCurrencies(getTestAllCurrencies)) //<--- it's place for defaultFetch()
        dispatch(testCurrentCurrency(getTestCurrentCurrency)) //<-- it's place for currencyFetch({oneType:'RUB',secondType:'USD'})
    }, [dispatch])

    return <div>
        <Converter />
    </div>
}