import React from "react"
import { Button, TextField } from "@mui/material"
import { Box } from "@mui/system"
import { login } from '../../http/rest_api'
import { setToken } from '../../services/jwt_service'
var sha256 = require('js-sha256').sha256

export class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: ''
        }

        this.usernameChange = this.usernameChange.bind(this)
        this.passwordChange = this.passwordChange.bind(this)
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

    submit = (event) => {
        login(this.state.username, sha256(this.state.password).toUpperCase()).then((res) => {
            setToken(res.data.token)
            console.log('Login response: ' + JSON.stringify(res))
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
                    value={this.state.password}
                    onChange={this.passwordChange}>

                </TextField>
                <Button 
                    onClick={this.submit}>
                    Login
                </Button>
            </Box>
        )
    }
}