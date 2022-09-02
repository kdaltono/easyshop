import React from 'react';
import { MealItem } from './mealitem'
import { Grid, Box } from '@mui/material';
import { getAllMeals } from '../../http/rest_api';
import './meal.css';

export class Meal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            meals: []
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
                                                meal_id={meal.meal_id}/>
                                        </Grid>
                                    )
                                })
                            }
                        </Grid>
                    </Box>
                </Box>
            )
        } else {
            return (
                <div>Could not load meals!</div>
            )
        }
    }
}