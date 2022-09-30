import axios from 'axios';

const url = 'http://127.0.0.1:8080/easyshop_rep/report?'

export async function getPdfBytes(mealListId, dlm, dwm) {
    return await axios.get(`${url}mealListId=${mealListId}&dlm=${dlm}&dwm=${dwm}`)
}