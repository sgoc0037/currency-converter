import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { getListOfCurrencies } from "../DAL/request"

interface defaultState {
    listOfCurrency: object
}

const initialState: defaultState = {
    listOfCurrency: {}
}

export const defaultFetch = createAsyncThunk<object, void, { rejectValue: string }>(
    'defaultValues/defaultFetch',
    async () => {
        const response = await getListOfCurrencies()
        return response.data.results
    }
)

const defaultSlice = createSlice({
    initialState,
    name: 'defaultValues',
    reducers: {
        testSetAllCurrencies: (state, action: PayloadAction<object>) => {
            state.listOfCurrency = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(defaultFetch.fulfilled, (state, action) => {
                state.listOfCurrency = action.payload
            })
    }
})

export const { testSetAllCurrencies } = defaultSlice.actions
export default defaultSlice.reducer