import React from 'react';
import { insertMeal, insertMealIngredients, uploadImage } from '../../http/rest_api';
import { Typography, Container, Divider, Input, Button, List, ListItem, IconButton, Box } from '@mui/material';
import { Add, Delete, InsertPhoto } from '@mui/icons-material'
import { AddIngredientForm } from './addingredients/addingredients';
import { titleFont, subheadingFont, bigDetailFont } from '../../utils/textStyling';
import './addmeal.css'

export class AddMeal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            meal_title: '',
            meal_title_err: false,
            meal_desc: '',
            meal_desc_err: false,
            meal_recipe: '',
            meal_recipe_err: false,
            selectedIngredients: [],
            selectedIngredients_error: false,
            open: false,
            file: false,
            fileURL: ''
        }

        this.mealTitleChange = this.mealTitleChange.bind(this);
        this.mealDescChange = this.mealDescChange.bind(this);
        this.mealRecipeChange = this.mealRecipeChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validateData = this.validateData.bind(this);
        this.handleFileChosen = this.handleFileChosen.bind(this);
    }

    setSelectedIngredients(arr) {
        this.setState({
            selectedIngredients: arr
        })
        console.log('selectedIngredients updated: ' + JSON.stringify(this.state.selectedIngredients))
    }

    handleFileChosen(selectedFile) {
        this.setState({
            file: selectedFile,
            fileURL: URL.createObjectURL(selectedFile)
        })
    }

    mealTitleChange(event) {
        this.setState({
            meal_title: event.target.value
        })
    }

    mealDescChange(event) {
        this.setState({
            meal_desc: event.target.value
        })
    }

    mealRecipeChange(event) {
        this.setState({
            meal_recipe: event.target.value
        })
    }

    validateData() {
        var isValid = true
        if (this.state.meal_title.length === 0) {
            isValid = false
            this.setState({
                meal_title_err: true
            })
        }

        if (this.state.meal_desc.length === 0) {
            isValid = false
            this.setState({
                meal_desc_err: true
            })
        }

        if (this.state.meal_recipe.length === 0) {
            isValid = false
            this.setState({
                meal_recipe_err: true
            })
        }

        if (this.state.selectedIngredients.length === 0) {
            isValid = false
            this.setState({
                selectedIngredients_error: true
            })
        }

        return isValid
    }

    handleSubmit(event) {
        event.preventDefault();
        if (this.validateData()) {
            insertMeal({
                meal_title: this.state.meal_title,
                meal_desc: this.state.meal_desc,
                meal_recipe: this.state.meal_recipe
            }).then((res) => {
                const meal_id = res.data.insertId;

                var mealIngredients = []
                this.state.selectedIngredients.forEach((ingredient) => {
                    mealIngredients.push({meal_id: meal_id, ingredient_id: ingredient.ingredient_id, ingredient_qty: ingredient.ingredient_qty, measure_id: ingredient.measure_id})
                })

                insertMealIngredients(mealIngredients).then((res) => {
                    this.setState({
                        meal_title: '',
                        meal_desc: '',
                        meal_recipe: '',
                        selectedIngredients: []
                    });
                })

                if (this.state.file) {
                    console.log("Uploading image")
                    uploadImage(meal_id, this.state.file, this.state.file.name).then((res) => {
                        console.log("Image upload completed. Response: " + JSON.stringify(res))
                        this.setState({
                            fileURL: '',
                            file: false
                        })
                    })
                }
                // TODO: Add a Snackbar to let the user know that it was all created successfully. Maybe move the contents of this function to a helper function as it is quite verbose
            })
        }
    }

    showSelectedIngredients() {
        if (this.state.selectedIngredients.length > 0) {
            return (
                <div>
                    <List>  
                        {this.state.selectedIngredients.map((ingredient, index) => {
                            return (
                                <ListItem 
                                    key={ingredient + index}
                                    secondaryAction={
                                        <IconButton 
                                            edge="end"
                                            onClick={() => this.removeAtIndex(index)} >
                                            <Delete />
                                        </IconButton>
                                    }>
                                    {ingredient.ingredient_qty}{ingredient.measure_abbr} x {ingredient.ingredient_title}
                                </ListItem>
                            )
                        })}
                    </List>
                </div>
            )
        } else {
            return (
                <div>
                    {this.state.selectedIngredients_error || this.state.selectedIngredients.length > 0 ? 'Please add the meal\'s ingredients!' : ''}
                </div>
            )
        }
    }

    handleClickOpen = () => {
        this.setState({
            open: true
        })
    }

    handleClose = (value) => {
        this.setState({
            open: false
        })
        if (value) {
            this.state.selectedIngredients.push(value);
        }
    }

    getOpen = () => {
        return this.state.open
    }

    removeAtIndex = (i) => {
        this.setState({
            selectedIngredients: this.state.selectedIngredients.filter((_, index) => index !== i)
        })
    }

    render() {
        return (
            <div className='add-meal-form-outer'>
                <Container className='add-meal-form'>
                    <div className='form-header'>
                        <Typography 
                            variant="h5"
                            sx={titleFont}>
                            Add a New Recipe!
                        </Typography>
                        <Typography 
                            variant="p"
                            sx={bigDetailFont}>
                            Add a new meal to add to your shopping lists. A meal consists of: the name, a short description, the recipe, and all of the ingredients.
                        </Typography>    
                    </div>

                    <Divider/>
                    <div className='form-body'>
                        <form onSubmit={this.handleSubmit} className='form-layout'>
                            <Box
                                sx={{
                                    width: "100%",
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center"
                                }}>
                                {this.state.file && 
                                    <img 
                                        width={"200px"}
                                        height={"200px"}
                                        src={this.state.fileURL}
                                        alt="" />
                                }
                                <Button
                                    variant='outlined'
                                    component="label"
                                    startIcon={<InsertPhoto />} 
                                    sx={{
                                        marginTop: "10px",
                                        width: "100%"
                                    }}>
                                    Upload An Image
                                    <input 
                                        type="file"
                                        id="file"
                                        onChange={(event) => this.handleFileChosen(event.target.files[0])}
                                        hidden
                                    />
                                </Button>
                            </Box>
                            
                            <div className='text-input-layout'>
                                <Typography 
                                    variant='h6'
                                    sx={subheadingFont}>
                                    Meal Name
                                </Typography>
                                <Input 
                                    error = {this.state.meal_title_err}
                                    placeholder="Enter the meal's name" 
                                    value={this.state.meal_title} 
                                    onChange={this.mealTitleChange}
                                    className='text-input'
                                    variant="standard"/>
                            </div>

                            <div className='text-input-layout'>
                                <Typography 
                                    variant='h6'
                                    sx={subheadingFont}>
                                    Description
                                </Typography>
                                <Input 
                                    error = {this.state.meal_desc_err}
                                    label = {this.state.meal_desc_err ? 'Error' : ''}
                                    placeholder="Enter a short description of the meal"
                                    value={this.state.meal_desc}
                                    onChange={this.mealDescChange}
                                    className='text-input'/>
                            </div>

                            <div className='text-input-layout'>
                                <Typography 
                                    variant='h6'
                                    sx={subheadingFont}>
                                    Ingredients
                                </Typography>
                                {this.showSelectedIngredients()}
                                <Button 
                                    variant='outlined' 
                                    startIcon={<Add />} 
                                    onClick={this.handleClickOpen}>
                                    Add Ingredient
                                </Button>
                                <AddIngredientForm 
                                    selectedValue={this.state.selectedValue}
                                    open={() => this.getOpen()}
                                    onClose={this.handleClose}
                                    addIngredientOpen={() => this.handleAddIngredientClickOpen()}/>
                            </div>

                            <div className='text-input-layout'>
                                <Typography     
                                    variant='h6'
                                    sx={subheadingFont}>
                                    Recipe
                                </Typography>
                                <Input 
                                    error = {this.state.meal_recipe_err}
                                    label = {''}
                                    placeholder="Enter the recipe for this meal"
                                    value={this.state.meal_recipe}
                                    onChange={this.mealRecipeChange}
                                    multiline
                                    className='text-input'/>
                            </div>

                            <Button
                                type="submit"
                                variant="contained">
                                Submit
                            </Button>
                        </form>
                    </div>
                </Container>
            </div>
        )
    }
}