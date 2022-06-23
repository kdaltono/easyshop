import React from 'react';
import { insertMeal } from '../../http/rest_api';
import { Typography, Container, Divider, Input } from '@mui/material';
import { AddIngredients } from './addingredients/addingredients';
import './addmeal.css'

export class AddMeal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            meal_title: '',
            meal_desc: '',
        }

        this.mealTitleChange = this.mealTitleChange.bind(this);
        this.mealDescChange = this.mealDescChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
                            <AddIngredients />

                            <input className='form-submit' type="submit" value="Submit" />
                        </form>
                    </div>
                </Container>
            </div>
        )
    }
}