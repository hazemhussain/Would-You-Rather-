import React, { Component } from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {  clearAuthedUser } from '../actions/authedUser'


class NavBar extends Component {
    logOut = (e)=> {
        e.preventDefault()
        this.props.dispatch(  clearAuthedUser())
    }
    render() {
        return (
        <Container>
            <Navbar bg='dark' variant='dark' className='m-2 rounded text-light'>
            <Nav>
                <Nav.Item>
                    <Nav.Link as={Link} to='/'>Home</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link as={Link} to='/add'> Add New Poll</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link as={Link} to='/leader-board'> Leaderboard</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link as={Link} to='/questions'>Questions</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link as={Link} to='/login'>Login</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link onClick={this.logOut}>Logout</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    {this.props.authedUser !== null &&
                            <div className='user'>
                            <p className='title'> User: {this.props.user.name}</p>
                            <img  className='rounded-circle image' src={this.props.user.avatarURL} 
                            style={{width:'40px'}} alt={this.props.name}
                            />
                            </div>
                    }
                </Nav.Item>
            </Nav>
            </Navbar>
            
        </Container>
        )
    }
}

function mapStateToProps ({authedUser,users}){
    const user  = users[authedUser]
    return {
        user,
        authedUser
    }
   
}

export default connect (mapStateToProps) (NavBar)