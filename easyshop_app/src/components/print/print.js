import React from "react";
import { Box } from "@mui/system";
import './print.css'
import { useSearchParams } from "react-router-dom";
import { getAllMeasures } from '../../http/rest_api';
import { Document, Page, pdfjs } from 'react-pdf';
import { MenuItem, TextField } from "@mui/material";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

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
            measures: []
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
                            if (measure.is_liquid_measure == 1) {
                                return (
                                    <MenuItem
                                        key={measure.measure_id}
                                        value={measure.measure_id}>
                                        {measure.measure_abbr}
                                    </MenuItem>
                                )
                            }
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
                            if (measure.is_liquid_measure == 0) {
                                return (
                                    <MenuItem
                                        key={measure.measure_id}
                                        value={measure.measure_id}>
                                        {measure.measure_abbr}
                                    </MenuItem>
                                )
                            }
                        })
                        :
                        <MenuItem
                            key="-1">
                            Error!
                        </MenuItem>
                    }
                </TextField>
                <Document
                    file={`http://127.0.0.1:8080/easyshop_rep/report?mealListId=${this.props.mealListId}&dlm=${this.state.dlm}&dwm=${this.state.dwm}`}
                    onLoadSuccess={() => console.log("Success Load!")}
                    width={600}>
                    <Page 
                        pageNumber={1} 
                        width={600}
                        className="pdf-display">
                    </Page>
                </Document>
            </Box>
        )
    }
}