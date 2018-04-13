import React,{Component} from 'react';
import styles from './MagazineAdminPage.scss';
import classNames from 'classnames/bind';
import { AddListBtn, Navigate, MagazineThumb } from '../../Atoms';

const cx = classNames.bind(styles);

class MagazineAdminPage extends Component{
  render(){
    return (
      <div className={cx('magazine')}>
        <AddListBtn menu="magazine"/>
        <Navigate magazine="magazine" />
        <div className={cx('magazineWrapper')}>
          <MagazineThumb
            idx="next"
            year="2018"
            month="NOVEMBER"
            date="84"
          />
          <MagazineThumb
            idx="next"
            year="2018"
            month="NOVEMBER"
            date="53"
          />
          <MagazineThumb
            idx="next"
            year="2018"
            month="NOVEMBER"
            date="23"
          />
          <MagazineThumb
            idx="on"
            year="2018"
            month="NOVEMBER"
            date="10"
          />
          <MagazineThumb
            year="2018"
            month="NOVEMBER"
            date="5"
          />
          <MagazineThumb
            year="2018"
            month="NOVEMBER"
            date="0"
          />
          <MagazineThumb
            year="2018"
            month="NOVEMBER"
            date="-1"
          />
        </div>
      </div>
    )
  }
}
export default MagazineAdminPage;
