import axios from 'axios';

const url = 'http://127.0.0.1:8080/easyshop_rep/report?mealListId='

export async function getPdfBytes(mealListId) {
    return await axios.get(`${url}${mealListId}`)
}