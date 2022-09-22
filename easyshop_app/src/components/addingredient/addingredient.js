import React from "react";
import { Input, Select, MenuItem } from '@mui/material'
import { insertNewIngredient, getAllIngredientCategories } from "../../http/rest_api";

export class AddIngredients extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ingredient_title: '',
            ingredient_desc: '',
            ingredient_category_id: '',
            lastInsertId: '',
            ingredientCategoryData: []
        }

        this.ingredientTitleChange = this.ingredientTitleChange.bind(this);
        this.ingredientDescriptionChange = this.ingredientDescriptionChange.bind(this);
        this.ingredientCategoryIdChange = this.ingredientCategoryIdChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        getAllIngredientCategories().then((res) => {
            if (!res.error) {
                this.setState({
                    ingredientCategoryData: res.data
                })
            }
        })
    }

    ingredientTitleChange(event) {
        this.setState({
            ingredient_title: event.target.value
        })
    }

    ingredientDescriptionChange(event) {
        this.setState({
            ingredient_desc: event.target.value
        })
    }

    ingredientCategoryIdChange(event) {
        this.setState({
            ingredient_category_id: event.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        const ingredientData = {
            ingredient_title: this.state.ingredient_title,
            ingredient_desc: this.state.ingredient_desc,
            ingredient_category_id: this.state.ingredient_category_id
        }

        insertNewIngredient(ingredientData).then((res) => {
            console.log("Ingredient added successfully: " + res.data.insertId)
        })
    }

    render() {
        return (
            <div>
                <h1>Add Ingredients</h1>
                <div>
                    <form onSubmit={this.handleSubmit}> 
                        <p>Ingredient Title</p>
                        <Input
                            placeholder="Enter the ingredient's name"
                            value={this.state.ingredient_title}
                            onChange={this.ingredientTitleChange}/>
                        
                        <p>Ingredient Description</p>
                        <Input
                            placeholder="Enter a short description of the ingredient"
                            value={this.state.ingredient_desc}
                            onChange={this.ingredientDescriptionChange}/>
                        
                        <p>Ingredient Category ID</p>
                        <Select
                            label="Category"
                            onChange={this.ingredientCategoryIdChange}
                            value={this.state.ingredient_category_id}>
                            {
                                this.state.ingredientCategoryData.map((ingredientCategory) => {
                                    return (
                                        <MenuItem 
                                            key={ingredientCategory.ingredient_category_id} 
                                            value={ingredientCategory.ingredient_category_id}>
                                            {ingredientCategory.ingredient_category_name}
                                        </MenuItem>
                                    )
                                })                                
                            }
                        </Select>

                        <input type="submit" value="Submit"/>
                    </form>
                </div>
            </div>
        )
    }
}