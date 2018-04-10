import React,{Component} from 'react';
import styles from './Navigate.scss';
import classNames from 'classnames/bind';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const cx = classNames.bind(styles);

class Navigate extends Component{
  constructor(props){
    super(props);
    this.state={
      user : this.props.user.isLoggedIn
    }
  }

  render(){
    const { magazine, news, startup, discussion, data } = this.props;
    const { user } = this.state;
    const redirect = "/admin"
    return (
      <nav className={cx('navigator')}>
        <h1 className={cx('navTitle')}>PAGE ADMIN</h1>
        {user ?
          <div className={cx('navi')}><Link to="/admin/profile">MANAGER</Link></div>
          : null
        }
        <ul className={cx('navListWrapper')}>
          <li className={magazine ? cx('navList','on') : cx('navList')}><NavLink to={user ? "/admin/magazine" : redirect}>MAGAZINE</NavLink></li>
          <li className={news ? cx('navList','on') : cx('navList')}><NavLink to={user ? "/admin/news" : redirect}>NEWS</NavLink></li>
          <li className={startup ? cx('navList','on') : cx('navList')}><NavLink to={user ? "/admin/startup" : redirect}>START-UP</NavLink></li>
          <li className={discussion ? cx('navList','on') : cx('navList')}><NavLink to={user ? "/admin/discussion" : redirect}>DISCUSSION</NavLink></li>
          <li className={data ? cx('navList','on') : cx('navList')}><NavLink to={user ? "/admin/data" : redirect}>DATA</NavLink></li>
        </ul>
      </nav>
    );
  }
}
Navigate.defaultProps = {
  adminUser: true,
  magazine: false,
  news: false,
  startup: false,
  discussion: false,
  data: false
}
const mapStateToProps = (state) => ({
  user: state.login
});
export default connect(mapStateToProps)(Navigate);
