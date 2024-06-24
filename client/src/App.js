import { useState,useEffect } from 'react';
import './App.css';
import background from './assets/background.png';
import DragDropFiles from './components/DragAndDrop';
import axios from 'axios';
function App() {

  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [copiedNow,setCopiedNow] = useState(null);
  const getAllFiles = async () => {
    try {
      const response = await axios.post('http://localhost:4999/getfiles');
      setUploadedFiles(response.data.files.reverse());
    } catch (error) {
      console.error('Error fetching uploaded files: ', error.message);
    }
  };
  useEffect(()=>{
    getAllFiles();
  },[]);
  const downloadClickHandler = async (path)=>{
    window.open(`http://localhost:4999/file/${path}`);
  };
  const copyLinkClickHandler = (path,index)=>{
    if(copiedNow === index){ 
      setCopiedNow(null);
      return;
    }
    else setCopiedNow(index);
    navigator.clipboard.writeText(`http://localhost:4999/file/${path}`);
    
  };
  return (
    <>
    
    <div className="container">
        <img src={background} alt="background"/>
        <div className="uploader">
          <DragDropFiles getAllFiles={getAllFiles}/>
          <div className='uploadcontainer'>
          <h1 className="title">Wormhole File Sharing</h1>
          { uploadedFiles.length === 0 ? 
          (
          <div>
            <h3 style={{"fontSize": "18px","fontFamily" : "roboto","marginTop":"1rem","fontWeight":"500","lineHeight":"1.4rem","color": "#de870d"}}>Experience seamless file sharing with Wormhole, the ultimate solution for transferring files of any size without limits. Whether you’re sending high-resolution photos, lengthy videos, large documents, or entire folders, Wormhole makes it easy and efficient.<br/>
            <br/>Simply drag and drop your files into the designated area, and they’ll be uploaded in seconds. Once your files are uploaded, you can download them or copy the link to share with others. 
            <br/>
            <br/>
            <h3 style={{"fontWeight":"500","textDecoration":"underline"}}>Your uploaded Files will appear here</h3>
            </h3>

          </div>
          ) :
          (
          <div className='files'>
            {
              uploadedFiles.map((file,index) => {
                return (
                  <div
                  key = {file._id} 
                  className={`file`} >
                    <h2 className='filename'>{file.name.length > 30 ? file.name.substr(0,30) : file.name}
                    </h2>
                    <p className='filesize'>{file.size} bytes</p>
                    <button onClick={() => downloadClickHandler(file._id)} className='download'>Download</button>
                    <button onClick={() => copyLinkClickHandler(file._id,index)} className='copylink'>{copiedNow === index ? "copied": "copy link"}</button>
                  </div>
                )
              })
            }
          </div>)}
          </div>
          
        </div>
    </div>
    </>
  );
}

export default App;
