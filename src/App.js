

import React, { Component } from 'react'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import { handleInitialData } from './actions/shared'
import { Container } from 'react-bootstrap'
import LogIn from './components/LogIn';
import Leaderboard from './components/Leaderboard';
import Questions from './components/Questions';
import NewPoll from './components/NewPoll';
import {connect} from 'react-redux'
import UsersDetails from './components/UsersDetails';
import NoMatch from './components/NoMatch';
import QuestionDetails from './components/QuestionDetails';



 class App extends Component {
  componentDidMount(){
    this.props.dispatch(handleInitialData())
  }
  render() {
    return (
      <Router>
      <Container>
      { !this.props.authedUser
        ? <Switch>
        <Route path="/" component={LogIn} />
        </Switch>
        : <>
            <Switch>
            <Route exact path='/' component={LogIn}/>
            <Route exact path='/leader-board' component={Leaderboard}/>
            <Route exact path ='/users' component={UsersDetails}/>
            <Route exact path ='/questions' component= {Questions}/>
            <Route exact path='/questions/:id' component={QuestionDetails}/>
            <Route exact path ='/add' component= {NewPoll}/>
            <Route exact path = '/nomatch' component={NoMatch}/>
          </Switch>  
          </>

      }
      </Container>
      </Router>
    )
  }
}

function mapStateToProps({authedUser}){
  return {
    authedUser
  }
}



export default connect(mapStateToProps) (App);
