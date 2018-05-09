import React,{Component} from 'react';
import styles from './Navigate.scss';
import classNames from 'classnames/bind';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
import * as actions from '../../../actions';
import { connect } from 'react-redux';
import Cookies from 'js-cookie';
import { AuthApi } from '../../../api';

const cx = classNames.bind(styles);

class Navigate extends Component{
  logout = () => {
    AuthApi.destroyAuth();
    Cookies.remove('token');
    this.props.onLogout();
  }
  render(){
    const { magazine, news, startup, discussion, data } = this.props;
    const { user } = this.props.user;
    const redirect = "/admin"
    const token = Cookies.get('token')
    return (
      <nav className={cx('navigator')}>
        <h1 className={cx('navTitle')}>PAGE ADMIN</h1>
        {token && Object(user).admin === true ?
          <div className={cx('navi')}><Link to="/admin/profile">MANAGER</Link></div>
          :
          null
        }
        {token ?
          <div className={cx('signOut')} onClick={this.logout}>SIGN OUT</div>
          :
          null
        }
        <ul className={cx('navListWrapper')}>
          <li className={magazine ? cx('navList','on') : cx('navList')}>
            <NavLink to={user ? "/admin/magazine" : redirect}>MAGAZINE</NavLink>
          </li>
          <li className={news ? cx('navList','on') : cx('navList')}>
            <NavLink to={user ? "/admin/news" : redirect}>NEWS</NavLink>
          </li>
          <li className={discussion ? cx('navList','on') : cx('navList')}>
            <NavLink to={user ? "/admin/discussion" : redirect}>DISCUSSION</NavLink>
          </li>
          <li className={startup ? cx('navList','on') : cx('navList')}>
            <NavLink to={user ? "/admin/startup" : redirect}>START-UP</NavLink>
          </li>
          <li className={data ? cx('navList','on') : cx('navList')}>
            <NavLink to={user ? "/admin/data" : redirect}>DATA</NavLink>
          </li>
        </ul>
      </nav>
    );
  }
}
const mapStateToProps = (state) => ({
  user: state.login
});
const mapDispatchToProps = (dispatch) => ({
  onLogout: () => dispatch(actions.adminLogout())
})
export default connect(mapStateToProps, mapDispatchToProps)(Navigate);
