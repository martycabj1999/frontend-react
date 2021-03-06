import React, { useState } from "react";
import {
  Grid,
  TextField,
  Button,
  Typography,
} from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import ShopIcon from '@material-ui/icons/Shop';
import { useStyles } from '../styles/StyleForm'
import Alert from '../../layout/components/alert/Alert'
import Swal from 'sweetalert2'
import { RepositoryFactory } from '../../../repositories/RepositoryFactory'
import { checkAuth } from '../../../Repository'

const walletRepository = RepositoryFactory.get('wallet')

const PurchaseForm = (props) => {

  const classes = useStyles();

  const [formState, setFormState] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    submitted: false
  })
  const [errors, setErrors] = useState({
    title: { status: false, text: "" },
    amount: { status: false, text: "" },
  })
  const [registerError, setRegisterError] = useState({
    regError: false,
    regMsg: ""
  })

  const onChange = event => {

    formData[event.target.name] = event.target.value;
    setFormData(formData);

    switch (event.target.name) {
      case "title":
        titleVerify(event.target.name);
        break;
      case "amount":
        amountVerify(event.target.name);
        break;
      default:
        console.log("nandemonai");
    }
  };

  const titleVerify = item => {
    let data = formData[item];

    if (/^[a-zA-Z\s]*$/.test(data)) {
      clearHelperText(item);
      setFormState(false);
    } else {
      setHelperText(item, "Only letters are allowed");
      setFormState(true);
    }

  };

  const amountVerify = item => {
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

    let response = await walletRepository.purchase({
      title: formData.title,
      amount: formData.amount,
    })
    console.log(response)
    setFormState(true);
    setFormData({ ...formData, submitted: true });

    Swal.fire({
      title: 'Success!',
      text: `Purchase pending confirmation`,
      icon: 'success',
      confirmButtonText: 'Ok'
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        window.location.href = "/code"
      } 
    })
  }

  return (
    <form onSubmit={onSubmit}>
      {registerError.regError && (
        <Alert type={'error'} content={registerError.regmsg} />
      )}
      {formData.submitted
        ? (<Alert content={"Purchase pending confirmation"} type='success' />)
        : (<Grid container spacing={2}>
          <Grid item xs={6} sm={6}>
            <TextField
              autoComplete="title"
              name="title"
              variant="filled"
              type="string"
              fullWidth
              required
              id="title"
              label={"Title"}
              placeholder={formData.title}
              onChange={onChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <ShopIcon />
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              helperText={errors.amount.text}
              error={errors.amount.status}
              placeholder={formData.amount}
              onChange={onChange}
              autoComplete="amount"
              name="amount"
              variant="filled"
              type="number"
              fullWidth
              required
              id="amount"
              label={"Mount"}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MonetizationOnIcon />
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

export default PurchaseForm;