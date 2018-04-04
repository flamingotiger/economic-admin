import React,{Component} from 'react';
import styles from './LoginPage.scss';
import classNames from 'classnames/bind';
import { Navigate } from '../../Atoms';
import { connect } from 'react-redux';

const cx = classNames.bind(styles);

class LoginPage extends Component{
  handleSubmit = (e) => {
    e.preventDefault();
  }
  render(){

    const { user } = this.props;
    return (
      user.isLoggedIn ?
      <div>로그인 성공</div>
      :
      <div className={cx('loginPage')}>
        <Navigate />
      <div className={cx('loginFrom')}>
        <form onSubmit={this.handleSubmit}>
          <div className={cx('loginInput')}><input type="text" placeholder="ID" ref={(ref) => { this.id = ref;} }/></div>
          <div className={cx('loginInput')}><input type="password" placeholder="PASSWORD" ref={(ref) => {this.password = ref;}}/></div>
            <button>
              ENTER
            </button>
        </form>
      </div>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {user: state.login}
}
export default connect(mapStateToProps)(LoginPage);
