import React, { useState } from "react";
import {
  Grid,
  TextField,
  Button,
  Typography,
} from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import PhoneIcon from "@material-ui/icons/Phone";
import NameIcon from "@material-ui/icons/AccountBoxOutlined";
import { useStyles } from '../styles/StyleForm'
import Alert from '../../layout/components/alert/Alert'
import Swal from 'sweetalert2'
import { RepositoryFactory } from '../../../repositories/RepositoryFactory'
import { checkAuth } from '../../../Repository'

const walletRepository = RepositoryFactory.get('wallet')

const FindWallet = (props) => {

  const classes = useStyles();

  const [formState, setFormState] = useState(false)
  const [formData, setFormData] = useState({
    identificationNumber: "",
    phone: "",
    submitted: false
  })
  const [errors, setErrors] = useState({
    identificationNumber: { status: false, text: "" },
    phone: { status: false, text: "" },
  })
  const [registerError, setRegisterError] = useState({
    regError: false,
    regMsg: ""
  })

  const onChange = event => {

    formData[event.target.name] = event.target.value;
    setFormData(formData);

    switch (event.target.name) {
      case "identificationNumber":
        dniVerify(event.target.name);
        break;
      case "phone":
        phoneVerify(event.target.name);
        break;
      default:
        console.log("nandemonai");
    }
  };

  const dniVerify = item => {
    let data = formData[item];

    if (/^([0-9])*$/.test(data)) {
      clearHelperText(item);
      setFormState(false);
    } else {
      setHelperText(item, "Only numbers are allowed");
      setFormState(true);
    }

  };

  const phoneVerify = item => {
    let data = formData[item];

    if (/^([0-9])*$/.test(data)) {
      clearHelperText(item);
      setFormState(false);
    } else {
      setHelperText(item, "Only numbers are allowed");
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

    let response = await walletRepository.getWallet({
      identification_number: formData.identificationNumber,
      phone: formData.phone,
    })

    console.log(response)
    setFormState(true);
    setFormData({ ...formData, submitted: true });

    Swal.fire({
      title: 'Success!',
      text: `Wallet found with balance $`+response.amount,
      icon: 'success',
      confirmButtonText: 'Ok'
    }).then((result) => {
        window.location.href = "/home"
    })

  }

  return (
    <form onSubmit={onSubmit}>
      {registerError.regError && (
        <Alert type={'error'} content={registerError.regmsg} />
      )}
      {formData.submitted
        ? (<Alert content={"Wallet found"} type='success' />)
        : (<Grid container spacing={2}>
          <Grid item xs={6} sm={6}>
            <TextField
              helperText={errors.identificationNumber.text}
              error={errors.identificationNumber.status}
              autoComplete="identificationNumber"
              name="identificationNumber"
              variant="filled"
              type="string"
              fullWidth
              required
              id="identificationNumber"
              label={"DNI"}
              placeholder={formData.identificationNumber}
              onChange={onChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <NameIcon />
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          <Grid item xs={6} sm={6}>
            <TextField
              autoComplete="phone"
              name="phone"
              variant="filled"
              type="number"
              fullWidth
              required
              id="phone"
              label={"Phone"}
              placeholder={formData.phone}
              onChange={onChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneIcon />
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

export default FindWallet;