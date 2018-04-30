import React,{Component} from 'react';
import styles from './NotAllow.scss';
import classNames from 'classnames/bind';
import { Navigate } from '../../Atoms';

const cx = classNames.bind(styles);

class NotAllow extends Component{
  constructor(props){
    super(props);
    this.state={}
  }
  render(){
    return (
      <div className={cx('notAllowPage')}>
        <Navigate />
      <div className={cx('notAllow')}>
        This page is not allowed.
      </div>
      </div>
    )
  }
}

export default NotAllow;
