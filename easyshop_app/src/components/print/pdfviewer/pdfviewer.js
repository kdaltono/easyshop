import { getToken } from '../../../services/jwt_service'

import React, { useState } from "react";
import { Box } from "@mui/system";
import { Button } from "@mui/material";
import { Document, Page, pdfjs } from 'react-pdf'
import './pdfviewer.css'
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function PdfViewer(props) {
    const [numPages, setNumPages] = useState(null)
    const [pageNumber, setPageNumber] = useState(1)

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages)
        setPageNumber(pageNumber)
    }

    function nextPage() {
        setPageNumber(pageNumber + 1)
    }

    function previousPage() {
        setPageNumber(pageNumber - 1)
    }

    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            height="80%"
            overflow="hidden">
            <Document
                file={{
                    url: `http://127.0.0.1:8080/easyshop_rep/report?mealListId=${props.mealListId}&dlm=${props.dlm}&dwm=${props.dwm}&dum=${props.dum}`,
                    withCredentials: true,
                    httpHeaders: {
                        'Authorization': getToken()
                    }
                }}
                onLoadSuccess={onDocumentLoadSuccess}>
                    <Page 
                        pageNumber={pageNumber}>
                    </Page>
            </Document>
            <Box
                display="flex"
                flexDirection="row"
                justifyContent="center"
                alignItems="center">
                <Button
                    onClick={() => previousPage()}
                    disabled={pageNumber === 1}>
                    Previous
                </Button>
                {pageNumber} / {numPages}
                <Button
                    onClick={() => nextPage()}
                    disabled={!(pageNumber < numPages)}>
                    Next
                </Button>
            </Box>
        </Box>
    )
}