import React from 'react';
import { MealItem } from './mealitem'
import { Grid, Box, Menu, MenuItem } from '@mui/material';
import { getAllMeals, getAllActiveMealLists, insertNewMealListMeal } from '../../http/rest_api';
import './meal.css';

export class Meal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            meals: [],
            anchorEl: undefined,
            activeMealLists: [],
            anchoredMealId: -1
        }
    }

    componentDidMount() {
        getAllMeals().then((res) => {
            if (!res.error) {
                this.setState({
                    meals: Array.from(res.data)
                })
            }
        })
        getAllActiveMealLists().then((res) => {
            this.setState({
                activeMealLists: res.data
            })
        })
    }

    addToShoppingList = (mealList) => {
        insertNewMealListMeal({
            meal_list_id: mealList.meal_list_id,
            meal_id: this.state.anchoredMealId
        }).then((res) => {
            // Show a snackbar letting the user know it was successful
        })
    }

    onAddToListMenuClose = (mealList) => {
        if (mealList) {
            console.log("Adding Meal to List...")
            this.addToShoppingList(mealList)
        }

        this.setState({
            anchorEl: undefined
        })
    }

    setAnchoredMealId = (mealId) => {
        this.setState({
            anchoredMealId: mealId
        })
    }

    openAddToListMenu = (event) => {
        this.setState({
            anchorEl: event.currentTarget
        })
    }

    render() {
        if (this.state.meals.length > 0) {
            return (
                <Box
                    paddingTop="30px"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    width="100%">
                    <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        maxWidth="60vw">
                        <Grid
                            container 
                            spacing={"10px"}
                            justifyContent="flex-start"
                            alignItems="flex-start">
                            {
                                this.state.meals.map((meal, index) => {
                                    return (
                                        <Grid item key={meal.meal_id}>
                                            <MealItem 
                                                meal_title={meal.meal_title}
                                                meal_desc={meal.meal_desc}
                                                meal_id={meal.meal_id}
                                                quickAdd={this.openAddToListMenu}
                                                setAnchoredMealId={this.setAnchoredMealId}/>
                                        </Grid>
                                    )
                                })
                            }
                        </Grid>
                    </Box>
                    <Menu
                        anchorEl={this.state.anchorEl}
                        open={this.state.anchorEl ? true : false}
                        onClose={this.onAddToListMenuClose}>
                        {
                            (this.state.activeMealLists.length > 0 ? 
                            this.state.activeMealLists.map((mealList) => {
                                return (
                                    <MenuItem
                                        onClick={() => this.onAddToListMenuClose(mealList)}
                                        key={mealList.meal_list_id}>
                                        {mealList.meal_list_name}
                                    </MenuItem>
                                )
                            })
                            :
                            (
                                <MenuItem
                                    disabled>
                                    No active meals!
                                </MenuItem>
                            ))
                        }
                    </Menu>
                </Box>
            )
        } else {
            return (
                <div>Could not load meals!</div>
            )
        }
    }
}