import React from 'react';
import { Container, Card, CardContent } from '@material-ui/core';
import UpdateWalletForm from '../components/UpdateWalletForm'
import { useStyles } from '../styles/StylePage';

const Update = () => {
    const classes = useStyles();
    return ( 
        <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
            <Card>
            <CardContent>
                
                <UpdateWalletForm />
            </CardContent>
            </Card>
        </div>
        </Container>
     );
}
 
export default Update;