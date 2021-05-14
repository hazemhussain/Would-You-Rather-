import React, { Component } from 'react';
import { Container, Spinner , Button } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'

export default class NoMatch extends Component {
    state = {
        toHome : false
    }
    back = (e)=> {
        e.preventDefault()
        this.setState({toHome:true})
    }
    render() {
        if(this.state.toHome) {return <Redirect to='/'/>}
        return (
            <Container>
                <Spinner animation="border" variant="danger" />
                <h2>404 Wrong question</h2>
                <Button  variant='danger' type='submit' onClick={this.back}>Home</Button>
            </Container>
        )
    }
}
