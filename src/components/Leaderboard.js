import React from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import NavBar from './NavBar'


const Leaderboard = () => {
    const users = useSelector(state=> Object.values(state.users));
    
    return (
        <Container>
            <NavBar/>
            <Row>
                <h2 className='text-center text-success'>Leaderboard</h2>
                <Col>
                    {users.map(user=>(
                        <Card key={user.id} className='m-3 text-center'>
                            <Card.Body>
                                <Card.Title>{user.name}</Card.Title>
                                <Card.Img src={user.avatarURL} style={{width:'200px'}}/>
                                <Card.Text variant='h4' className='text-info'>
                                   Answered Questions :  {Object.keys(user.answers).length}
                                </Card.Text>
                                <Card.Text variant='h4' className='text-info'>
                                    Created Questions :  {user.questions.length}
                                </Card.Text>
                                <Card.Text variant='h2' className='text-info'>
                                    Total : {Object.keys(user.answers).length + user.questions.length}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    ))}
                </Col>
            </Row>
        </Container>
    )
}

export default Leaderboard
