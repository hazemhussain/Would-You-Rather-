import React, { Component } from 'react';
import { Container, Spinner } from 'react-bootstrap'

export default class NoMatch extends Component {
    render() {
        return (
            <Container>
               <Spinner>
                  Wrong Question 
               </Spinner>
            </Container>
        )
    }
}
