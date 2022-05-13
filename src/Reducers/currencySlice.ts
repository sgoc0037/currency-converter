import { createAsyncThunk } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { getCurrency } from '../DAL/request';


export interface sendCurrentCurrencies {
    oneType: string,
    secondType: string,
}
interface workCurrencies extends sendCurrentCurrencies {
    oneValue: number,
    secondValue: number
}
interface currencyState {
    oneInput: string,
    secondInput: string,
    workCurrencies: workCurrencies
}

const initialState: currencyState = {
    oneInput: '',
    secondInput: '',
    workCurrencies: {
        oneType: 'RUB',
        secondType: 'USD',
        oneValue: 0,
        secondValue: 0,
    }
}

export const currencyFetch = createAsyncThunk<object, sendCurrentCurrencies, { rejectValue: string }>(
    'currentCurrencies/currencyFetch',
    async ({ oneType, secondType }, {rejectWithValue}) => {
        try {
            
        } catch (error) {
            rejectWithValue('Error')
        }
        const response = await getCurrency({ oneType, secondType })
        return response.data
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
            state.workCurrencies.oneType = action.payload
        },
        setSecondSelect: (state, action) => {
            state.workCurrencies.secondType = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(currencyFetch.fulfilled, (state, action) => {
                console.log(action.payload)
            })
            .addCase(currencyFetch.rejected, (state, action) => {
                console.log(action.payload)
            })
    }
})

export const { setOneInput, setSecondInput, setOneSelect, setSecondSelect } = currencySlice.actions
export default currencySlice.reducer