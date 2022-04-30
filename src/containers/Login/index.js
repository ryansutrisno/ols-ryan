import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import {makeStyles} from '@material-ui/core/styles';
import {
  Button,
  Container,
  Typography,
  TextField,
  Paper,
  Grid,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    padding: theme.spacing(6),
  },
  submitButton: {
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
  },
  title: {
    fontWeight: 600,
    textAlign: 'left',
    marginBottom: theme.spacing(3),
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: theme.spacing(3),
    padding: theme.spacing(3),
  },
}));

const Login = () => {
  const classes = useStyles();
  const history = useHistory();
  const [isSubmitting, setSubmitting] = useState(true);
  const [userId, setUserId] = useState('');
  const [email, setEmail] = useState('');

  const handleChangeUserId = (e) => {
    setSubmitting(false);
    setUserId(e.target.value);
    console.log(e.target.value);
  };

  const handleChangeEmail = (e) => {
    setSubmitting(false);
    setEmail(e.target.value);
    console.log(e.target.value);
  };

  const handleCancel = () => {
    setSubmitting(true);
    setUserId('');
    setEmail('');
    history.push('/');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    console.log('Submitting');
  };
  return (
    <Container maxWidth="xs">
      <Paper className={classes.paper}>
        <Typography variant="h5" component="h1" className={classes.title}>
          Login
        </Typography>
        <form onSubmit={handleSubmit} noValidate>
          <TextField
            id="userId"
            type="text"
            name="userid"
            margin="normal"
            label="UserId"
            fullWidth
            // required
            value={userId}
            onChange={handleChangeUserId}
            // disabled={isSubmitting}
          />
          <TextField
            id="email"
            type="email"
            name="email"
            margin="normal"
            label="Email"
            fullWidth
            required
            value={email}
            onChange={handleChangeEmail}
            // disabled={isSubmitting}
          />

          <Grid container className={classes.buttons}>
            <Grid item xs>
              <Button
                // disabled={isSubmitting}
                onClick={handleCancel}
                variant="contained"
                size="large"
              >
                Cancel
              </Button>
            </Grid>
            <Grid item xs>
              <Button
                disabled={isSubmitting}
                type="submit"
                color="primary"
                variant="contained"
                size="large"
              >
                Login
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Login;