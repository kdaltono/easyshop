import React from "react";
import { Button, TextField, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { register } from '../../http/rest_api'
import Background from '../../res/background.jpg'
var sha256 = require('js-sha256').sha256

export class Register extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            confirm_password: '',
            first_name: '',
            last_name: '',
            e_username: '',
            e_password: '',
            e_confirm_password: '',
            e_first_name: '',
            e_last_name: ''
        }

        this.usernameChange = this.usernameChange.bind(this)
        this.passwordChange = this.passwordChange.bind(this)
        this.confirmPasswordChange = this.confirmPasswordChange.bind(this)
        this.firstNameChange = this.firstNameChange.bind(this)
        this.lastNameChange = this.lastNameChange.bind(this)
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

    confirmPasswordChange = (event) => {
        this.setState({
            confirm_password: event.target.value
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

    validateDetails = () => {
        let validInput = true
        // Validate username
        if (this.state.username.length === 0 || (this.state.username.length < 10 || this.state.username.length > 30)) {
            console.log("1")
            this.setState({ 
                e_username: 'Username must contain between 10 and 30 characters' 
            })
            validInput = false
        }
        
        // Validate first_name
        if (this.state.first_name.length === 0 || this.state.first_name.length > 30) {
            console.log("2")
            this.setState({ 
                e_first_name: 'First name must contain between 1 and 30 characters' 
            })
            validInput = false
        }

        // Validate last_name
        if (this.state.last_name.length === 0 || this.state.last_name.length > 30) {
            console.log("3")
            this.setState({ 
                e_last_name: 'Last name must contain between 1 and 30 characters' 
            })
            validInput = false
        }

        // Validate passwords
        if (this.state.password !== this.state.confirm_password) {
            console.log("4")
            this.setState({ 
                e_password: 'The password and the confirm password fields should be the same', 
                e_confirm_password: 'The password and the confirm password fields should be the same' 
            })
            validInput = false
        } 
        if (this.state.password.length === 0) {
            console.log("5")
            this.setState({ 
                e_password: 'The password field should not be empty' 
            })
            validInput = false
        } 
        if (this.state.confirm_password.length === 0) {
            console.log("6")
            this.setState({ 
                e_confirm_password: 'The confirm password field should not be empty' 
            })
            validInput = false
        }

        console.log("Username error: " + this.state.e_username)
        console.log("First name error: " + this.state.e_first_name)
        console.log("Last name error: " + this.state.e_last_name)
        console.log("Password error: " + this.state.e_password)
        console.log("Confirm password error: " + this.state.e_confirm_password)

        return validInput;
    }

    submit = (event) => {
        if (this.validateDetails()) {
            register(this.state.username, this.state.first_name, this.state.last_name, sha256(this.state.password).toUpperCase()).then((res) => {
                console.log("Register response: " + JSON.stringify(res))
                // redirect to login or let the user know the new account has been created
            })
        } else {
            console.log("Invalid details...")
        }
    }

    render() {
        return (
            <Box
                sx={{
                    width: "100%",
                    height: "calc(100vh - 48px)",
                    overflow: "hidden",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "blue",
                    backgroundImage: `url(${Background})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundSize: 'cover'
                }}>
                <Box
                    sx={{
                        padding: "10px",
                        width: "500px",
                        height: "700px",
                        borderRadius: "10px",
                        backgroundColor: 'white'
                    }}>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            paddingTop: "20px",
                            height: "100%"
                        }}>
                        
                        <Typography
                            variant="h3"
                            align="center"
                            sx={{
                                marginBottom: "30px",
                                fontWeight: 'bold'
                            }}>
                            Register
                        </Typography>

                        <TextField
                            value={this.state.username}
                            onChange={this.usernameChange}
                            variant="standard"
                            label="Username"
                            helperText={this.state.e_username}
                            sx={{
                                marginTop: "10px",
                                minHeight: '4.5rem'
                            }}
                            FormHelperTextProps={{
                                error: this.state.e_username !== '' ? true : false,
                            }}>
                        </TextField>

                        <TextField
                            value={this.state.first_name}
                            onChange={this.firstNameChange}
                            variant="standard"
                            label="First name"
                            helperText={this.state.e_first_name}
                            sx={{
                                marginTop: "10px",
                                minHeight: '4.5rem'
                            }}
                            FormHelperTextProps={{
                                error: this.state.e_first_name !== '' ? true : false,
                            }}>
                        </TextField>

                        <TextField
                            value={this.state.last_name}
                            onChange={this.lastNameChange}
                            variant="standard"
                            label="Last name"
                            helperText={this.state.e_last_name}
                            sx={{
                                marginTop: "10px",
                                minHeight: '4.5rem'
                            }}
                            FormHelperTextProps={{
                                error: this.state.e_last_name !== '' ? true : false,
                            }}>
                        </TextField>

                        <TextField
                            value={this.state.password}
                            onChange={this.passwordChange}
                            variant="standard"
                            type="password"
                            label="Password"
                            helperText={this.state.e_password}
                            sx={{
                                marginTop: "10px",
                                minHeight: '4.5rem'
                            }}
                            FormHelperTextProps={{
                                error: this.state.e_password !== '' ? true : false,
                            }}>
                        </TextField>

                        <TextField
                            value={this.state.confirm_password}
                            onChange={this.confirmPasswordChange}
                            variant="standard"
                            type="password"
                            label="Confirm Password"
                            helperText={this.state.e_confirm_password}
                            sx={{
                                marginTop: "10px",
                                minHeight: '4.5rem'
                            }}
                            FormHelperTextProps={{
                                error: this.state.e_confirm_password !== '' ? true : false,
                            }}>
                        </TextField>
                        
                        <Box
                            sx={{
                                marginBottom: "20px",
                                marginTop: "auto",
                                width: "100%"
                            }}>
                            <Button
                                onClick={this.submit}
                                variant="contained"
                                sx={{
                                    width: "100%",
                                    marginBottom: "10px"
                                }}>
                                Register
                            </Button>
                            
                            <Button
                                href="/login"
                                variant="outlined"
                                sx={{
                                    width: "100%"
                                }}>
                                Already have an account? Sign in here
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        )
    }
}