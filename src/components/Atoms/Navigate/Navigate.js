import React,{Component} from 'react';
import styles from './Navigate.scss';
import classNames from 'classnames/bind';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

class Navigate extends Component{
  render(){
    const { adminUser, magazine, news, startup, discussion, data } = this.props;
    return (
      <nav className={cx('navigator')}>
        <h1 className={cx('navTitle')}>PAGE ADMIN</h1>
        {adminUser ?
          <div className={cx('navi')}><Link to="/admin/profile">MANAGER</Link></div>
          : null
        }
        <ul className={cx('navListWrapper')}>
          <li className={magazine ? cx('navList','on') : cx('navList')}><NavLink to="/admin/magazine">MAGAZINE</NavLink></li>
          <li className={news ? cx('navList','on') : cx('navList')}><NavLink to="/admin/news">NEWS</NavLink></li>
          <li className={startup ? cx('navList','on') : cx('navList')}><NavLink to="/admin/startup">START-UP</NavLink></li>
          <li className={discussion ? cx('navList','on') : cx('navList')}><NavLink to="/admin/discussion">DISCUSSION</NavLink></li>
          <li className={data ? cx('navList','on') : cx('navList')}><NavLink to="/admin/data">DATA</NavLink></li>
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

export default Navigate;
