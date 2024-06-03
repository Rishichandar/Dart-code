

// import React, { useState, useEffect } from 'react';
// import { styled } from '@mui/material/styles';
// import Button from '@mui/material/Button';
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';

// export default function Upload() {
//     const [fileName, setFileName] = useState('');
//     const [fileContent, setFileContent] = useState('');
//     const [uploadStatus, setUploadStatus] = useState(null); // State to hold upload status
//     const [processedData, setProcessedData] = useState(null);
  

//     const VisuallyHiddenInput = styled('input')({
//         clip: 'rect(0 0 0 0)',
//         clipPath: 'inset(50%)',
//         height: 1,
//         overflow: 'hidden',
//         position: 'absolute',
//         bottom: 0,
//         left: 0,
//         whiteSpace: 'nowrap',
//         width: 1,
//     });

    
//     const handleFileChange = (event) => {
//         const file = event.target.files[0];
//         if (file) {
//             setFileName(file.name);
//             // FileReader to read file content
//             const reader = new FileReader();
//             reader.onload = (e) => {
//                 // Set the content of the file to state
//                 setFileContent(e.target.result); // Change this line
//             };
//             reader.readAsText(file);
//         } else {
//             setFileName('');
//             setFileContent('');
//         }
//     };
    

//     // const uploadFile = async () => {
//     //     if (fileContent) {
//     //         try {
//     //             const response = await fetch('http://127.0.0.1:5000/upload-csv', {
//     //                 method: 'POST',
//     //                 body: fileContent,
//     //             });
//     //             const data = await response.json();
//     //             console.log("csv",data); // Handle the response data
//     //             setProcessedData(data);
//     //             setUploadStatus('File uploaded successfully');
//     //         } catch (error) {
//     //             console.error('Error:', error);
//     //             setUploadStatus('Error uploading file');
//     //         }
//     //     } else {
//     //         setUploadStatus('No file selected');
//     //     }
//     // };
//     const uploadFile = async () => {
//         if (fileContent) {
           
//             try {
//                 const formData = new FormData();
//                 formData.append('file', fileContent); // Append file content with key 'file'
//                 console.log("Filecontent:", fileContent); 
//                 const response = await fetch('http://127.0.0.1:5000/upload-csv', {
//                     method: 'POST',
//                     body: fileContent, // Send formData instead of fileContent
//                 });
//                 const data = await response.json();
//                 console.log("csv",data); // Handle the response data
//                 setProcessedData(data);
//                 setUploadStatus('File uploaded successfully');
//             } catch (error) {
//                 console.error('Error:', error);
//                 setUploadStatus('Error uploading file');
//             }
//         } else {
//             setUploadStatus('No file selected');
//         }
//     };

 

//     return (
//         <div>
//             <Button
//                 id='upload-btn'
//                 component="label"
//                 role={undefined}
//                 variant="contained"
//                 tabIndex={-1}
//                 startIcon={<CloudUploadIcon />}
//                 onClick={uploadFile} // Call uploadFile function when button is clicked
//             >
//                 Upload file
//                 <VisuallyHiddenInput type="file" onChange={handleFileChange} />
//             </Button>
//             {fileName && <span id="file-name">{fileName}</span>}
//             {uploadStatus && <p style={{marginLeft:'100px'}}>{uploadStatus}</p>}
//         </div>
//     );
// }
import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { toast } from "react-toastify";
export default function Upload() {
    const [fileName, setFileName] = useState('');
    const [fileContent, setFileContent] = useState(null); // Changed to store file object
    const [uploadStatus, setUploadStatus] = useState(null); // State to hold upload status
    const [processedData, setProcessedData] = useState(null);
 console.log("data from backend",processedData)
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

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFileName(file.name);
            setFileContent(file); // Store file object directly
        } else {
            setFileName('');
            setFileContent(null);
        }
    };

    const uploadFile = async () => {
        if (fileContent) {
            console.log("file",fileContent)
            try {
                const formData = new FormData();
                formData.append('file', fileContent); // Append file object

                console.log("FormData:", formData); // Check FormData content
      
                const response = await fetch('http://127.0.0.1:5000/upload-csv', {
                    method: 'POST',
                    body: formData,
                });

                const data = await response.json();
                console.log("csv", data); // Handle the response data
                setProcessedData(data);
                toast.success("file uploaded successfully");
            } catch (error) {
                console.error('Error:', error);
                toast.error("Error uploading file");
            }
        } else {
            setUploadStatus('No file selected');
        }
    };

    return (
        <div>
            <Button
                id='upload-btn'
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
            >
                Upload file
                <VisuallyHiddenInput type="file" onChange={handleFileChange} />
            </Button>
            <Button
                id='submit-btn1'
                variant="contained"
                onClick={uploadFile} // Call uploadFile function when button is clicked
            >
                Submit
            </Button>
            {fileName && <span id="file-name">{fileName}</span>}
          
        </div>
    );
}



