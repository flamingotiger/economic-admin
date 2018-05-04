import React,{Component} from 'react';
import styles from './LoginPage.scss';
import classNames from 'classnames/bind';
import { Navigate } from '../../Atoms';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actions from '../../../actions';
import Cookies from 'js-cookie';
import { AuthApi, UserApi } from '../../../api';

const cx = classNames.bind(styles);

class LoginPage extends Component{
  constructor(props){
    super(props);
    this.state={
      email:'admin@eco.com',
      password:'password',
      token:'',
      auth:null,
    }
  }
 handleSubmit = async (e) => {
    e.preventDefault();
    const { password, email } = this.state;
    const body = {"email": email, "password": password}
    await AuthApi.createAuth(body)
    .then(res => {
        if(res.statusText === "OK"){
          this.setState({ token: res.data.auth.token });
          Cookies.set('token', this.state.token);
        }
      }
    )
    await UserApi.getUser('me').then(res => this.setState({ user: res.data.user}))
    await this.props.onLogin(this.state.user)
  }
  render(){
    const { user } = this.props;
    if(user.isLoggedIn) {
      return (
        <Redirect to="/admin/news"/>
      );
    }
    return (
      <div className={cx('loginPage')}>
        <Navigate />
        <div className={cx('loginFrom')}>
          <form onSubmit={ (e) => this.handleSubmit(e) }>
            <div className={cx('loginInput')}>
              <input
                type="email"
                placeholder="ID"
                value={this.state.email}
                onChange={(e) => this.setState({email:e.target.value})}
              />
            </div>
            <div className={cx('loginInput')}>
              <input
                type="password"
                placeholder="PASSWORD"
                value={this.state.password}
                onChange={(e) => this.setState({password:e.target.value})}
              />
            </div>
              <button>
                ENTER
              </button>
          </form>
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state) => ({
  user: state.login
})
const mapDispatchToProps = (dispatch) => ({
  onLogin : (user) => dispatch(actions.adminLogin(user)),
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
