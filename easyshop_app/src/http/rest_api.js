import axios from 'axios';
import history from '../utils/history'
import { getToken, clearToken } from '../services/jwt_service'

axios.interceptors.request.use(
    config => {
        let token = getToken()
        if (token) {
            config.headers['Authorization'] = token
        }
        return config
    },
    error => {
        Promise.reject(error)
    }
)

axios.interceptors.response.use(
    response => {
        return response
    },
    error => {
        if (error.response.status === 401) {
            clearToken()
            history.push('/login')
        }
        return Promise.reject(error)
    }
)

const url = 'http://127.0.0.1:3000/';

export const noConn = Promise.resolve({ data: 'No connection to server', error: 'ERR' });

export async function login(username, password) {
    try {
        return await axios.post(`${url}login`, { username: username, password: password })
    } catch (err) {
        return {
            data: err.message,
            status: err.response.status,
            code: err.code,
            error: 'ERR'
        }
    }
}

export async function register(username, first_name, last_name, password) {
    try {
        return await axios.post(`${url}register`, { username: username, first_name: first_name, last_name: last_name, password: password })
    } catch (err) {
        console.error(err)
        return {
            data: err.message,
            error: 'ERR'
        }
    }
}

export async function getRestMessage() {
    try {
        return await axios.get(url);
    } catch (err) {
        console.error(err);
        return {
            data: err.message,
            error: 'ERR'
        }
    }
}

export async function getMealIngredients(mealId) {
    try {
        return await axios.get(`${url}m/${mealId}`)
    } catch (err) {
        console.error(err);
        return {
            data: err.message,
            error: 'ERR'
        }
    }
}

export async function insertMeal(mealData) {
    try {
        return await axios.post(`${url}m/`, { mealData: mealData });
    } catch (err) {
        console.error(err);
        return {
            data: err.message,
            error: 'ERR'
        }
    }
}

export async function getAllMeals() {
    try {
        return await axios.get(`${url}m/all`)
    } catch (err) {
        console.error(err);
        return {
            data: err.message,
            error: 'ERR'
        }
    }
}

export async function getAllIngredientCategories() {
    try {
        return await axios.get(`${url}ic/all`)
    } catch (err) {
        console.error(err);
        return {
            data: err.message,
            error: 'ERR'
        }
    }
}

export async function getAllIngredients() {
    try {
        return await axios.get(`${url}i/all`)
    } catch (err) {
        console.error(err)
        return {
            data: err.message,
            error: 'ERR'
        }
    }
}

export async function getAllMeasures() {
    try {
        return await axios.get(`${url}me`)
    } catch (err) {
        console.error(err)
        return {
            data: err.message,
            error: 'ERR'
        }
    }
}

export async function insertMealIngredients(mealIngredientData) {
    try {
        return await axios.post(`${url}mi`, { mealIngredientData: mealIngredientData })
    } catch (err) {
        console.error(err)
        return {
            data: err.message,
            error: 'ERR'
        }
    }
}

export async function insertNewMealListMeal(mealListMealData) {
    try {
        return await axios.post(`${url}mlm/i`, { mealListMealData: mealListMealData })
    } catch (err) {
        console.error(err)
        return {
            data: err.message,
            error: 'ERR'
        }
    }
}

export async function insertNewIngredient(ingredientData) {
    try {
        return await axios.post(`${url}i/`, {ingredient: ingredientData})
    } catch (err) {
        console.error(err)
        return {
            data: err.message,
            error: 'ERR'
        }
    }
}

export async function insertNewMealList(meal_list_name) {
    try {
        return await axios.post(`${url}ml`, {meal_list_name: meal_list_name})
    } catch (err) {
        console.error(err)
        return {
            data: err.message,
            error: 'ERR'
        }
    }
}

export async function getAllMealData(mealId) {
    try {
        return await axios.get(`${url}ma/${mealId}`)
    } catch (err) {
        console.error(err)
        return {
            data: err.message,
            error: 'ERR'
        }
    }
}

export async function getAllActiveMealLists() {
    try {
        return await axios.get(`${url}ml/a`)
    } catch (err) {
        console.error(err)
        return {
            data: err.message,
            error: 'ERR'
        }
    }
}

export async function getMealListDataFromId(mealListId) {
    try {
        return await axios.get(`${url}ml/${mealListId}`)
    } catch (err) {
        console.error(err)
        return {
            data: err.message,
            error: 'ERR'
        }
    }
}

export async function getDefaultUnitMeasureId() {
    try {
        return await axios.get(`${url}me/u`)
    } catch (err) {
        console.error(err)
        return {
            data: err.message,
            error: 'ERR'
        }
    }
}