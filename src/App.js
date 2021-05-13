

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
      {/* <LoadingBar style={{ backgroundColor: 'blue', height: '1px' }} /> */}
          <Switch>
           { !this.props.loggedinUser && <Route exact path='/' component={UsersDetails}/>}
            <Route exact path='/login' component={LogIn} />
            <Route exact path='/leader-board' component={Leaderboard}/>
            <Route exact path ='/questions' component= {Questions}/>
            <Route exact path='/questions/:id' component={QuestionDetails}/>
            <Route exact path ='/add' component= {NewPoll}/>
            <Route exact path = '/nomatch' component={NoMatch}/>
          </Switch>  
      </Container>
      </Router>
    )
  }
}



function mapStateToProps({ autheduser }) {

  return {
    loggedinUser: autheduser === null
  }
}

export default connect(mapStateToProps) (App);
