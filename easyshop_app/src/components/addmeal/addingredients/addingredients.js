import React from 'react';
import { Add } from '@mui/icons-material'
import { Button, Dialog, DialogContent, DialogTitle, Slide, List, ListItem, Drawer } from '@mui/material';
import './addingredients.css'
import { getAllIngredients } from '../../../http/rest_api';

const ingredients = ['Bread', 'Beans', 'Cheese']

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props}/>
})

export class AddIngredients extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            selectedValue: ingredients[0],
            selectedIngredients: []
        }
    }

    handleClickOpen = () => {
        this.setState({
            open: true
        })
    }

    handleClose = (value) => {
        this.setState({
            open: false,
        })
        if (value) this.state.selectedIngredients.push(value);
    }

    getOpen = () => {
        return this.state.open
    }

    removeAtIndex = (i) => {
        this.setState({
            selectedIngredients: this.state.selectedIngredients.filter((_, index) => index !== i)
        })
    }

    showSelectedIngredients() {
        if (this.state.selectedIngredients.length > 0) {
            return (
                <div>
                    <List>  
                        {this.state.selectedIngredients.map((ingredient, index) => {
                            return (
                                <ListItem button onClick={() => this.removeAtIndex(index)} key={ingredient + index}>
                                    {index}: {ingredient}
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

    render() {
        return (
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
        )
    }
}

const ingredientCategories = [
    {ingredient_category_id:1,ingredient_category_name:"Eggs, milk and milk products"},
    {ingredient_category_id:2,ingredient_category_name:"Fats and oils"},
    {ingredient_category_id:3,ingredient_category_name:"Vegetables"},
    {ingredient_category_id:4,ingredient_category_name:"Fruits"},
    {ingredient_category_id:5,ingredient_category_name:"Herbs and spices"},
    {ingredient_category_id:6,ingredient_category_name:"Meat, sausages and fish"},
    {ingredient_category_id:7,ingredient_category_name:"Others"},
    {ingredient_category_id:8,ingredient_category_name:"Pasta, rice and pulses"},
    {ingredient_category_id:9,ingredient_category_name:"Grain, nuts and baking products"}
]

export class AddIngredientForm extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            onClose: this.props.onClose,
            selectedValue: this.props.selectedValue,
            open: this.props.open,
            ingredientCategories: [],
            selectedCategory: '',
            dialogPaper: {
                minHeight: '80vh',
                maxHeight: '80vh'
            },
            ingredients: []
        }
    }

    componentDidMount() {
        this.getIngredients()
    }

    handleClose = () => {
        this.state.onClose()
    }

    handleListItemClick = (value) => {
        this.state.onClose(value)
    }

    setSelectedCategory = (category) => {
        this.setState({
            selectedCategory: category
        })
    }

    getIngredients = () => {
        getAllIngredients().then((res) => {
            if (!res.error) {
                this.setState({
                    ingredients: res.data
                })
            }
        })
    }

    render() {
        return (
            <Dialog
                open={this.state.open()}
                TransitionComponent={Transition}
                keepMounted
                onClose={this.handleClose}
                PaperProps={{
                    sx: {
                        width: '80vw',
                        height: '80vh'
                    }
                }}>
                <DialogTitle>Ingredients</DialogTitle>
                <DialogContent>
                    <div className='dialog-layout'>
                        <List>
                            <ListItem button onClick={() => this.setSelectedCategory('')} key={'all'}>
                                All
                            </ListItem>
                            {ingredientCategories.map((category) => {
                                return (
                                    <ListItem button onClick={() => this.setSelectedCategory(category)} key={category.ingredient_category_id}>
                                        {category.ingredient_category_name}
                                    </ListItem>
                                )
                            })}
                        </List>
                        <List>
                            {
                                this.state.ingredients.length > 0 ?
                                (this.state.ingredients.map((ingredient) => { 
                                    if (this.state.selectedCategory.ingredient_category_name === ingredient.ingredient_category_name || this.state.selectedCategory === '') {
                                        return  (
                                            <ListItem button onClick={() => this.handleListItemClick(ingredient)} key={ingredient.ingredient_id}>
                                                {ingredient.ingredient_title}
                                            </ListItem>
                                        )
                                    }
                                }))
                                : (<ListItem>Test</ListItem>)
                            }
                        </List>
                    </div>
                </DialogContent>
            </Dialog>
        )
    }
}