import { useState, useRef } from "react";
import styled from "styled-components";
import { uploadFile } from "../services/api";

const DragDropFiles = ({getAllFiles}) => {
  const [files, setFiles] = useState(null);
  const inputRef = useRef();

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setFiles(event.dataTransfer.files[0])
  };
  const getFiles = async () => {
    if(files){
        const data = new FormData();
        data.append('name', files.name);
        data.append('file', files);
        await uploadFile(data);
    }
};
  const handleUpload = async () => {
    await getFiles();
    getAllFiles();
    setFiles(null);
  };
  if (files) return (
    <Container className="uploads">
        <p>
            {files.name} <br/>{files.size} bytes
        </p>
        <div className="actions">
            <button onClick={() => setFiles(null)}>Cancel</button>
            <button onClick={handleUpload}>Upload</button>
        </div>
    </Container>
  )

  return (
    <>
        <Container 
            className="dropzone"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => inputRef.current.click()}
        >
        <button>Select files to upload</button>
          <p>or drag and drop files to upload</p>
          <input 
            type="file"
            onChange={(event) => setFiles(event.target.files[0])}
            hidden
            ref={inputRef}
          />
        </Container>
    </>
  );
};


const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 60%;
    width: 40%;
    gap: 1rem;
    padding: 1rem;
    margin: auto;
    border: 2px dashed #000;
    border-radius: 20px;
    background-color: #ffffff50;
    color: #000;
    font-size: 1.5rem;
    font-weight: bold;
    cursor: pointer;
    transition: 0.3s;
    
    &:hover {
        background-color: #ffffff80;
    }
    
    input {
        display: none;
    }
    button {
        padding: 0.5rem 1rem;
        font-size: 1.5rem;
        font-weight: 600;
        color: #fff;
        background-color: #000;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        transition: 0.3s;
        gap: 2rem;
        margin-bottom: 2rem;
        margin-right: 1rem;
    }
`;
export default DragDropFiles;