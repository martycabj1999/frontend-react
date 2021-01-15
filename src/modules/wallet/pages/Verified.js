import React from 'react';
import { Container, Card, CardContent } from '@material-ui/core';
import CodeVerified from '../components/CodeVerified'
import { useStyles } from '../styles/StylePage';

const Verified = () => {
    const classes = useStyles();
    return ( 
        <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
            <Card>
            <CardContent>
                
                <CodeVerified />
            </CardContent>
            </Card>
        </div>
        </Container>
     );
}
 
export default Verified;