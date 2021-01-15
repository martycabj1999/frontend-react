import { Container, Card, CardContent } from '@material-ui/core';
import React from 'react';
import PurchaseForm from '../components/PurchaseForm'
import { useStyles } from '../styles/StylePage';

const Purchase = () => {
    const classes = useStyles();
    return ( 
        <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
            <Card>
            <CardContent>
                
                <PurchaseForm />
            </CardContent>
            </Card>
        </div>
        </Container>
     );
}
 
export default Purchase;