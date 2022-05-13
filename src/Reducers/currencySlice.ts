import { createAsyncThunk } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { getCurrency } from '../DAL/request';

const initialState = {
    oneInput: 0,
    secondInput: 0,
    oneSelect: '',
    secondSelect: '',
    currentCurrency: {}
}

export const currencyFetch = createAsyncThunk(
    'currentCurrencies/currencyFetch',
    async ({one:string,second}, rejectWithValue) => {
        try {
            const response = await getCurrency({one,second})
            return response.data
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

const currencySlice = createSlice({
    initialState,
    name: 'currentCurrencies',
    reducers: {
        setOneInput: (state, action) => {
            state.oneInput = action.payload
        },
        setSecondInput: (state, action) => {
            state.secondInput = action.payload
        },
        setOneSelect: (state, action) => {
            state.oneSelect = action.payload
        },
        setSecondSelect: (state, action) => {
            state.secondSelect = action.payload
        },
    },
    extraReducers: {
        [currencyFetch.fulfilled]: (state, action) => {
            state.currencySlice.currentCurrency = action.payload
        },
        [currencyFetch.rejected]: (state, action) => {
            console.log(action.payload)
        }
    }
})

export const { setOneInput, setSecondInput, setOneSelect, setSecondSelect } = currencySlice.actions
export default currencySlice.reducer