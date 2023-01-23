import { Add } from "@mui/icons-material";
import { Typography, Container, Box, Divider, Menu, List, ListItem, ListItemText, Button, MenuItem, Skeleton } from "@mui/material";
import React from "react";
import { useSearchParams } from "react-router-dom";
import { getAllMealData, getAllActiveMealLists, insertNewMealListMeal } from "../../../http/rest_api";
import './mealviewer.css'

export function MealViewerMain() {
    let [searchParams, ] = useSearchParams();
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
            mealIngredients: [],
            activeMealLists: [],
            anchorEl: undefined,
            imageIsLoaded: false
        }
        this.handleImageLoaded = this.handleImageLoaded.bind(this)
    }

    componentDidMount() {
        getAllMealData(this.props.mealId).then((res) => {
            this.setState({
                mealData: res.data.meal_data[0],
                mealIngredients: res.data.meal_ingredients
            })
        });
        getAllActiveMealLists().then((res) => {
            this.setState({
                activeMealLists: res.data
            })
        })
    }

    handleImageLoaded = () => {
        this.setState({
            imageIsLoaded: true
        })
    }

    addToShoppingList = (mealList) => {
        insertNewMealListMeal({
            meal_list_id: mealList.meal_list_id,
            meal_id: this.props.mealId
        }).then((res) => {
            // Show a snackbar letting the user know it was successful
        })
    }

    onAddToListMenuClose = (mealList) => {
        if (mealList.meal_list_id) {
            this.addToShoppingList(mealList)
        }

        this.setState({
            anchorEl: undefined
        })
    }

    openAddToListMenu = (event) => {
        this.setState({
            anchorEl: event.currentTarget
        })
    }

    render() {
        return (
            <Container 
                maxWidth='md'>
                <Box sx={{
                    marginTop: '30px'
                }}>
                    <div className="meal-viewer-action">
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                width: "100%",
                            }}>
                            <Box
                                sx={{
                                    width: "100%",
                                    height: "300px",
                                    position: "relative"
                                }}>
                                {!this.state.imageIsLoaded &&
                                    <Skeleton 
                                        variant="rectangular"
                                        width={"100%"}
                                        height="100%"/>
                                }
                                <img 
                                    src={`http://localhost:5001/easyshop_imagehost/image?mealId=${this.props.mealId}`}                                
                                    onLoad={this.handleImageLoaded}
                                    width="100%"
                                    height={this.state.imageIsLoaded ? "100%" : 0}
                                    alt=""/>
                            </Box>

                            <Button
                                className="add-meal-button"
                                variant="contained"
                                endIcon={<Add />}
                                onClick={this.openAddToListMenu}
                                sx={{
                                    marginLeft: "10px",
                                    marginTop: "10px",
                                    position: "absolute"
                                }}>
                                Add to List
                            </Button>
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
                    </div>

                    <Divider />

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