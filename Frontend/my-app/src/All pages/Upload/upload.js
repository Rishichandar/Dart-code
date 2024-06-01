import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
export default function Upload() {
    //for file adding
    const [fileName, setFileName] = React.useState('');
    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });
    //to show the filed added
    const handleFileChange = (event) => {
        if (event.target.files.length > 0) {
            setFileName(event.target.files[0].name);
        } else {
            setFileName('');
        }
    };

    
    return (
        <div>
            {/* <span id="Dart-font">Dart</span> */}
            <br></br>
            <Button
                id='upload-btn'
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
            >
                Upload file
                <VisuallyHiddenInput type="file"onChange={handleFileChange}  />
            </Button>
            {fileName && <span id="file-name">{fileName}</span>}
            

        </div>
    )
}