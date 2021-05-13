import React, { Component } from 'react';
import { Col, Container, Row, Card, Form, Button, ProgressBar } from 'react-bootstrap';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import NoMatch from './NoMatch';
import { handleAddAnswer } from '../actions/questions';
import LoadingBar from 'react-top-loading-bar'
import NavBar from './NavBar';

 class QuestionDetails extends Component {
     state = {
         option: '',
         progress:0
     }

     handleSubmit = (e) => {
         e.preventDefault()
         const {dispatch, id,authedUser} = this.props
         console.log(this.state.option)
         const {option} = this.state
         dispatch(handleAddAnswer({
             qid:id,
             authedUser,
             answer:option
         }))
             
         this.setState({ progress: this.state.progress + 100})
        
     }
    render() {
        const disabled = this.state.option === '' ? true : false
        const { nomatch, authedUser, avatar,
            username,optionTwo,optionOne, 
            optionOneVotes,optionTwoVotes,
            optionOnePercentage, optionTwoPercentage,
            answered
         } = this.props
        if(!authedUser){ return <Redirect to='/login'/>}
        if(nomatch){
            return <NoMatch/>
        }
        return (
            <Container>
                <Row>
                    <LoadingBar
                        color='#f11946'
                        progress={this.state.progress}
                        onLoaderFinished={() => this.setState({progress:0})}
                    />
                   <Row>
                   <Col>
                        <NavBar/>
                    </Col>
                   </Row>
                    <Col className='mt-4'>
                        <h3 className='text-center text-info'>Would You Wrather Results:</h3>
                        {!answered  ? (
                             <Card className='d-flex justify-content-center align-items-center'>
                            <Card.Body className='mt-4'>
                                <Card.Title className='text-center'>{username}</Card.Title>
                                <Card.Img src={avatar} style={{width:'200px'}}/>
                                        <Form onSubmit={this.handleSubmit}>
                                        <Form.Group>
                                            <Form.Check type='radio'
                                            id="option1"
                                            value='optionOne'
                                            name="option"
                                            label={optionOne}
                                            onChange={(e)=>this.setState({option:e.target.value})}
                                            />
                                            <Form.Check type='radio'
                                            id="option2"
                                            name="option"
                                            value='optionTwo'
                                            label={optionTwo}
                                            onChange={(e)=>this.setState({option:e.target.value})}
                                            />
                                        </Form.Group>
                                        <Button className='bg-dark mt-3' type='submit' disabled={disabled}>
                                            Vote
                                        </Button>
                                    </Form>
                            </Card.Body>
                        </Card> ) : (
                            <>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>{optionOne}</Card.Title>
                                        <Card.Text>Number of Votes: {optionOneVotes}</Card.Text>
                                        <ProgressBar variant="success" now={optionOnePercentage} label={`${optionOnePercentage}%`}/>
                                    </Card.Body>
                                </Card>
                                <Card className='mt-4'>
                                    <Card.Body>
                                        <Card.Title>{optionTwo}</Card.Title>
                                        <Card.Text>Number of Votes: {optionTwoVotes}</Card.Text>
                                        <ProgressBar variant="success" now={optionTwoPercentage} label={`${optionTwoPercentage}%`}/>
                                    </Card.Body>
                                    </Card>
                             </>
                         )    

                        }                                         
                    </Col>
                </Row>
            </Container>
        )
    }
}

function mapStateToProps({authedUser, questions,users}, props){
    const { id } = props.match.params
    if(questions[id]===undefined) return { nomatch : true }
    const question = questions[id]
    const user =  question ? users[questions[id].author] : null
    const answered = question ? (question.optionOne.votes.indexOf(authedUser) > -1 || question.optionTwo.votes.indexOf(authedUser) > -1) : null
    const optionOneVotes = (question && question.optionOne.votes) ? question.optionOne.votes.length : 0
    const optionTwoVotes =  (question && question.optionTwo.votes) ? question.optionTwo.votes.length : 0
    const total = optionOneVotes + optionTwoVotes
    const optionOnePercentage =  ((optionOneVotes/ total) * 100).toFixed(1)
    const optionTwoPercentage =  ((optionTwoVotes / total) * 100).toFixed(1);
  return {
      id,
      avatar : user.avatarURL,
      username :user.name,
      optionOne:questions[id].optionOne.text,
      optionTwo:questions[id].optionTwo.text,
      total,
      question,
      authedUser,
      answered,
      optionOneVotes,
      optionTwoVotes,
      optionOnePercentage,
      optionTwoPercentage,
      userlogged :users[authedUser] 
     
  }
}

export default connect (mapStateToProps) (QuestionDetails)
