import React,{Component} from 'react';
import styles from './MagazineThumb.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

class MagazineThumb extends Component{
  render(){
    //idx에 따라 style변경
    //idx = next border-color:red
    //idx = on no-gray
    const {idx, year, month, date} = this.props;
    return (
      <div className={cx('profileList',`${idx}`)}>
        <Link to="/admin/addmagazine">
        <div className={cx('label')}>
          <span className={cx('year')}>{year}</span>
          <span className={cx('month')}>{month}</span>
          <span className={cx('date')}>-{date}j</span>
        </div>
        <img src="http://cfile30.uf.tistory.com/image/1328B84C5096712A020554" alt="img"/>
        </Link>
      </div>
    );
  }
}
export default MagazineThumb;
