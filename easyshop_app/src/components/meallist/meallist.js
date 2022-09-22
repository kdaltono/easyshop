import { Card, Typography, CardContent, CardActionArea } from "@mui/material";
import { Link } from 'react-router-dom'
import { Container, Box } from "@mui/system";
import { getAllActiveMealLists } from "../../http/rest_api";
import { getFormattedDate } from "../../utils/dateformatting";
import React from "react";

export class MealList extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            activeMealLists: []
        }
    }

    componentDidMount() {
        getAllActiveMealLists().then((res) => {
            if (!res.error) {
                this.setState({
                    activeMealLists: Array.from(res.data)
                })
            }
        })
    }

    render() {
        // Need to create a way to add meals to a Meal List (Shopping List)
        // and display them all here
        return (
            <Container
                maxWidth='md'>
                <Box
                    sx={{
                        marginTop: '30px'
                    }}>
                    <Typography
                        variant="h4">
                        Shopping Lists
                    </Typography>

                    <Box
                        marginTop='30px'>
                        {(this.state.activeMealLists.length > 0 ? 
                            <div>
                                {
                                this.state.activeMealLists.map((activeMealList) => {
                                    return (
                                        <MealListElement 
                                            meal_list={activeMealList}
                                            key={activeMealList.meal_list_id}/>
                                    )
                                })
                                }
                            </div>
                            :
                            <div>No Active Meals!</div>)
                        }
                    </Box>
                    <Box
                        component={Link}
                        to={`/addlist`}>
                        Add Shopping List
                    </Box>
                </Box>
            </Container>
        )
    }
}

export function MealListElement(props) {
    return (
        <Card>
            <CardActionArea
                component={Link} 
                to={`/list?meallistid=${props.meal_list.meal_list_id}`}
                underline="none"
                color="inherit">
                <CardContent>
                    <Typography variant='h6'>
                        {props.meal_list.meal_list_name}
                    </Typography>
                    <Typography variant='p'>
                        Creation Date: {getFormattedDate(props.meal_list.creation_dstamp)}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}