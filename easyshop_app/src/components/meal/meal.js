import React from 'react';
import Typography from '@mui/material/Typography';

import { Card, CardMedia, CardContent, Skeleton } from '@mui/material';

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
                <div className='meal-item-list'>
                    {
                        this.state.meals.map((meal, index) => {
                            return (
                                <div className='meal-item'>
                                    <MealItem 
                                        meal_title={meal.meal_title}
                                        meal_desc={meal.meal_desc}/>
                                </div>
                            )
                        })
                    }
                </div>
            )
        } else {
            return (
                <div>Could not load meals!</div>
            )
        }
    }
}

class MealItem extends React.Component {
    render() {
        return ( 
        <Card sx={{ width: 245 }}>
            <CardMedia 
                className='card-media-image'>
                <Skeleton
                    variant="rectangular"
                    width={245}
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
        )
    }
}