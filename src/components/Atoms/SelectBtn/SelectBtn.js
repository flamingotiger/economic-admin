import React, { Component } from 'react';
import styles from './SelectBtn.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

class SelectBtn extends Component{
  constructor(props){
    super(props);
    this.state={}
  }

  render(){
    return (
      <div className={cx('select')}>
        <select onChange={(e) => this.props.sortDate(e.target.value)}>
            <option value="2017-12">2017-12</option>
            <option value="2018-01">2018-01</option>
            <option value="2018-02">2018-02</option>
            <option value="2018-03">2018-03</option>
        </select>
      </div>
    );
  }
}

export default SelectBtn;
