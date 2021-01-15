import React from 'react'
import Register from "./modules/user/register/pages/Register";
import Purchase from './modules/wallet/pages/Purchase';
import Update from './modules/wallet/pages/Update';
import Home from './modules/layout/pages/Home';
import Auth from './modules/user/auth/pages/Auth';
import Unauthorized from "./modules/layout/components/Unauthorized";
import Verified from './modules/wallet/pages/Verified';
//icons
import HomeIcon from '@material-ui/icons/HomeTwoTone';
import ProfileIcon from '@material-ui/icons/AccountCircleTwoTone';
import UserManagementIcon from '@material-ui/icons/SupervisedUserCircleTwoTone';
import AuthIcon from '@material-ui/icons/VpnKeyTwoTone';
import ExitToAppTwoToneIcon from '@material-ui/icons/ExitToAppTwoTone';
import RegisterIcon from '@material-ui/icons/FaceTwoTone';
import NotAutorizeIcon from '@material-ui/icons/HighlightOffTwoTone';

export const routesPublic = [
    {
        name: "Home",
        path: '/home',
        component: Home,
        menuList: true,
        icon: <HomeIcon />
    },
    {
        name: "Authentication",
        path: '/auth',
        component: Auth,
        menuList: false,
        icon: <AuthIcon />,
    },
    {
        name: "Logout",
        path: '/logout',
        component: Auth,
        menuList: false,
        icon: <ExitToAppTwoToneIcon />,
    },
    {
        name: "Register",
        path: '/register',
        component: Register,
        menuList: false,
        icon: <RegisterIcon />,
    },
    {
        name: "UnAuthorized",
        path: '/unauthorized',
        component: Unauthorized,
        menuList: false,
        icon: <NotAutorizeIcon />,
    }
];
export const routesPrivate = [
    {
        name: "Purchase",
        path: '/purchase',
        component: Purchase,
        roles: ['admin', 'user'],
        menuList: true,
        icon: <ProfileIcon />,
    },
    {
        name: "Update",
        path: '/update/wallet',
        component: Update,
        roles: ['admin', 'user'],
        menuList: true,
        icon: <ProfileIcon />,
    },
    {
        name: "Verified",
        path: '/code',
        component: Verified,
        roles: ['admin', 'user'],
        menuList: false,
        icon: <ProfileIcon />,
    }
];