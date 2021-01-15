import React from 'react';
import { Container, Card, CardContent } from '@material-ui/core';
import FindWallet from '../components/FindWallet'
import { useStyles } from '../styles/StylePage';

const Update = () => {
    const classes = useStyles();
    return ( 
        <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
            <Card>
            <CardContent>
                
                <FindWallet />
            </CardContent>
            </Card>
        </div>
        </Container>
     );
}
 
export default Update;