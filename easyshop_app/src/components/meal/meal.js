import React from 'react';
import { Link } from 'react-router-dom'
import Typography from '@mui/material/Typography';

import { Card, CardMedia, CardContent, Skeleton, Grid, Box, CardActionArea } from '@mui/material';

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
        // Use ImageList instead
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

class MealItem extends React.Component {
    // Add on click here to go to /getmeal?mealid=?

    goToGetMeal() {
        this.props.history.push(`/getmeal?mealid=${this.props.meal_id}`)
    }

    render() {
        return ( 
            <Link
                to={`/getmeal?mealid=${this.props.meal_id}`}
                style={{ textDecoration: 'none' }}>
                <Card sx={{ width: 240 }}>
                    <CardMedia 
                        className='card-media-image'>
                        <Skeleton
                            variant="rectangular"
                            width={240}
                            height={118} />
                    </CardMedia>
                    <CardContent>
                    <Typography
                            variant="h6">
                            {this.props.meal_title}
                        </Typography>
                        <Typography
                            variant="div">
                            {this.props.meal_desc}
                        </Typography>
                    </CardContent>
                </Card>
            </Link>
        )
    }
}