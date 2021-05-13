

import { Container ,Row, Col } from 'react-bootstrap';
import { setAuthedUser  } from '../actions/authedUser';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



 import React, { Component } from 'react'
 
class LogIn extends Component {
    state ={
        username:'',
    }

    handleChange = (e) => {
        this.setState({username:e.target.value})
    }

    handleSubmit = (e)=> {
        e.preventDefault()
        this.props.dispatch(setAuthedUser(this.state.username))
        this.props.history.push('/questions');
        toast.success(`welcome Back ${this.state.username}`)

    }
     render() {
         return (
            <Container>
                <Row>
                    <Col>
                    <h2>Sign in</h2>
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group mt-4">
                            <select value={this.state.username}
                                className='form-control'
                                onChange={this.handleChange}
                            >
                                <option value="">Select a user...</option>
                                { this.props.users.map(user => (<option key={user.id} value={user.id} >{user.name}</option>))}
                            </select>
                            <button className=' btn btn-success rounded mt-3'>Login</button>
                            </div>
                        </form>
                    </Col>
                </Row>
            </Container>
         )
     }
 }

 function mapStateToProps({ users, authedUser }) {
	return {
        users: Object.keys(users).map(userId => users[userId]),
        authedUser : users[authedUser],
       
	}
}
 

export default connect (mapStateToProps) (LogIn)
