import React from 'react';
import {Container,Row, Col, Card } from 'react-bootstrap'
import {useSelector} from 'react-redux';
import NavBar from './NavBar';


const UsersDetails = () => {
    const users = useSelector(state=>Object.values(state.users));
    return (
       <Container>
           <NavBar/>
           <Row>
               <h2 className='text-center h3'>Would you Wrather</h2>
               <Col className='d-flex flex-column justify-content-center  align-items-center '>
               {users.map(user=>(
                   <Card key={user.id} className='d-flex justify-content-center align-items-center mt-2' style={{width:'350px'}}>
                       <Card.Body>
                        <Card.Img src={user.avatarURL} style={{width:'200px'}}/>
                        <Card.Title className='text-center mt-2'>{user.name}</Card.Title>
                       </Card.Body>
                   </Card>
               ))}
               </Col>
           </Row>
       </Container>
    )
}

export default UsersDetails
