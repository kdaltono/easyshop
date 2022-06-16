import React from 'react';
import { insertMeal } from '../../http/rest_api';

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
            <form onSubmit={this.handleSubmit}>
                <label>
                    Meal Title
                    <input type="text" value={this.state.meal_title} onChange={this.mealTitleChange} />
                </label>
                <label>
                    Meal Description
                    <input type="text" value={this.state.meal_desc} onChange={this.mealDescChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        )
    }
}