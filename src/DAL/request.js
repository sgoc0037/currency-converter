import axios from "axios";

const API_KEY = '11226963255e300ee036';

export const getListOfCurrencies = () => {
    return axios.get(`https://free.currconv.com/api/v7/currencies?apiKey=${API_KEY}`, {
        headers: {
            'Content-Type': "application/json",
        }
    })
}

export const getCurrency = (one,second) => {
    return axios.get(`https://free.currconv.com/api/v7/convert?q=${one}_${second},${second}_${one}&compact=ultra&apiKey=${API_KEY}`, {
        headers: {
            'Content-Type': "application/json",
        }
    })
}