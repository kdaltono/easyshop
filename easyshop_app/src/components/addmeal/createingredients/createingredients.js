import { Dialog, DialogContent, DialogTitle, Button, Typography, TextField, MenuItem, FormControlLabel, Checkbox } from '@mui/material';
import './createingredients.css'
import { insertNewIngredient } from "../../../http/rest_api";
import React from "react";

export class CreateIngredientsForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            open: this.props.open,
            ingredientTitle: '',
            ingredientDescription: '',
            ingredientCategory: '',
            measuredAsLiquid: false
        }

        this.ingredientTitleChange = this.ingredientTitleChange.bind(this)
        this.ingredientDescriptionChange = this.ingredientDescriptionChange.bind(this)
        this.ingredientCategoryChange = this.ingredientCategoryChange.bind(this)
        this.measuredAsLiquidChange = this.measuredAsLiquidChange.bind(this)
    }

    ingredientTitleChange = (event) => {
        this.setState({
             ingredientTitle: event.target.value
        })
    }

    ingredientDescriptionChange = (event) => {
        this.setState({
            ingredientDescription: event.target.value
        })
    }

    ingredientCategoryChange = (event) => {
        this.setState({
            ingredientCategory: event.target.value
        })
    }

    measuredAsLiquidChange = (event) => {
        this.setState({
            measuredAsLiquid: event.target.checked
        })
    }

    clearValues() {
        this.setState({
            ingredientTitle: '',
            ingredientDescription: '',
            ingredientCategory: '',
            measuredAsLiquid: false
        })
    }

    handleClose = () => {
        this.clearValues();
        this.props.onClose();
    }

    handleSubmit = () => {
        // TODO: Validate data!

        const ingredientData = {
            ingredient_title: this.state.ingredientTitle,
            ingredient_desc: this.state.ingredientDescription,
            ingredient_category_id: this.state.ingredientCategory,
            is_measured_as_liquid: this.state.measuredAsLiquid
        }

        insertNewIngredient(ingredientData).then((res) => {
            console.log("Ingredient added successfully: " + res.data.insertId)
            const newIngredient = {
                ingredient_category_id: ingredientData.ingredient_category_id,
                ingredient_title: ingredientData.ingredient_title,
                ingredient_id: res.data.insertId,
                is_measured_as_liquid: ingredientData.is_measured_as_liquid ? 1 : 0
            }
            this.clearValues()
            this.props.onClose(newIngredient);
        })
    }

    render() {
        return (
            <Dialog
                open={this.state.open()}
                keepMounted
                onClose={this.handleClose}
                PaperProps={{
                    sx: {
                        width: '40vw',
                        height: '60vh'
                    }
                }}>
                <DialogTitle>Add New Ingredient</DialogTitle>
                <DialogContent
                    sx={{
                        height: '100%'
                    }}>
                    <div className='form-layout'>
                        <div className='input-section'>
                            <Typography
                                variant="p"
                                sx={{
                                    fontWeight: 'bold'
                                }}>
                                Ingredient Title
                            </Typography>
                            <TextField
                                value={this.state.ingredientTitle}
                                onChange={this.ingredientTitleChange}
                                variant='standard'>
                            </TextField>
                        </div>

                        <div className='input-section'>
                            <Typography
                                variant='p'
                                sx={{
                                    fontWeight: 'bold'
                                }}>
                                Ingredient Description
                            </Typography>
                            <TextField
                                value={this.state.ingredientDescription}
                                onChange={this.ingredientDescriptionChange}
                                variant='standard'>
                            </TextField>
                        </div>

                        <div className='input-section'>
                            <Typography
                                variant='p'
                                sx={{
                                    marginBottom: '10px',
                                    fontWeight: 'bold'
                                }}>
                                Ingredient Category
                            </Typography>
                            <TextField
                                label="Category"
                                select
                                onChange={this.ingredientCategoryChange}
                                value={this.state.ingredientCategory}>
                                {
                                    this.props.ingredientCategoryData.map((ingredientCategory) => {
                                        return (
                                            <MenuItem 
                                                key={ingredientCategory.ingredient_category_id} 
                                                value={ingredientCategory.ingredient_category_id}>
                                                {ingredientCategory.ingredient_category_name}
                                            </MenuItem>
                                        )
                                    })                                
                                }
                            </TextField>
                        </div>

                        <div className='input-section'>
                            <FormControlLabel 
                                control={<Checkbox />} 
                                label="Measure Ingredient as Liquid" 
                                value={this.state.measuredAsLiquid}
                                onChange={this.measuredAsLiquidChange}/>
                        </div>

                        <div className='button-container'>
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
                                onClick={() => this.handleClose()}
                                sx={{
                                    marginTop: '20px'
                                }}>
                                Close
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        )
    }
}