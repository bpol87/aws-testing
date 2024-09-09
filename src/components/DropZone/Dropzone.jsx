import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';

function Dropzone() {
const dispatch = useDispatch();
  const [file, setFile] = useState()

  const handleChange = (event) => {
    setFile(event.target.files[0])
  }
  
  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch({type: 'ADD_PHOTO', payload: file})
  }

  return (
    <div className="App">
        <form onSubmit={handleSubmit}>
          <h1>React File Upload</h1>
          <input type="file" onChange={handleChange}/>
          <button type="submit">Upload</button>
        </form>
    </div>
  );
}

export default Dropzone;
