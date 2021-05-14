import React,{ Component } from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap';
import { connect } from 'react-redux';
import NavBar from './NavBar'




 class Leaderboard extends Component {
    render() {
        const usersDetail = this.props.users.sort( (a, b) => b.totalScore - a.totalScore)
        return (
            <Container>
            <NavBar/>
            <Row>
                <h2 className='text-center text-success'>Leaderboard</h2>
                <Col>
                    {
                        usersDetail.map(user=>(
                            <Card className='m-3 text-center' key={user.id}>
                            <Card.Body>
                                <Card.Title>{user.name}</Card.Title>
                                <Card.Img src={user.avatarURL} style={{width:'200px'}}/>
                                <Card.Text variant='h4' className='text-info'>
                                   Answered Questions : {Object.keys(user.answers).length} 
                                </Card.Text>
                                <Card.Text variant='h4' className='text-info'>
                                    Created Questions : {user.questions.length}  
                                </Card.Text>
                                <Card.Text variant='h2' className='text-info'>
                                    Total : {user.total}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        ))
                    }
                </Col>
            </Row>
        </Container>
        )
    }
}

function mapStateToProps( { users }) {
    const usersList = Object.values(users)
    usersList.map( (user) => user.total = Object.keys(user.answers).length + user.questions.length )
    return {
        users: usersList
    }
}

export default connect (mapStateToProps) (Leaderboard)