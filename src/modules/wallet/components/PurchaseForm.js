import React, { useState, useEffect } from "react";
import {
  Grid,
  TextField,
  Button,
  IconButton,
  Switch,
  FormControlLabel,
  FormControl,
  FormHelperText,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import MailIcon from "@material-ui/icons/MailOutline";
import NameIcon from "@material-ui/icons/AccountBoxOutlined";
import PassIcon from "@material-ui/icons/LockOutlined";
import VisibilityPassIconOn from "@material-ui/icons/VisibilityOutlined";
import VisibilityOffOutlinedIconOff from '@material-ui/icons/VisibilityOffOutlined';
import { useStyles } from '../styles/StyleForm'
import Alert from '../../layout/components/alert/Alert'
import { shortLength } from '../../../helps/regex'
import { RepositoryFactory } from '../../../repositories/RepositoryFactory'

const userRepository = RepositoryFactory.get('user')

const PurchaseForm = (props) => {

  const classes = useStyles();

  const [formState, setFormState] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    mount: "",
    submitted: false
  })
  const [errors, setErrors] = useState({
    title: { status: false, text: "" },
    mount: { status: false, text: "" },
  })
  const [registerError, setRegisterError] = useState({
    regError: false,
    regMsg: ""
  })

  const closeForm = () => {
    props.submitUpdate();
    props.newUser(formData);
    window.location.href = "/"
  }

  const closeFormWithoutSave = () => {
    props.submitUpdate();
  }

  const onChange = event => {

    formData[event.target.name] = event.target.value;
    setFormData(formData);

    switch (event.target.name) {
      case "title":
        titleVerify(event.target.name);
        break;
      case "mount":
        mountVerify(event.target.name);
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

  const mountVerify = item => {
    let data = formData[item];

    if (/^[a-zA-Z\s]*$/.test(data)) {
      clearHelperText(item);
      setFormState(false);
    } else {
      setHelperText(item, "Only letters are allowed");
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

  const onChecked = event => {
    setFormData({ ...formData, state: !formData.state });
  }

  const onSubmit = async (event) => {
    event.preventDefault();
    const verify = (errors.role);

    if (verify) {

      let response = await userRepository.addUser({
        title: formData.title,
        mount: formData.mount,
      })
      setFormState(true);
    }
  }

  return (
    <form onSubmit={onSubmit}>
      {registerError.regError && (
        <Alert type={'error'} content={registerError.regmsg} />
      )}
      {formData.submitted
        ? (<Alert content={"User created successfully"} type='success' />)
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
                    <NameIcon />
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              helperText={errors.mount.text}
              error={errors.mount.status}
              placeholder={formData.mount}
              onChange={onChange}
              autoComplete="mount"
              name="mount"
              variant="filled"
              type="number"
              fullWidth
              required
              id="mount"
              label={"Mount"}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MailIcon />
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
          <Button
            style={{ marginLeft: 5 }}
            variant="outlined"
            color="primary"
            className={classes.submit}
            onClick={formData.submitted ? closeForm : closeFormWithoutSave}
          >
            Exit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default PurchaseForm;