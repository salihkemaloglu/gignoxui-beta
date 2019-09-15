import * as React from 'react';
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Header, Icon, Segment } from 'semantic-ui-react'
import './home.css'
export const Home = () => {
  var state = {
    files: [],
    fileName: '',
    url: 'http://localhost:8900',
    matget: '',
    fileSize: 0,
    selectedFile: FormData,
  };


  let data = new FormData();
  function handleChange(selectorFiles: FileList) {
    data.delete("file");
    data.append("file", selectorFiles[0], selectorFiles[0].name);
    var reader = new FileReader();
    reader.onload = function () {
      var arrayBuffer = reader.result;
      let currentArray = arrayBuffer === null ? JSON.parse("null") : arrayBuffer;
      state.files = currentArray;
      state.fileName = selectorFiles[0].name;
      state.fileSize = selectorFiles[0].size;
      console.log("buffered");
    };
    reader.readAsArrayBuffer(selectorFiles[0]);
  }

  async function fileUploadHandler() {
    let url = 'http://localhost:8904/uploadfile';
    await axios.post(url,
      data,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
          var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          console.log(percentCompleted);
        }
      }
    ).then(res => {
      console.log(res)
      console.log('SUCCESS!!');
    })
      .catch(err => {
        console.log(err)
        console.log('FAILURE!!');
      });
  }
  const useStyles = makeStyles(theme => ({
    root: {
      width: '90%',
    },
    button: {
      marginRight: theme.spacing(1),
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  }));

  function getSteps() {
    return ['Upload file', 'Create an ad group', 'Create an ad'];
  }

  function getStepContent(step: any) {
    switch (step) {
      case 0:
        return 'Upload file ...';
      case 1:
        return 'What is an ad group anyways?';
      case 2:
        return 'This is the bit I really care about!';
      default:
        return 'Unknown step';
    }
  }
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const steps = getSteps();

  function isStepOptional(step: any) {
    return step === 1;
  }

  function isStepSkipped(step: any) {
    return skipped.has(step);
  }

  function handleNext() {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep(prevActiveStep => prevActiveStep + 1);
    setSkipped(newSkipped);
  }

  function handleBack() {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  }

  function handleSkip() {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep(prevActiveStep => prevActiveStep + 1);
    setSkipped(prevSkipped => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  }

  function handleReset() {
    setActiveStep(0);
  }
  return (
    <div className="App" >
      <div className="file-upload">
        <Segment.Group>
          <Segment />
          <Segment placeholder>
            <Header icon>
              <Icon name='video' />
              No documents are listed for this customer.
        </Header>
            <Button color="primary">Add Document</Button>
          </Segment>
        </Segment.Group>
      </div>
      <div className={classes.root}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            let stepProps = {};
            let labelProps = {};
            if (isStepOptional(index)) {
              labelProps = <Typography variant="caption">Optional</Typography>;
            }
            if (isStepSkipped(index)) {
              stepProps = false;
            }
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <div>
          {activeStep === steps.length ? (
            <div>
              <Typography className={classes.instructions}>
                All steps completed - you&apos;re finished
            </Typography>
              <Button onClick={handleReset} className={classes.button}>
                Reset
            </Button>
            </div>
          ) : (
              <div>
                <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
                <div>
                  <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                    Back
              </Button>
                  {isStepOptional(activeStep) && (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleSkip}
                      className={classes.button}
                    >
                      Skip
                    </Button>
                  )}

                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                </div>
              </div>
            )}
        </div>
      </div>
      <input type="file" onChange={(e: any) => handleChange(e.target.files)} />
      <button onClick={name} color="primary">test</button>
      <button onClick={fileUploadHandler} color="primary">fileUploadHandler</button>
    </div>
  );
};
