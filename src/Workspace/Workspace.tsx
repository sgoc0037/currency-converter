import React from 'react'
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { currencyFetch } from '../Reducers/currencySlice';
import { defaultFetch } from '../Reducers/defaultSlice';
import { Converter } from './Converter/Converter';

export const Workspace = () => {

    const dispatch = useAppDispatch()

    const arrayCurrency = useAppSelector(state => state.defaultSlice.listOfCurrency)
    console.log(arrayCurrency)

    useEffect(() => {
        dispatch(defaultFetch())
        dispatch(currencyFetch({oneType:'RUB',secondType:'USD'}))
    }, [dispatch])

    return <div>
        {/* <Converter /> */}
    </div>
}