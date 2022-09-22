import React from 'react';
import { Dialog, DialogContent, DialogTitle, Slide, List, ListItem, Divider, Typography, TextField, Button } from '@mui/material';
import './addingredients.css'
import '../../../index.css'
import { getAllIngredients } from '../../../http/rest_api';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props}/>
})

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
            selectedValue: this.props.selectedValue,
            open: this.props.open,
            ingredientCategories: [],
            selectedCategory: '',
            ingredients: [],
            selectedIngredient: [],
            ingredient_qty: 0
        }

        this.ingredientQtyChange = this.ingredientQtyChange.bind(this)
    }

    componentDidMount() {
        this.getIngredients()
    }

    handleClose = () => {
        this.props.onClose()
    }

    handleListItemClick = (value) => {
        this.props.onClose(value)
    }

    handleSubmit = () => {
        this.setState({
            selectedIngredient: '',
            selectedCategory: '',
            ingredient_qty: 0
        })
        this.props.onClose({...this.state.selectedIngredient, ingredient_qty: this.state.ingredient_qty})
    }

    setSelectedIngredient = (ingredient) => {
        this.setState({
            selectedIngredient: ingredient
        })
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

    ingredientQtyChange = (event) => {
        this.setState({
            ingredient_qty: event.target.value
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
                        <div className='category-list'>
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
                        </div>

                        <Divider orientation='vertical' flexItem/>

                        <div className='ingredient-list'>
                            <List>
                                {
                                    this.state.ingredients.length > 0 ?
                                    (this.state.ingredients.map((ingredient) => { 
                                        if (this.state.selectedCategory.ingredient_category_id === ingredient.ingredient_category_id || this.state.selectedCategory === '') {
                                            return  (
                                                <ListItem button onClick={() => this.setSelectedIngredient(ingredient)} key={ingredient.ingredient_id}>
                                                    {ingredient.ingredient_title}
                                                </ListItem>
                                            )
                                        } else {
                                            return <div></div>
                                        }
                                    }))
                                    : (<ListItem key="-1">Test</ListItem>)
                                }
                            </List>
                        </div>
                    </div>
                    <div className='form-input'>
                        <Typography 
                            variant="p"
                            width={'50%'}>
                            {this.state.selectedIngredient.ingredient_title}
                        </Typography>
                        <div className='qty-input-section'>
                            <Typography
                                variant='p'>
                                Quantity:
                            </Typography>
                            <TextField
                                value={this.state.ingredient_qty}
                                onChange={this.ingredientQtyChange}
                                variant='standard'
                                className='qty-input'>
                            </TextField>
                            <Button
                                variant='contained'
                                onClick={() => this.handleSubmit()}>
                                Add
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        )
    }
}