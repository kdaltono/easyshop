import React from "react";
import { Button, TextField } from "@mui/material"
import { Box } from "@mui/system"
import { register } from '../../http/rest_api'
import { setToken } from "../../services/jwt_service";
var sha256 = require('js-sha256').sha256

export class Register extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            first_name: '',
            last_name: ''
        }


    }

    usernameChange = (event) => {
        this.setState({
            username: event.target.value
        })
    }

    passwordChange = (event) => {
        this.setState({
            password: event.target.value
        })
    }

    firstNameChange = (event) => {
        this.setState({
            first_name: event.target.value
        })
    }

    lastNameChange = (event) => {
        this.setState({
            last_name: event.target.value
        })
    }

    submit = (event) => {
        register(this.state.username, this.state.first_name, this.state.last_name, sha256(this.state.password).toUpperCase()).then((res) => {
            console.log("Register response: " + JSON.stringify(res))
            // redirect to login or let the user know the new account has been created
        })
    }

    render() {
        return (
            <Box>
                <TextField
                    value={this.state.username}
                    onChange={this.usernameChange}>
                </TextField>
                <TextField
                    value={this.state.first_name}
                    onChange={this.firstNameChange}>
                </TextField>
                <TextField
                    value={this.state.last_name}
                    onChange={this.lastNameChange}>
                </TextField>
                <TextField
                    value={this.state.password}
                    onChange={this.passwordChange}>
                </TextField>

                <Button
                    onClick={this.submit}>
                    Register
                </Button>
            </Box>
        )
    }
}