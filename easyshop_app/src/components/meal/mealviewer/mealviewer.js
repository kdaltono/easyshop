import { Typography, Container, Box, Divider, List, ListItem, ListItemText } from "@mui/material";
import React from "react";
import { useSearchParams } from "react-router-dom";
import { getAllMealData } from "../../../http/rest_api";
import './mealviewer.css'

export function MealViewerMain() {
    let [searchParams, setSearchParams] = useSearchParams();
    const mealId = searchParams.get("mealid")

    return (
        <div>   
            <MealViewer 
                mealId={mealId}/>
        </div>
    )
}

export class MealViewer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            mealData: [],
            mealIngredients: []
        }
    }

    componentDidMount() {
        getAllMealData(this.props.mealId).then((res) => {
            this.setState({
                mealData: res.data.meal_data[0],
                mealIngredients: res.data.meal_ingredients
            })
        })
    }

    render() {
        return (
            <Container 
                maxWidth='md'>
                <Box sx={{
                    marginTop: '30px'
                }}>
                    <div className="meal-viewer-header">
                        <Typography variant="h5">
                            {this.state.mealData.meal_title}
                        </Typography>
                        <Typography variant="p">
                            {this.state.mealData.meal_desc}
                        </Typography>
                    </div>

                    <Divider />

                    <div className="meal-viewer-ingredients">
                        <Typography variant="h5">
                            Ingredients
                        </Typography>
                            <List
                                dense={true}>
                            {
                                (this.state.mealIngredients.length > 0 ? 
                                this.state.mealIngredients.map((ingredient, index) => {
                                    return (
                                        <ListItem
                                            key={`${index}${ingredient.ingredient_title}${ingredient.ingredient_qty}`}>
                                            <ListItemText
                                                style={{ paddingTop: '0px', paddingBottom: '0px' }}
                                                primary={
                                                    <Typography variant="p">
                                                        {`${ingredient.ingredient_qty} x ${ingredient.ingredient_title}`}
                                                    </Typography>}/>
                                        </ListItem>
                                    )
                                }) 
                                :
                                (
                                    <ListItem>
                                        <ListItemText 
                                            primary={"No ingredients to show!"}/>   
                                    </ListItem>
                                ))
                            }
                            </List>
                    </div>

                    <Divider />

                    <div className="meal-viewer-body">
                        <Typography variant="h5">
                            Recipe
                        </Typography>
                        <Typography variant="p" style={{ whiteSpace: 'pre-wrap' }}>
                            {this.state.mealData.meal_recipe}
                        </Typography>
                    </div>
                </Box>
            </Container>
        )
    }
}