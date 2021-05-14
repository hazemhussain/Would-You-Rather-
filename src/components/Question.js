import React, { Component } from 'react'
import { Container, Row, Col, ListGroup, Image } from 'react-bootstrap';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import { Redirect} from 'react-router-dom'


class Question extends Component {
    
    render() {
        if(!this.props.authedUser){ return <Redirect to={{
            pathname:'/',
            state: {
                returnPath: `/questions`
            }
        }}     
            />
            }
        return (
            <Container>
                <Row>
                    <Col>
                        <Image src={this.props.avatar} roundedCircle style={{width:'75px'}} />
                    </Col>
                    <p className='text-info'><span className='text-success'>Asked By:</span> {this.props.name}</p>
                    <Col>
                       <ListGroup>
                           <ListGroup.Item>{this.props.question.optionOne.text}</ListGroup.Item>
                       </ListGroup>
                    </Col>
                    <Col>
                    <ListGroup>
                           <ListGroup.Item>{this.props.question.optionTwo.text}</ListGroup.Item>
                       </ListGroup>
                    </Col>
                    <Col>
                    <Link to={`/questions/${this.props.id}`}>View</Link>
                    </Col>
                </Row>
            </Container>
        )
    }
}

function mapStateToProps( { questions, users,authedUser } , {id}) {
    const question =  questions[id]
    const user =  question ? users[questions[id].author] : null
    return {
        question,
        avatar : user.avatarURL,
        name: user.name,
        id,
        authedUser
      
    }
	
}


export default connect(mapStateToProps) (Question)
