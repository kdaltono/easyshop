import { Link } from 'react-router-dom'
import { Card, CardMedia, CardContent, Skeleton, Typography } from '@mui/material';
import React from "react"
import './meal.css'

export class MealItem extends React.Component {
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