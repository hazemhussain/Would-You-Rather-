import React, { Component } from 'react'
import { Col, Container, Row, Button, ListGroup } from 'react-bootstrap';
import NavBar from './NavBar';
import {connect} from 'react-redux';
import Question from './Question';
import { ToastContainer } from 'react-toastify';
import { Redirect } from 'react-router-dom'


 
 class Questions extends Component {
     state = {
         answeredQuest : false
     }
    handleAnsweredClick = () => {
        this.setState({answeredQuest:true})
    }


    handleUnansweredClick = () => {
        this.setState({answeredQuest:false})
    }

     render() {

         if(!this.props.authedUser){ return <Redirect to='/login'/>}
         return (
            <Container>
                <Row className='mt-4'>
                    <Row>
                        <Col>
                            <NavBar/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <ToastContainer/>
                        </Col>
                    </Row>
                    <Col className='mt-4'>
                        <Button className='bg-light text-info' onClick={this.handleAnsweredClick}>Answered Question</Button>
                        <Button className='m-2 bg-light text-info' onClick={this.handleUnansweredClick}>Unanswered Question</Button>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <ListGroup>
                            { this.state.answeredQuest
                                ? this.props.answeredQuestions.map(id=>(
                                    <ListGroup.Item key={id}>
                                       <Question id={id}/> 
                                    </ListGroup.Item>
                                ))
                                : this.props.unAnsweredQuestion.map(id =>(
                                    <ListGroup.Item key={id}>
                                        <Question id={id}/>
                                    </ListGroup.Item>
                                ))
                            
                            }
                        </ListGroup>
                    </Col>
                </Row>
            </Container>
         )
     }
 }
 
 function mapStateToProps({questions,authedUser,users}){
     const  answeredQuestions =  Object.keys(questions).filter((question) => (questions[question].optionOne.votes.indexOf(authedUser) > -1) || (questions[question].optionTwo.votes.indexOf(authedUser) > -1))
     .sort((a,b) => questions[b].timestamp - questions[a].timestamp)
     const unAnsweredQuestion =  Object.keys(questions).filter((question) => (questions[question].optionOne.votes.indexOf(authedUser) === -1) && (questions[question].optionTwo.votes.indexOf(authedUser) === -1))
     .sort((a,b) => questions[b].timestamp - questions[a].timestamp)
    return {
       
        answeredQuestions,
        unAnsweredQuestion,
        authedUser,
       
}

}


export default connect(mapStateToProps) (Questions)
