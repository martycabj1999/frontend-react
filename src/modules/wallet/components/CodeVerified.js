import React, { useState } from "react";
import {
  Grid,
  TextField,
  Button,
  Typography,
} from "@material-ui/core";
import { useStyles } from '../styles/StyleForm'
import InputAdornment from "@material-ui/core/InputAdornment";
import HttpsIcon from '@material-ui/icons/Https';
import Alert from '../../layout/components/alert/Alert'
import Swal from 'sweetalert2'
import { RepositoryFactory } from '../../../repositories/RepositoryFactory'
import { checkAuth } from '../../../Repository'

const walletRepository = RepositoryFactory.get('wallet')

const CodeVerified = (props) => {

  const classes = useStyles();

  const [formState, setFormState] = useState(false)
  const [formData, setFormData] = useState({
    code: "",
    submitted: false
  })
  const [errors, setErrors] = useState({
    code: { status: false, text: "" },
  })
  const [registerError, setRegisterError] = useState({
    regError: false,
    regMsg: ""
  })

  const onChange = event => {

    formData[event.target.name] = event.target.value;
    setFormData(formData);

    switch (event.target.name) {
      case "code":
        codeVerify(event.target.name);
        break;
      default:
        console.log("nandemonai");
    }
  };

  const codeVerify = item => {
    let data = formData[item];

    if (/^[^\s]+$/.test(data)) {
      clearHelperText(item);
      setFormState(false);
    } else {
      setHelperText(item, "Only letters and numbers are allowed");
      setFormState(true);
    }

  };

  const setHelperText = (item, text) => {
    setErrors({
      ...errors,
      [item]: { status: true, text: text }
    })
  };

  const clearHelperText = item => {
    setErrors({
      ...errors,
      [item]: { status: false, text: "" }
    })
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    await checkAuth()

    let response = await walletRepository.purchaseVerified({
      code: formData.code,
    })
    console.log(response)
    setFormState(true);
    setFormData({ ...formData, submitted: true });

    Swal.fire({
      title: 'Success!',
      text: `Confirmed purchase`,
      icon: 'success',
      confirmButtonText: 'Ok'
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        window.location.href = "/home"
      } 
    })
  }

  return (
    <form onSubmit={onSubmit}>
      {registerError.regError && (
        <Alert type={'error'} content={registerError.regmsg} />
      )}
      {formData.submitted
        ? (<Alert content={"Confirmed purchase"} type='success' />)
        : (<Grid container spacing={2}>
          <Grid item xs={6} sm={6}>
            <TextField
              helperText={errors.code.text}
              error={errors.code.status}
              autoComplete="code"
              name="code"
              variant="filled"
              type="string"
              fullWidth
              required
              id="code"
              label={"Code"}
              placeholder={formData.code}
              onChange={onChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <HttpsIcon />
                  </InputAdornment>
                )
              }}
            />
          </Grid>
        </Grid>)
      }
      <Grid container spacing={2}>

        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle2" style={{ spacing: 5, visibility: formData.submitted ? 'hidden' : 'visible' }} className="campos">* The fields are mandatory</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          {!formData.submitted ?
            <Button
              disabled={formState}
              type="submit"
              variant='contained'
              color="primary"
              className={classes.submit}
            >
              Save
            </Button>
            : null}
        </Grid>
      </Grid>
    </form>
  );
}

export default CodeVerified;