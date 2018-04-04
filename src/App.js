import React, { Component } from 'react';
import {
  LoginPage,
  ProfilePage,
  NewsAdminPage,
  MagazinePage,
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
import { createStore } from 'redux';
import reducers from './reducers';
import { Provider } from 'react-redux';


const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      adminUser:true,
      login:true
    }
  }
  render() {
    const {adminUser, login} = this.state
    return (
      <Provider store={store}>
      <BrowserRouter>
        <Router>
          <div className="App">
            <div className="App-intro">
              <Switch>
                {login ? //로그인했나?
                    adminUser ?  //관리자인가?
                      <Route exact path="/admin/profile" component={ProfilePage}/>
                      :
                      <Route exact path="/admin/news" component={NewsAdminPage}/>
                  :
                  <Route exact path="/admin/login" component={LoginPage}/>
                }
                <Route exact path="/admin" component={LoginPage}/>
                <Route exact path="/admin/magazine" component={MagazinePage}/>
                <Route exact path="/admin/news" component={NewsAdminPage}/>
                <Route exact path="/admin/startup" component={StartUpAdminPage}/>
                <Route exact path="/admin/discussion" component={DiscussionAdminPage}/>
                <Route exact path="/admin/data" component={DataAdminPage}/>
                <Route exact path="/admin/addmagazine" component={AddMagazine}/>
                <Route exact path="/admin/add" component={AddPage}/>
                <Route exact path="/admin/add:menu" component={AddPage}/>
                <Route component={NotAllow}/>
              </Switch>
            </div>
          </div>
        </Router>
      </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
