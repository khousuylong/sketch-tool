import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles({
  centerItem: {
    display: 'flex',
    padding: 15,
    justifyContent: 'center'
  },
  root: {
    width: '100%',
  },
});

export default function ActionsInAccordionSummary() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    createNew: false
  });

  const createNewSketch = () => {
    setState({ ...state, createNew: true });
  }

  return (
    <div className={classes.root}>
      <div className={classes.centerItem}>
        <Button variant="contained" onClick={createNewSketch}>Create a sketch</Button>
      </div>
      {
        state.createNew ? 
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-label="Expand"
              aria-controls="additional-actions1-content"
              id="additional-actions1-header"
            >
              <TextField
                onClick={(event) => event.stopPropagation()}
                onFocus={(event) => event.stopPropagation()}
                id="standard-full-width"
                style={{ margin: 8 }}
                placeholder="Placeholder"
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
              />        
            </AccordionSummary>
            <AccordionDetails>
              <Typography color="textSecondary">
                The click event of the nested action will propagate up and expand the accordion unless
                you explicitly stop it.
              </Typography>
            </AccordionDetails>
          </Accordion>
        : null
      }
      
    </div>
  );
}
