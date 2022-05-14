import React from 'react'
import { FC } from 'react';

interface reInput {
    currency: string
    setCurrency: (num: number) => void,
}

export const Input: FC<reInput> = ({ currency = '', setCurrency }) => {

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrency(+e.target.value)
    }

    return <input
        value={currency}
        onChange={changeHandler}
        type='number'
    />
}