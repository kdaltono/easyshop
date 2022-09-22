import axios from 'axios';

const url = 'http://127.0.0.1:3000/';

export const noConn = Promise.resolve({ data: 'No connection to server', error: 'ERR' });

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