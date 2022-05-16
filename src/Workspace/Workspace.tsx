import React from 'react'
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { currencyFetch, testCurrentCurrency } from '../Reducers/currencySlice';
import { defaultFetch, testSetAllCurrencies } from '../Reducers/defaultSlice';
import { getTestAllCurrencies, getTestCurrentCurrency } from '../Test/test';
import { Converter } from './Converter/Converter';

export const Workspace = () => {

    const dispatch = useAppDispatch()
    const oneType = useAppSelector(state=> state.currencySlice.workCurrencies.oneType)
    const secondType = useAppSelector(state=> state.currencySlice.workCurrencies.secondType)

    useEffect(() => {
        dispatch(testSetAllCurrencies(getTestAllCurrencies)) //<--- it's place for defaultFetch()
        dispatch(testCurrentCurrency(getTestCurrentCurrency)) //<-- it's place for currencyFetch({oneType:'RUB',secondType:'USD'})
    }, [dispatch])

    // useEffect(()=> {
    //     dispatch(currencyFetch({oneType,secondType}))
    // },[oneType,secondType])

    return <div>
        <Converter />
    </div>
}