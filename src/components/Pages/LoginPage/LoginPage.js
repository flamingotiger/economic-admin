import React,{Component} from 'react';
import styles from './LoginPage.scss';
import classNames from 'classnames/bind';
import { Navigate } from '../../Atoms';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actions from '../../../actions';
import Cookies from 'universal-cookie';

const cx = classNames.bind(styles);

class LoginPage extends Component{
  constructor(props){
    super(props);
    this.state={
      id:'',
      pw:''
    }
    this.idHandleChange = this.idHandleChange.bind(this);
    this.pwHandleChange = this.pwHandleChange.bind(this);
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const pw = this.password.value
    if(pw.length < 4){
      alert('More password!')
      return false;
    }
    const cookies = new Cookies();
    cookies.set('token', 'HELLO_TOKEN_VALUE~',{ path: '/admin'});
    this.props.onLogin()
  }
  idHandleChange(e){
    this.setState({id:e.target.value})
  }
  pwHandleChange(e){
    this.setState({pw:e.target.value})
  }
  render(){
    const { user } = this.props;
    if(user.isLoggedIn) {
      console.log(user.isLoggedIn)
      return (
        <Redirect to="/admin/magazine"/>
      );
    }
    return (
      <div className={cx('loginPage')}>
        <Navigate />
      <div className={cx('loginFrom')}>
        <form onSubmit={ e => this.handleSubmit(e) }>
          <div className={cx('loginInput')}>
            <input
              type="email"
              placeholder="ID"
              ref={ref => this.id = ref }
              value={this.state.id}
              onChange={this.idHandleChange}
            />
          </div>
          <div className={cx('loginInput')}>
            <input
              type="password"
              placeholder="PASSWORD"
              ref={ref => this.password = ref}
              value={this.state.pw}
              onChange={this.pwHandleChange}
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
  onLogin : () => dispatch(actions.adminLogin())
})
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
