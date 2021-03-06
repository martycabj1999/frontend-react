import React, { useState } from 'react';
import { Avatar, Grid, Menu, MenuItem } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SecurityIcon from '@material-ui/icons/Security';

//Action de redux 
import { setAuthAction } from '../../user/auth/store/AuthAction';

const ButtonProfile = (props) => {

    const [anchorElem, setAnchorElem] = useState(null);

    //utilizar useDispatch y te crea una funcion
    const dispatch = useDispatch();

    const openMenu = event => {
        setAnchorElem(event.currentTarget);
    }

    const closeMenu = () => {
        setAnchorElem(null);
    }

    const redirectLogout = () => {
        //se borra el usuario del storage y del localstorage 
        dispatch(setAuthAction({}));
        localStorage.removeItem('token-test')
    }
    return (
        <div >
                <div >
                    <Link onClick={redirectLogout} to="/logout" style={{ textDecoration: 'none' }}>
                        <MenuItem>
                            Logout
                        </MenuItem>
                    </Link>
                </div>
        </div>
    );
}

export default ButtonProfile;
