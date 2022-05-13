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
    async (_, { rejectWithValue }) => {
        try {
            const response = await getListOfCurrencies()
            return response.data.results
        } catch (error) {
            rejectWithValue('Error')
        }
    }
)

const defaultSlice = createSlice({
    initialState,
    name: 'defaultValues',
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(defaultFetch.fulfilled, (state,action) => {
                state.listOfCurrency = action.payload
            })
            .addCase(defaultFetch.rejected,()=> {
                console.log("ALARM")
            })
    }
})

export default defaultSlice.reducer