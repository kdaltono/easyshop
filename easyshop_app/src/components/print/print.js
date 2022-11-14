import React from "react";
import { Box } from "@mui/system";
import './print.css'
import { useSearchParams } from "react-router-dom";
import { getAllMeasures, getDefaultUnitMeasureId } from '../../http/rest_api';
import { MenuItem, TextField, Button } from "@mui/material";
import PdfViewer from './pdfviewer/pdfviewer'

export function PrintListMain() {
    let [searchParams, _] = useSearchParams()
    const mealListId = searchParams.get("meallistid")

    return (
        <div>
            <PrintList
                mealListId={mealListId}/>
        </div>
    )
}

export class PrintList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            dlm: 1,
            dwm: 3,
            dum: -1,
            measures: [],
            numberOfPages: 0,
            pageNumber: 1
        }
    }

    componentDidMount() {
        getAllMeasures().then((res) => {
            if (!res.error) {
                this.setState({
                    measures: res.data
                })
            }
        })

        getDefaultUnitMeasureId().then((res) => {
            if (!res.error) {
                this.setState({
                    dum: res.data.measure_id
                })
            }
        })
    }

    handleLiquidMeasure = (event) => {
        this.setState({
            dlm: event.target.value
        })
    }

    handleWeightMeasure = (event) => {
        this.setState({
            dwm: event.target.value
        })
    }

    render() {
        return (
            <Box>
                <TextField
                    select
                    label="Liquid Measure"
                    value={this.state.dlm}
                    onChange={this.handleLiquidMeasure}>
                    {
                        this.state.measures.length > 0 ?
                        this.state.measures.map((measure) => {
                            if (measure.measure_type_id === 'L') {
                                return (
                                    <MenuItem
                                        key={measure.measure_id}
                                        value={measure.measure_id}>
                                        {measure.measure_abbr}
                                    </MenuItem>
                                )
                            } else return;
                        })
                        :
                        <MenuItem
                            key="-1">
                            Error!
                        </MenuItem>
                    }
                </TextField>
                <TextField
                    select
                    label="Weight Measure"
                    value={this.state.dwm}
                    onChange={this.handleWeightMeasure}>
                    {
                        this.state.measures.length > 0 ?
                        this.state.measures.map((measure) => {
                            if (measure.measure_type_id === 'M') {
                                return (
                                    <MenuItem
                                        key={measure.measure_id}
                                        value={measure.measure_id}>
                                        {measure.measure_abbr}
                                    </MenuItem>
                                )
                            } else return;
                        })
                        :
                        <MenuItem
                            key="-1">
                            Error!
                        </MenuItem>
                    }
                </TextField>
                <Button href={`http://127.0.0.1:8080/easyshop_rep/report?mealListId=${this.props.mealListId}&dlm=${this.state.dlm}&dwm=${this.state.dwm}&dum=${this.state.dum}`}>
                    Download!
                </Button>
                <PdfViewer 
                    mealListId={this.props.mealListId}
                    dlm={this.state.dlm}
                    dwm={this.state.dwm}
                    dum={this.state.dum}/>
            </Box>
        )
    }
}