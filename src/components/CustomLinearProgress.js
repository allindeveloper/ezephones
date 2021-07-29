import LinearProgress from '@material-ui/core/LinearProgress';
import { withStyles } from '@material-ui/core/styles';
import React from 'react';
import { constants } from '../core/utilities';

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 8,
    borderRadius: 4,
  },
  colorPrimary: {
    backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
  },
  bar: {
    borderRadius: 4,
    backgroundColor: constants.colors.primaryBlue,
  },
}))(LinearProgress);



const CustomLinearProgress =({value,variant='indeterminate'}) => {

  return (
      <BorderLinearProgress variant={variant}  />
  );
}

export default CustomLinearProgress;
