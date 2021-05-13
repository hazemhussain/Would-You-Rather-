import React, { Component } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { connect } from 'react-redux';
import NavBar from './NavBar';
import { handleAddQuestion } from '../actions/questions'
import { Redirect } from 'react-router';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



class NewPoll extends Component {
    state = {
        optionOneText: '',
        optionTwoText: '',
        toHome :false,
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const { optionOneText, optionTwoText,toHome} = this.state 
        const { dispatch } = this.props
        dispatch(handleAddQuestion(optionOneText,optionTwoText))
        this.setState({
            optionOneText:'',
            optionTwoText:'',
            toHome:true
        })
        console.log(toHome) 
        toast.info('New question successfuly created')
        
    }
    render() {
        const disabled = this.state.optionOneText === '' || this.state.optionTwoText ==='' ? true : false
        if(!this.props.authedUser){return <Redirect to='/login'/>}
        if(this.state.toHome){return <Redirect to='/questions'/>}
        return (
            <Container>
                <Row>
                    <Col>
                        <NavBar/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h2 className='text-center mt-3 text-info'>Add New Question</h2>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group>
                                <Form.Label>Enter Option One</Form.Label>
                                <Form.Control type='text'
                                    value={this.state.optionOne}
                                    onChange={e=>this.setState({optionOneText:e.target.value})}
                                    placeholder='enter option one'
                                />
                            </Form.Group>
                            <Form.Group className='mt-4'>
                                <Form.Label>Enter Option One</Form.Label>
                                <Form.Control type='text'
                                    value={this.state.optionTwo}
                                    onChange={e=>this.setState({optionTwoText:e.target.value})}
                                    placeholder='enter option two'
                                />
                            </Form.Group>
                            <Button className='mt-3' variant='success' type='submit' disabled={disabled}>Add</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        )
    }
}


function mapStateToProps({authedUser}) {
    return {
        authedUser
    }
}


export default connect (mapStateToProps) (NewPoll)
