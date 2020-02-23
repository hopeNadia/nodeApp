import React from 'react';
import {Typography, Button} from '@material-ui/core';
import {withRouter} from 'react-router';

class UploadContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedFile: {}
    };
  }

  onChange = files => {
    console.log('#FILE', files);

    this.setState({
      selectedFile: files[0]
    });
  };

  render() {
    console.log('Home', this.props, this.state);
    return (
      <div style={styles.container}>
        <Typography align={'justify'} style={styles.lableStyle}>
          Choose image to upload
        </Typography>
        <label htmlFor="upload-photo">
          <input
            style={{display: 'none'}}
            id="upload-photo"
            name="upload-photo"
            type="file"
            accept="image/*"
            onChange={event => this.onChange(event.target.files)}
          />

          <Button color="primary" variant="contained" component="span">
            Choose file
          </Button>
        </label>
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
