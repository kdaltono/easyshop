import React from 'react';
import { insertMeal } from '../../http/rest_api';
import { Typography, Container, Divider, Input, Button, List, ListItem, IconButton } from '@mui/material';
import { Add, Delete } from '@mui/icons-material'
import { AddIngredientForm } from './addingredients/addingredients';
import './addmeal.css'

export class AddMeal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            meal_title: '',
            meal_desc: '',
            meal_recipe: '',
            selectedIngredients: [],
            open: false
        }

        this.mealTitleChange = this.mealTitleChange.bind(this);
        this.mealDescChange = this.mealDescChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    setSelectedIngredients(arr) {
        this.setState({
            selectedIngredients: arr
        })
        console.log('selectedIngredients updated: ' + JSON.stringify(this.state.selectedIngredients))
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

    handleSubmit(event) {
        insertMeal({
            meal_title: this.state.meal_title,
            meal_desc: this.state.meal_desc
        }).then((res) => {
            this.setState({
                meal_title: '',
                meal_desc: ''
            });
        })
        event.preventDefault();
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
                                    {ingredient.ingredient_title}
                                </ListItem>
                            )
                        })}
                    </List>
                </div>
            )
        } else {
            return <div></div>
        }
    }

    handleClickOpen = () => {
        this.setState({
            open: true
        })
    }

    handleClose = (value) => {
        // This setState function throws an error
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
                        <Typography variant="h5">Add a New Meal</Typography>
                        <Typography variant="p">Add a new meal to add to your shopping lists. A meal consists of all of the ingredients.</Typography>    
                    </div>
                    <Divider/>
                    <div className='form-body'>
                        <form onSubmit={this.handleSubmit} className='form-layout'>
                            <div className='text-input-layout'>
                                Meal Name
                                <Input 
                                    placeholder="Enter the meal's name" 
                                    value={this.state.meal_title} 
                                    onChange={this.mealTitleChange}
                                    className='text-input'/>
                            </div>

                            <div className='text-input-layout'>
                                Description
                                <Input 
                                    placeholder="Enter a short description of the meal"
                                    value={this.state.meal_desc}
                                    onChange={this.mealDescChange}
                                    className='text-input'/>
                            </div>

                            <div className='text-input-layout'>
                                Recipe
                                <Input 
                                    placeholder="Enter the recipe for this meal"
                                    multiline
                                    className='text-input'/>
                            </div>

                            <Divider />

                            <Typography variant="h5">Ingredients</Typography>
                            <Typography variant="p">Select the ingredients for this meal.</Typography>    
                            <div>
                                {this.showSelectedIngredients()}
                                <Button 
                                    variant='text' 
                                    startIcon={<Add />} 
                                    className='add-ingredient-button'
                                    onClick={this.handleClickOpen}>
                                    Add Ingredient
                                </Button>
                                <AddIngredientForm 
                                    selectedValue={this.state.selectedValue}
                                    open={this.getOpen}
                                    onClose={this.handleClose}/>
                            </div>

                            <input className='form-submit' type="submit" value="Submit" />
                        </form>
                    </div>
                </Container>
            </div>
        )
    }
}