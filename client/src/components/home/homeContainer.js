import React from 'react';
import {Typography, Button} from '@material-ui/core';
import {withRouter} from 'react-router';
import axios from 'axios';

export const uploadRequest = async params => {
  console.log('params', params);
  return fetch('http://localhost:5000/image/upload', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: params
  })
    .catch(e => console.log(e))
    .then(response => response.json());
};

class UploadContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedFile: {someData: true, name: 'sdfsdf'}
    };
  }

  onChange = files => {
    console.log('#FILE', files);

    this.setState({
      selectedFile: files[0]
    });
  };

  onSubmit = async e => {
    e.preventDefault();
    let imageFormObj = new FormData();
    const {selectedFile} = this.state;

    imageFormObj.append('imageName', 'multer-image-' + Date.now());
    imageFormObj.append('imageData', selectedFile);

    // uploadRequest(imageFormObj);
    axios
      .post('http://localhost:5000/image/upload', imageFormObj)
      .then(data => {
        if (data) {
          console.log('Image has been successfully uploaded');
        }
      })
      .catch(err => {
        console.log('Error while uploading image', err);
      });
  };

  render() {
    console.log('Home', this.props, this.state);
    return (
      <div style={styles.container}>
        <Typography align={'justify'} style={styles.lableStyle}>
          Choose image to upload
        </Typography>
        <form onSubmit={this.onSubmit}>
          <label>
            <input
              style={{display: 'none'}}
              type="file"
              accept="image/*"
              onChange={event => this.onChange(event.target.files)}
            />

            <Button color="primary" variant="contained" component="span">
              Choose file
            </Button>
          </label>

          <button className="btn btn-primary" type="submit">
            Upload
          </button>
        </form>
        <Typography align={'justify'} style={styles.lableStyle}>
          {this.state.selectedFile.name}
        </Typography>
      </div>
    );
  }
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column'
  },
  lableStyle: {margin: 10}
};

export default withRouter(UploadContainer);
