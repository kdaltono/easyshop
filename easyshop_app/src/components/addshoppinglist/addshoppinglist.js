import React from "react";
import { Input } from '@mui/material'
import { insertNewMealList } from "../../http/rest_api";

export class AddShoppingList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            meal_list_name: ''
        }

        this.mealListNameChange = this.mealListNameChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    mealListNameChange(event) {
        this.setState({
            meal_list_name: event.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        insertNewMealList(this.state.meal_list_name).then((res) => {
            console.log("Meal List added successfully")
        })
    }

    render() {
        return (
            <div>
                <h1>Add Shopping List</h1>
                <form onSubmit={this.handleSubmit}>
                    <p>Shopping List Name</p>
                    <Input
                        placeholder="Enter the Shopping List name"
                        value={this.state.meal_list_name}
                        onChange={this.mealListNameChange}
                        />
                    
                    <input type="submit" value="Submit"/>
                </form>
            </div>
        )
    }
}