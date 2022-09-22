import React from "react";
import './print.css'
import { useSearchParams } from "react-router-dom";
import { getPdfBytes } from '../../http/pdf';
import { Document, Page, pdfjs } from 'react-pdf';
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
            pdfData: []
        }
    }

    componentDidMount() {
        getPdfBytes(this.props.mealListId).then(res => {
            if (res.status !== 200) {
                this.setState({
                    pdfData: null
                })
                console.log("Error retrieving PDF Data!")
                console.log(JSON.stringify(res))
            } else {
                var len = res.data.length;
                var bytes = new Uint8Array(len);
                for (var i = 0; i < len; i++) {
                    bytes[i] = res.data.charCodeAt(i);
                }

                this.setState({
                    pdfData: bytes.buffer
                })
            }
        })
    }

    render() {
        // TODO: Enable CORS on the Java Servlet!
        const tst = 2

        if (tst === 1) {
            return (
                <Document
                    file = {this.state.pdfData}
                    onLoadSuccess={() => console.log("Success Load!")}>
                    <Page pageNumber={1} width={600} />
                </Document>
            )
        } else {
            return (
                <Document
                    file={`http://127.0.0.1:8080/easyshop_rep/report?mealListId=${this.props.mealListId}`}
                    onLoadSuccess={() => console.log("Success Load!")}
                    width={600}>
                    <Page 
                        pageNumber={1} 
                        width={600}
                        className="pdf-display">
                    </Page>
                </Document>
            )
        }
    }
}