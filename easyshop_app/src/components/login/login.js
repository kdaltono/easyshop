import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { setKey, setLoggedIn } from "../../features/user/userSlice"
import { Button, TextField, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { login } from '../../http/rest_api'
import { setToken } from '../../services/jwt_service'
import history from '../../utils/history'
import Background from '../../res/background.jpg'
var sha256 = require('js-sha256').sha256

/*function LoginBase(Component) {
    return function WrappedComponent(props) {
        const apiKey = () => { return useSelector((state) => state.user.apiKey) }
        const setKey = (value) => { useDispatch(setKey(value)) }

        <Login 
            apiKey={apiKey}
            setKey={setKey}/>
    }
}*/

export function LoginBase() {
    const key = useSelector((state) => state.user.apiKey)
    const dispatch = useDispatch()
    const setApiKey = (value) => { dispatch(setKey(value)) }

    return (
        <Login 
            apiKey={key}
            setKey={setApiKey}
            setLoggedIn={() => dispatch(setLoggedIn())}/>
    )
}

export class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            loginErrorMessage: false
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

            // THIS DOESN'T SEEM TO WORK. this.props.setKey is not a function
            console.log("React Redux API Key: " + this.props.apiKey)
            this.props.setKey(res.data.token)
            this.props.setLoggedIn()

            setToken(res.data.token)
            if (res.status === 401) {
                this.setState({
                    loginErrorMessage: true
                })
            } else if (res.status === 200) {
                // User successfully logged in. Send to homepage
                history.push('/')
            }
        })
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
                        height: "500px",
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
                            Login
                        </Typography>

                        <TextField
                            value={this.state.username}
                            onChange={this.usernameChange}
                            variant="standard"
                            label="Username"
                            sx={{
                                marginTop: "10px"
                            }}>
                        </TextField>

                        <TextField
                            value={this.state.password}
                            onChange={this.passwordChange}
                            variant="standard"
                            label="Password"
                            type="password"
                            sx={{
                                marginTop: "10px"
                            }}>
                        </TextField>

                        <Typography
                            sx={{
                                marginTop: "20px",
                                color: "red"
                            }}
                            hidden={!this.state.loginErrorMessage}>
                            The username or password you entered is incorrect.
                        </Typography>

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
                                Login
                            </Button>

                            <Button
                                variant="outlined"
                                href="/register"
                                sx={{
                                    width: "100%"
                                }}>
                                Don't have an account? Register here
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        )
    }
}