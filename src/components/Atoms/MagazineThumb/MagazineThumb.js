import React,{Component} from 'react';
import styles from './MagazineThumb.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

class MagazineThumb extends Component{
  render(){
    //type에 따라 style변경
    //type = next border-color:red
    //type = on no-gray
    const {idx, img, year, month, date, type} = this.props;
    return (
      <div className={cx('profileList',`${type}`)}>
        <Link to={`/admin/add=magazine/${idx}`}>
        <div className={cx('label')}>
          <span className={cx('year')}>{year}</span>
          <span className={cx('month')}>{month}</span>
          <span className={cx('date')}>-{date}j</span>
        </div>
        <img src={img} alt="img"/>
        </Link>
      </div>
    );
  }
}
export default MagazineThumb;
