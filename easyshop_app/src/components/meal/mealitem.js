import { Link } from 'react-router-dom'
import { Card, CardMedia, CardContent, Skeleton, Typography, Button, Box } from '@mui/material';
import { useState } from "react"
import './meal.css'

const cardHeight = 280
const cardWidth = 240
const imgHeight = 118

export function MealItem(props) {
    const [imageIsLoaded, setImageIsLoaded] = useState(0)

    const openMealListMenu = (event) => {
        props.setAnchoredMealId(props.meal_id)
        props.quickAdd(event)
    }

    const handleImageLoaded = () => {
        setImageIsLoaded(true)
    }

    return ( 
        //<Link>
            <Card 
                sx={{ 
                    width: cardWidth,
                    height: cardHeight
                }}>
                <Link
                    to={`/getmeal?mealid=${props.meal_id}`}
                    style={{ textDecoration: 'none' }}>
                    <CardMedia 
                        className='card-media-image'>
                        {!imageIsLoaded && 
                            <Skeleton
                                variant="rectangular"
                                width={cardWidth}
                                height={imgHeight} />
                        }
                        <img 
                            src={`http://localhost:5001/easyshop_imagehost/image?mealId=${props.meal_id}`}
                            onLoad={handleImageLoaded}
                            width={cardWidth}
                            height={imageIsLoaded ? imgHeight : 0}
                            alt=""/>
                    </CardMedia>
                </Link>
                <CardContent
                    sx={{
                        paddingTop: "0px"
                    }}>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            height: cardHeight - imgHeight - 32
                        }}>
                        <Typography
                            variant="h6">
                            {props.meal_title}
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
                            {props.meal_desc}
                        </Typography>
                        <Button
                            sx={{
                                marginTop: "auto"
                            }}
                            onClick={openMealListMenu}>
                            Quick Add
                        </Button>
                    </Box>
                </CardContent>                
            </Card>
        //</Link>
    )
}