
import * as React from "react";
import { Segment, Image } from 'semantic-ui-react'
import { Switch, TextField } from '@material-ui/core';
import { useDropzone } from 'react-dropzone'
var avatarTest = require('../../app_root/images/avatar_test.png')
var avatarAnonym = require('../../app_root/images/avatar_anonym.png')
import './create_time_capsule.css';
export const CreateTimeCapsule = () => {
  const [completed, setCompleted] = React.useState(0);

  const [dropzoneStatus, setDropzoneStatus] = React.useState("upload");
  const [state, setState] = React.useState({
    checkedA: false,
    checkedB: false,
  });
  const [file, setFile] = React.useState({
    fileName: '',
    fileSize: '',
  });
  var states = {
    files: [],
    fileName: '',
    url: 'http://localhost:8900',
    matget: '',
    fileSize: 0,
    selectedFile: FormData,
  };
  const progress = React.useRef(() => { });
  React.useEffect(() => {
    progress.current = () => {
      if (completed > 100) {
        setCompleted(0);
        // setBuffer(10);
      } else {
        const diff = Math.random() * 10;
        // const diff2 = Math.random() * 10;
        setCompleted(completed + diff);
        // setBuffer(completed + diff + diff2);
      }
    };
  });

  React.useEffect(() => {
    function tick() {
      progress.current();
    }
    const timer = setInterval(tick, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);


  const handleChange = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [name]: event.target.checked });
  };
  const handleChangePublisher = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
  };
  const handleChangePublisherEmail = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
  };
  let data = new FormData();

  const onDrop = React.useCallback(acceptedFiles => {
    if (acceptedFiles.length >= 2) {
      alert("can upload multiple file ")
    } else {
      data.delete("file");
      data.append("file", acceptedFiles[0], acceptedFiles[0].name);
      var reader = new FileReader();
      reader.onload = function () {
        var arrayBuffer = reader.result;
        let currentArray = arrayBuffer === null ? JSON.parse("null") : arrayBuffer;
        states.files = currentArray;
        states.fileName = acceptedFiles[0].name;
        states.fileSize = acceptedFiles[0].size;
        setFile({ fileName: acceptedFiles[0].name, fileSize: readableBytes(acceptedFiles[0].size) });
        setDropzoneStatus("edit");
        console.log("buffered");
      };
      reader.readAsArrayBuffer(acceptedFiles[0]);
    }
  }, [])
  const { getRootProps, getInputProps } = useDropzone({ onDrop })
  function readableBytes(bytes: number) {
    var i = Math.floor(Math.log(bytes) / Math.log(1024)),
      sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    return (bytes / Math.pow(1024, i)).toFixed(2) + ' ' + sizes[i];
  }
  return (
    <div className="App" style={{ marginLeft: '10%' }}>

      <Segment placeholder color="black" style={{ width: '75%', marginLeft: '10%', marginTop: '2%' }} >
        <div style={{ display: state.checkedB === false ? 'block' : 'none' }}>
          <div style={{ float: "left", marginTop: "4%" }}>
            <Image src={avatarTest} size='small' circular />
          </div>
          <div style={{ float: "left", marginTop: "3%", marginLeft: "2%", textAlign: "left" }}>
            <TextField
              id="standard-name"
              label="Publisher"
              defaultValue="John wick"
              onChange={handleChangePublisher('name')}
              margin="normal"
            /><br />
            <TextField
              id="standard-name"
              label="Information Email"
              defaultValue="john@wick.com"
              onChange={handleChangePublisherEmail('name')}
              margin="normal"
            /><br />
          </div>
          <div style={{ float: "right", marginRight: "1%" }}>
            <strong>Anonym:<Switch
              checked={state.checkedB}
              onChange={handleChange('checkedB')}
              value="checkedB"
              color="primary"
              inputProps={{ 'aria-label': 'primary checkbox' }}
            /></strong>
          </div>
        </div>
        <div style={{ display: state.checkedB === true ? 'block' : 'none' }}>
          <div style={{ float: "left", marginTop: "4%" }}>
            <Image src={avatarAnonym} size='small' circular />
          </div>
          <div style={{ float: "left", marginTop: "7%", marginLeft: "2%", textAlign: "left" }}>
            <code><p><strong>Publisher: </strong>Anonymous User</p></code><br />
            <code><p><strong>Information Email: </strong>Anonymous Email</p></code>
          </div>
          <div style={{ float: "right", marginRight: "1%" }}>
            <strong>Anonym:<Switch
              checked={state.checkedB}
              onChange={handleChange('checkedB')}
              value="checkedB"
              color="primary"
              inputProps={{ 'aria-label': 'primary checkbox' }}
            /></strong>
          </div>
        </div>
        {/* <Header icon>
          <LinearProgress color="secondary" variant="buffer" value={completed} valueBuffer={buffer} />
        </Header> */}
        <div className="line_crate"/>
        <div {...getRootProps()} style={{ display: dropzoneStatus === "upload" ? "block" : "none", cursor: "pointer" }}>
          <input {...getInputProps()} />

          <h2 className="ui header">
            <i className="large icons">
              <i aria-hidden="true" className="cloud upload icon" />
              <i aria-hidden="true" className="add corner icon" />
            </i>
            Add on Gignox
        </h2>
        </div>
        <div style={{ display: dropzoneStatus === "edit" ? "block" : "none" }}>
          <div {...getRootProps()} style={{ float: "left", cursor: "pointer", width: "50%" }}>
            <input {...getInputProps()} />
            <h2 className="ui header">
              <i className="large icons">
                <i aria-hidden="true" className="cloud upload icon" />
                <i aria-hidden="true" className="add corner icon" />
              </i>
              Edit on Gignox
                </h2>
          </div>
          
          <div style={{ float: "left", textAlign: "left", width: "50%", marginTop: "4%" }}>
            <code><p><strong>File Name: </strong>{file.fileName}</p></code><br />
            <code><p><strong>File Size: </strong>{file.fileSize}</p></code>
          </div>
        </div>
      </Segment>
      <button style={{ width: '75%', marginLeft: '10%' }} className="ui fluid positive  button">Send Time Capsule to Future</button>
    </div>
  );
}