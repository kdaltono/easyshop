import { AddShoppingCart } from "@mui/icons-material";
import { Typography, Container, Box, Menu, List, ListItem, ListItemText, Button, MenuItem, Skeleton } from "@mui/material";
import React from "react";
import { useSearchParams } from "react-router-dom";
import { getAllMealData, getAllActiveMealLists, insertNewMealListMeal } from "../../../http/rest_api";
import './mealviewer.css'
import { titleFont, subheadingFont, detailFont } from "../../../utils/textStyling";

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

    render() {
        return (
            <Container 
                maxWidth='md'>
                <Box sx={{
                    marginTop: '30px'
                }}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            width: '100%',
                            backgroundColor: '#6B8E23',
                            borderRadius: '15px'
                        }}>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                width: "40%"
                            }}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    width: '100%',
                                    height: '350px'
                                }}>
                                <Box
                                    sx={{
                                        width: "100%",
                                        height: "200px",
                                        position: "relative",
                                        backgroundColor: 'gray',
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'center',
                                        borderTopLeftRadius: '15px'
                                    }}>
                                    {!this.state.imageIsLoaded &&
                                        <Skeleton 
                                            variant="rectangular"
                                            width={"100%"}
                                            height="auto"
                                            sx={{
                                                borderTopLeftRadius: '15px'
                                            }}/>
                                    }
                                    <Box
                                        sx={{
                                            width: '100%',
                                            height: '100%',
                                            overflow: 'hidden',
                                            borderTopLeftRadius: '15px'
                                        }}>
                                        <img 
                                            src={`http://localhost:5001/easyshop_imagehost/image?mealId=${this.props.mealId}`}                                
                                            onLoad={this.handleImageLoaded}
                                            class="meal-image"
                                            width="100%"
                                            height={this.state.imageIsLoaded ? "auto" : 0}
                                            alt=""/>
                                    </Box>
                                </Box>

                                <AddToListButton 
                                    activeMealLists={this.state.activeMealLists}
                                    />
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                width: '60%',
                                marginLeft: '20px',
                                paddingTop: '20px'
                            }}>
                            <Typography 
                                sx={titleFont}>
                                {this.state.mealData.meal_title}
                            </Typography>
                            <Typography
                                sx={detailFont}>
                                {this.state.mealData.username}
                            </Typography>
                            <Typography 
                                sx={detailFont}>
                                {this.state.mealData.meal_desc}
                            </Typography>
                        </Box>
                    </Box>

                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            width: '100%',
                            paddingTop: '40px'
                        }}>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                width: '30%',
                                paddingLeft: '10px'
                            }}>
                            <Typography 
                                variant="h5"
                                sx={subheadingFont}>
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
                                                        <Typography 
                                                            variant="p"
                                                            sx={detailFont}>
                                                            {`${ingredient.ingredient_qty}${ingredient.measure_abbr} x ${ingredient.ingredient_title}`}
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
                        </Box>

                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column'
                            }}>
                            <Typography 
                                variant="h5"
                                sx={subheadingFont}>
                                Recipe
                            </Typography>
                            <Typography 
                                variant="p" 
                                style={{ whiteSpace: 'pre-wrap' }}
                                sx={detailFont}>
                                {this.state.mealData.meal_recipe}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Container>
        )
    }
}

function AddToListButton(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const addToShoppingList = (mealList) => {
        insertNewMealListMeal({
            meal_list_id: mealList.meal_list_id,
            meal_id: this.props.mealId
        }).then((res) => {
            // Show a snackbar letting the user know it was successful
        })
    }

    const onAddToListMenuClose = (mealList) => {
        if (mealList.meal_list_id) {
            addToShoppingList(mealList)
        }
        setAnchorEl(undefined)
    }

    const openAddToListMenu = (event) => {
        setAnchorEl(event.currentTarget)
    }

    return (
        <Box>        
            <Button
                className="add-meal-button"
                variant="contained"
                endIcon={<AddShoppingCart />}
                onClick={openAddToListMenu}
                sx={{
                    marginLeft: "10px",
                    marginTop: "10px"
                }}>
                Add to List
            </Button>
            <Menu
                anchorEl={anchorEl}
                open={anchorEl ? true : false}
                onClose={onAddToListMenuClose}>
                {
                    (props.activeMealLists.length > 0 ? 
                    props.activeMealLists.map((mealList) => {
                        return (
                            <MenuItem
                                onClick={() => onAddToListMenuClose(mealList)}
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
}