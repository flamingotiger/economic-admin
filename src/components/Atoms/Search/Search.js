import React,{Component} from 'react';
import styles from './Search.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

class Search extends Component{
  render(){
    return (
      <div className={cx('search')}>
        <input type="text" placeholder="SEARCH"/>
      </div>
    );
  }
}

export default Search;
