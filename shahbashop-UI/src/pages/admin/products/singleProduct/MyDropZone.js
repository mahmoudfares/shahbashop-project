import React from "react";
import {useDropzone} from 'react-dropzone';

export default function MyDropzone(props) {

  const {acceptedFiles, getRootProps, getInputProps} = useDropzone({
    accept: 'image/jpeg, image/png'
  });
  
  const files = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));
  
  const handleSubmit = e => {
    console.log(e);
    e.preventDefault();
    if(acceptedFiles.length > 0){
      props.submit(acceptedFiles);
    }
  }
  
    return (
      <form onSubmit={e => handleSubmit(e)}>
        <div {...getRootProps({className: 'dropzone'})}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
        </div>
        <div>
        <h4>Files</h4>
        <ul>{files}</ul>
      </div>
        <button className="btn btn-primary">Add</button>
      </form>
    )
  }