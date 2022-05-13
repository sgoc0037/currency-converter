import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getListOfCurrencies } from "../DAL/request"

const initialState = {
    listOfCurrency: {},
    defaultCurrencies: {}
}

export const defaultFetch = createAsyncThunk(
    'defaultValues/defaultFetch',
    async (_, { rejectWithValue }) => {
        try {
            const response = await getListOfCurrencies()
            return response.data.results
        } catch (error) {
            console.log(error)
        }
    }
)

const defaultSlice = createSlice({
    initialState,
    name: 'defaultValues',
    reducers: {
        setDefaultCurrencies: (state, action) => {
            state.defaultCurrencies = action.payload
        },
    },
    extraReducers: {
        [defaultFetch.fulfilled]: (state, action) => {
            state.listOfCurrency = action.payload
        },
        [defaultFetch.rejected]: (state) => { console.log('error') }
    }
})



export const { setCurrencies, setDefaultCurrencies } = defaultSlice.actions
export default defaultSlice.reducer