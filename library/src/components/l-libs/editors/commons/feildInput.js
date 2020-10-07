import PropTypes from 'prop-types';
import React from 'react';
import TextField from '@material-ui/core/TextField';
import ListPanel from './listPanel';

class FeildInput extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			outlineSize: this.props.size
		}
	}

	handleSize = event => {
		this.setState({outlineSize: event.target.value});
		this.props.onChange(event.target.value);
	}

	render(){
    const {type, label} = this.props
		return(
      <ListPanel label={label}>
        <TextField
          inputProps={{'data-testid': 'outline-size'}}
          style={{width: 40}}
          autoFocus
          margin="dense"
          id="outlineSize"
          label=""
          type={type}
          value={this.state.outlineSize}
          onChange={this.handleSize}
        />
      </ListPanel>
		);
	}
}

FeildInput.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string, 
  label: PropTypes.any.isRequired,
  size: PropTypes.number 
};

export default FeildInput;
