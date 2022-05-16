import { createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { getCurrency } from '../DAL/request';


export interface sendCurrentCurrencies {
    oneType: string,
    secondType: string,
}
export interface currencyInput {
    oneInput: string,
    secondInput: string,
}
interface currencyFetch {
    [oneValue: string]: number
}
interface workCurrencies extends sendCurrentCurrencies {
    oneValue: number,
    secondValue: number,
    oneRate: number,
    secondRate: number
}
interface currencyState extends currencyInput {
    workCurrencies: workCurrencies
}

const initialState: currencyState = {
    oneInput: '',
    secondInput: '',
    workCurrencies: {
        oneType: 'RUB',
        secondType: 'USD',
        oneRate: 0,
        secondRate: 0,
        oneValue: 0,
        secondValue: 0,
    }
}

export const currencyFetch = createAsyncThunk<currencyFetch, sendCurrentCurrencies>(
    'currentCurrencies/currencyFetch',
    async ({ oneType, secondType }) => {
        const response = await getCurrency({ oneType, secondType })
        return response.data
    }
)

const currencySlice = createSlice({
    initialState,
    name: 'currentCurrencies',
    reducers: {
        setOneInput: (state, action:PayloadAction<string>) => {
            state.oneInput = action.payload
        },
        setSecondInput: (state, action:PayloadAction<string>) => {
            state.secondInput = action.payload
        },
        setOneSelect: (state, action:PayloadAction<string>) => {
            state.workCurrencies.oneType = action.payload
        },
        setSecondSelect: (state, action:PayloadAction<string>) => {
            state.workCurrencies.secondType = action.payload
        },
        testCurrentCurrency: (state, action) => {
            const oneValue = Object.keys(action.payload)[0]
            const secondValue = Object.keys(action.payload)[1]
            state.workCurrencies.oneType = oneValue.slice(0, 3)
            state.workCurrencies.secondType = secondValue.slice(0, 3)
            state.workCurrencies.oneRate = action.payload[oneValue]
            state.workCurrencies.secondRate = action.payload[secondValue]
        }
    },
    extraReducers: (builder) => {
        builder.addCase(currencyFetch.fulfilled, (state, action) => {
            const oneValue = Object.keys(action.payload)[0]
            const secondValue = Object.keys(action.payload)[1]
            state.workCurrencies.oneType = oneValue.slice(0, 3)
            state.workCurrencies.secondType = secondValue.slice(0, 3)
            state.workCurrencies.oneRate = action.payload[oneValue]
            state.workCurrencies.secondRate = action.payload[secondValue]
        })
    }
})

export const { setOneInput, setSecondInput, setOneSelect, setSecondSelect, testCurrentCurrency } = currencySlice.actions
export default currencySlice.reducer