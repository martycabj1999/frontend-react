import React, { useState } from "react";
import {
  Grid,
  TextField,
  Button,
  Typography,
} from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import NameIcon from "@material-ui/icons/AccountBoxOutlined";
import { useStyles } from '../styles/StyleForm'
import Alert from '../../layout/components/alert/Alert'
import { RepositoryFactory } from '../../../repositories/RepositoryFactory'

const userRepository = RepositoryFactory.get('user')

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
      case "code":
        DniVerify(event.target.name);
        break;
      default:
        console.log("nandemonai");
    }
  };

  const codeVerify = item => {
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
        code: formData.code,
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
                    <NameIcon />
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

export default CodeVerified;