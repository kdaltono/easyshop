import { Link } from 'react-router-dom'
import { Card, CardMedia, CardContent, Skeleton, Typography, Button, Box } from '@mui/material';
import React from "react"
import './meal.css'

const cardHeight = 280
const cardWidth = 240
const imgHeight = 118

export class MealItem extends React.Component {
    goToGetMeal() {
        this.props.history.push(`/getmeal?mealid=${this.props.meal_id}`)
    }

    openMealListMenu = (event) => {
        this.props.setAnchoredMealId(this.props.meal_id)
        this.props.quickAdd(event)
    }

    render() {
        return ( 
            //<Link>
                <Card 
                    sx={{ 
                        width: cardWidth,
                        height: cardHeight
                    }}>
                    <Link
                        to={`/getmeal?mealid=${this.props.meal_id}`}
                        style={{ textDecoration: 'none' }}>
                        <CardMedia 
                            className='card-media-image'>
                            <Skeleton
                                variant="rectangular"
                                width={cardWidth}
                                height={imgHeight} />
                        </CardMedia>
                    </Link>
                    <CardContent>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                height: cardHeight - imgHeight - 32
                            }}>
                            <Typography
                                variant="h6">
                                {this.props.meal_title}
                            </Typography>
                            <Typography
                                sx={{
                                    overflow: "hidden",
                                    textOverflow: "ellipses",
                                    display: "-webkit-box",
                                    WebkitLineClamp: "3",
                                    WebkitBoxOrient: "vertical"
                                }}
                                variant="div">
                                {this.props.meal_desc}
                            </Typography>
                            <Button
                                sx={{
                                    marginTop: "auto"
                                }}
                                onClick={this.openMealListMenu}>
                                Quick Add
                            </Button>
                        </Box>
                    </CardContent>                
                </Card>
            //</Link>
        )
    }
}