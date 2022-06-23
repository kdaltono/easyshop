import React from 'react';
import { getRestMessage, getMealIngredients } from '../../http/rest_api';

export class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            restMsg: '',
            mealIngredients: [],
        }
    }

    componentDidMount() {
        getRestMessage().then((res) => {
            this.setState({
                restMsg: res.data
            });
        })

        getMealIngredients('1').then((res) => {
            if (!res.error) {
                this.setState({
                    mealIngredients: Array.from(res.data)
                });
            }
        })
    }

    render() {
        return (<div>
            <p>Rest API message: {this.state.restMsg}</p>
            <MealViewer mealIngredients = {this.state.mealIngredients}/>
        </div>)
    }
}

export class MealViewer extends React.Component {
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