import React from 'react';
import { getRestMessage } from '../../http/rest_api';

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
    }

    render() {
        return (<div>
            <p>Rest API message: {this.state.restMsg}</p>
        </div>)
    }
}