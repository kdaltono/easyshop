import { Typography, Grid } from "@mui/material";
import { Container, Box } from "@mui/system";
import { getMealListDataFromId } from '../../../http/rest_api';
import { MealItem } from "../../meal/mealitem";
import { getFormattedDate } from "../../../utils/dateformatting";
import React from "react";
import { useSearchParams } from "react-router-dom";

export function MealListViewerMain() {
    let [searchParams, _] = useSearchParams();
    const mealListId = searchParams.get("meallistid")

    return (
        <div>   
            <MealListViewer 
                mealListId={mealListId}/>
        </div>
    )
}

export class MealListViewer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            mealListData: [],
            mealListMeals: []
        }
    }

    componentDidMount() {
        getMealListDataFromId(this.props.mealListId).then((res) => {
            if (!res.error) {
                this.setState({
                    mealListData: res.data.meal_list_data,
                    mealListMeals: Array.from(res.data.meal_list_meals)
                })
            }
        })
    }

    render() {
        return (
            <Container
                maxWidth='md'>
                <Box
                    sx={{
                        marginTop: '30px'
                    }}>
                    <Box
                        sx={{
                            marginBottom: '30px'
                        }}>
                        <Typography
                            variant='h4'>
                            {this.state.mealListData.meal_list_name}
                        </Typography>
                        <Typography
                            variant='p'>
                            Creation Date: {getFormattedDate(this.state.mealListData.creation_dstamp)}
                        </Typography>
                    </Box>

                    <Typography
                        variant='h6'>
                        Contents of Shopping List
                    </Typography>

                    <Container>
                        <Grid
                            container 
                            spacing={"10px"}
                            justifyContent="flex-start"
                            alignItems="flex-start">
                            {this.state.mealListMeals.length > 0 ?
                                this.state.mealListMeals.map((meal) => {
                                    return (
                                        <Grid item key={meal.meal_id}>
                                            <MealItem 
                                                meal_title={meal.meal_title}
                                                meal_desc={meal.meal_desc}
                                                meal_id={meal.meal_id}/>
                                        </Grid>
                                    )
                                })
                                :
                                <div>No meals added to this Shopping List yet!</div>
                            }
                        </Grid>
                    </Container>
                </Box>
            </Container>
        )
    }
}