import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { getRestMessage, getMealIngredients, insertMeal } from './http/rest_api';
  
class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            restMsg: '',
            mealIngredients: '',
        }
    }

    componentDidMount() {
        getRestMessage().then((res) => {
            this.setState({
                restMsg: res.data
            });
        })

        getMealIngredients('1').then((res) => {
            this.setState({
                mealIngredients: res.data
            })
        })
    }

    render() {
        return (<div>
            <p>Hello World!</p>
            <p>Rest API message: {this.state.restMsg}</p>
            <Meal mealIngredients = {this.state.mealIngredients}/>
            <AddMeal/>
        </div>)
    }
}

class Meal extends React.Component {
    render() {
        if (this.props.mealIngredients.length > 0) {
            return (
                <div>
                    {
                        <p>{this.props.mealIngredients[0].meal_title}</p>
                    }
                    {
                        this.props.mealIngredients.map((val, index) => {
                            return <p key={index}>{index + 1}: {val.ingredient_qty} x {val.ingredient_title}</p>
                        })
                    }
                </div>
            )    
        } else {
            return <div></div>
        }
    }
}

class AddMeal extends React.Component {
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

// ========================================
  
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Home />);
  