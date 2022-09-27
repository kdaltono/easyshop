import React from 'react';
import { Dialog, DialogContent, DialogTitle, Slide, List, ListItem, Divider, Box, TextField, Button, DialogActions, MenuItem } from '@mui/material';
import { CreateIngredientsForm } from '../createingredients/createingredients';
import './addingredients.css'
import '../../../index.css'
import { getAllIngredients, getAllIngredientCategories, getAllMeasures } from '../../../http/rest_api';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props}/>
})

export class AddIngredientForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedValue: this.props.selectedValue,
            open: this.props.open,
            ingredientCategories: [],
            selectedCategory: '',
            ingredients: [],
            selectedIngredient: {
                ingredient_title: '',
                is_measured_as_liquid: ''
            },
            ingredient_qty: 0,
            addIngredientOpen: false,
            measures: [],
            selectedMeasure: ''
        }

        this.ingredientQtyChange = this.ingredientQtyChange.bind(this)
        this.measureChange = this.measureChange.bind(this)
    }

    componentDidMount() {
        this.getIngredients()
        this.getMeasurements()
    }

    getMeasurements() {
        getAllMeasures().then((res) => {
            if (!res.error) {
                this.setState({
                    measures: res.data
                })
            }
        })
    }

    handleClose = () => {
        this.setState({
            selectedIngredient: {
                ingredient_title: '',
                is_measured_as_liquid: ''
            },
            selectedCategory: '',
            ingredient_qty: 0
        })
        this.props.onClose()
    }

    handleListItemClick = (value) => {
        this.props.onClose(value)
    }

    validateData() {
        var isValid = true
        if (Object.keys(this.state.selectedIngredient).length === 0) {
            isValid = false
        }
        if (!this.state.ingredient_qty) {
            isValid = false
        }

        return isValid
    }

    handleSubmit = () => {
        if (this.validateData()) {
            this.props.onClose({
                ...this.state.selectedIngredient, 
                ingredient_qty: this.state.ingredient_qty, 
                measure_id: this.state.selectedMeasure, 
                measure_abbr: this.state.measures.map((measure) => { if (measure.measure_id === this.state.selectedMeasure) return measure.measure_abbr })
            })
        } else {
            // Handle data validation (forgot to select ingredient/qty/etc)
            this.props.onClose()
        }

        this.setState({
            selectedCategory: '',
            ingredient_qty: 0,
            selectedIngredient: {
                ingredient_title: '',
                is_measured_as_liquid: ''
            }
        })
    }

    setSelectedIngredient = (ingredient) => {
        this.setState({
            selectedIngredient: ingredient,
            selectedMeasure: '',
            ingredient_qty: 0
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
        getAllIngredientCategories().then((res) => {
            if (!res.error) {
                this.setState({
                    ingredientCategories: res.data
                })
            }
        })
    }

    ingredientQtyChange = (event) => {
        this.setState({
            ingredient_qty: event.target.value
        })
    }

    measureChange = (event) => {
        this.setState({
            selectedMeasure: event.target.value
        })
    }

    handleAddIngredientClickOpen = () => {
        this.setState({
            addIngredientOpen: true
        })
    }

    handleAddIngredientClose = (value) => {
        this.setState({
            addIngredientOpen: false
        })
        if (value) {
            this.state.ingredients.push(value)
        }
    }

    getAddIngredientOpen = () => {
        return this.state.addIngredientOpen
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
                <DialogContent
                    className='dialog-content'>
                    <div className='dialog-layout'>
                        <div className='category-list'>
                            <List>
                                <ListItem button onClick={() => this.setSelectedCategory('')} key={'all'}>
                                    All
                                </ListItem>
                                {
                                    this.state.ingredientCategories.length > 0 ?
                                    (this.state.ingredientCategories.map((category) => {
                                        return (
                                            <ListItem button onClick={() => this.setSelectedCategory(category)} key={category.ingredient_category_id}>
                                                {category.ingredient_category_name}
                                            </ListItem>
                                        )
                                    }))
                                    : (<ListItem key="-1">Test</ListItem>)
                                }
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
                                        }
                                    }))
                                    : (<ListItem key="-1">Test</ListItem>)
                                }
                            </List>
                        </div>
                    </div>
                    <DialogActions
                        sx={{
                            paddingTop: "40px",
                            display: 'flex',
                            flexDirection: 'column'
                        }}>
                        <Box
                            sx={{
                                width: '100%',
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between'
                            }}>
                            <TextField
                                value={this.state.selectedIngredient.ingredient_title}
                                InputProps={{
                                    readOnly: true
                                }}
                                variant="filled"
                                size="small"
                                sx={{
                                    width: '50%',
                                    marginRight: '20px'
                                }}>
                            </TextField>
                            <TextField
                                value={this.state.ingredient_qty}
                                onChange={this.ingredientQtyChange}
                                variant="filled"
                                size="small"
                                className='qty-input'
                                type="number">
                            </TextField>
                            <TextField
                                label='Measurement'
                                variant="filled"
                                size="small"
                                select
                                sx={{
                                    width: '30%',
                                    marginLeft: '20px'
                                }}
                                value={this.state.selectedMeasure}
                                onChange={this.measureChange}>
                                {
                                    this.state.measures.length > 0 && this.state.selectedIngredient.is_measured_as_liquid !== '' ?
                                        this.state.measures.map((measure) => {
                                            if (this.state.selectedIngredient.is_measured_as_liquid === measure.is_liquid_measure) {
                                                return (
                                                    <MenuItem
                                                        key={measure.measure_id}
                                                        value={measure.measure_id}>
                                                        {`${measure.measure_name} (${measure.measure_abbr})`}
                                                    </MenuItem>
                                                )       
                                            }
                                        })
                                    : 
                                        <MenuItem
                                            key="-1">
                                                Select an Ingredient!
                                        </MenuItem>
                                }
                            </TextField>
                        </Box>
                    </DialogActions>
                    
                    <CreateIngredientsForm 
                        open={() => this.getAddIngredientOpen()}
                        onClose={this.handleAddIngredientClose}
                        ingredientCategoryData={this.state.ingredientCategories}/>

                    <Box
                        sx={{
                            marginTop: "auto",
                            display: 'flex',
                            flexDirection: 'column'
                        }}>
                        <Button
                            variant='contained'
                            onClick={() => this.handleSubmit()}
                            sx={{
                                marginTop: '20px'  
                            }}>
                            Add
                        </Button>
                        <Button
                            variant='outlined'
                            onClick={() => this.handleAddIngredientClickOpen()}
                            sx={{
                                marginTop: '20px'  
                            }}>
                            Can't find what you're looking for?
                        </Button>
                    </Box>
                </DialogContent>
            </Dialog>
        )
    }
}