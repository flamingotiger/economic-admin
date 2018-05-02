import React, { Component } from 'react';
//components
import {
  LoginPage,
  ProfilePage,
  NewsAdminPage,
  MagazineAdminPage,
  StartUpAdminPage,
  DiscussionAdminPage,
  DataAdminPage,
  AddMagazine,
  NotAllow,
  AddPage
} from './components/Pages';
// Router
import { BrowserRouter as Router, Route, BrowserRouter, Switch } from 'react-router-dom';
//redux
import { connect } from 'react-redux';
import * as actions from './actions';
import { AuthApi, UserApi } from './api';
import token from './api/token';

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      user:''
    }
  }
  //새로고침했을때 token 있으면 로그인 없으면 로그아웃
  initializeUserInfo = () => {
       if(token){
         this.props.onLogin()
       }else{
         AuthApi.destroyAuth()
         this.props.onLogout();
       }
   }
   componentWillMount(){ this.initializeUserInfo();}
   componentDidMount() {
     if(token){
       UserApi.getUser(token, 'me').then(res => this.props.onLogin(res.data.user))
     }
   }
  render() {
    return (
      <BrowserRouter>
        <Router>
          <Switch>
            <Route exact path="/admin" component={LoginPage}/>
            <Route exact path="/admin/magazine" component={MagazineAdminPage}/>
            <Route exact path="/admin/profile" component={ProfilePage}/>
            <Route exact path="/admin/news" component={NewsAdminPage}/>
            <Route exact path="/admin/startup" component={StartUpAdminPage}/>
            <Route exact path="/admin/discussion" component={DiscussionAdminPage}/>
            <Route exact path="/admin/data" component={DataAdminPage}/>
            <Route exact path="/admin/add=magazine" component={AddMagazine}/>
            <Route exact path="/admin/add=magazine/:idx" component={AddMagazine}/>
            <Route exact path="/admin/addmagazine" component={AddMagazine}/>
            <Route exact path="/admin/add" component={AddPage}/>
            <Route exact path="/admin/add:menu" component={AddPage}/>
            <Route exact path="/admin/add:menu/:idx" component={AddPage}/>
            <Route component={NotAllow}/>
          </Switch>
        </Router>
      </BrowserRouter>
    );
  }
}
const mapStateToProps = (state) => ({
  user: state.login
});
const mapDispatchToProps = (dispatch) => ({
  onLogin : (user) => dispatch(actions.adminLogin(user)),
  onLogout: () => dispatch(actions.adminLogout())
})
export default connect(mapStateToProps, mapDispatchToProps)(App);
