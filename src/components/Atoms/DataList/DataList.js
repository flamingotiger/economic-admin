import React, { Component } from 'react';
import styles from './DataList.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);
class DataList extends Component{
  constructor(props){
    super(props);
    this.state={
      check:false,
    }
  }
  handleCheck = (e) => {
    this.setState((prevState) => ({check: !prevState.check}))
  }
  render(){
    const {check} = this.state;
    const {idx, openmenu, menu, img, publish, title, reporter, magazine} = this.props;
    if(magazine){
      return (
        <div className={cx('newsList')} id={idx}>
          <div className={cx('listCheck')}>
            <label htmlFor={`newsListCheck${idx}`}>
              <input type="radio" name="listradio" id={`newsListCheck${idx}`} />
              <span></span>
            </label>
          </div>
          <div className={cx('listImg')}>
            <img src={img} alt="img"/>
          </div>
          <div className={cx('listText')}>
            <div className={cx('listTitle')}>{title}</div>
            <div className={cx('listReport')}>
              <span className={cx('first')}>{publish}</span>
              <span className={cx('last')}>{reporter}</span>
            </div>
          </div>
        </div>
      );
    }else{
      return (
        <div className={cx('newsList')}>
          <div className={cx('listCheck')}>
            <label htmlFor={`newsListCheck${idx}`} data-item={idx}>
              <input
                type="checkbox"
                name="datacheck"
                id={`newsListCheck${idx}`}
                checked={ this.props.checkAll ? this.props.checkAll : check }
                onChange={(e) => this.handleCheck(e)}
                />
              <span onClick={openmenu}></span>
            </label>
          </div>
          <Link to={`/admin/add=${menu}/${idx}`}>
            <div className={cx('listImg')}>
              <img src={img} alt="img"/>
            </div>
            <div className={cx('listText')}>
              <div className={cx('listTitle')}>{title}</div>
              <div className={cx('listReport')}>
                <span className={cx('first')}>{publish}</span>
                <span className={cx('last')}>{reporter}</span>
              </div>
            </div>
          </Link>
        </div>
      );
    }
  }
}
DataList.defaultProps={
  img:"https://www.studiomoviegrill.com/content/5717ccb4-8773-4712-a32a-8a01f4d6b1f5.jpg",
  title:"PSA forcé d'importer de plus en plus de moteurs made in China",
  publish:"MODIFIÉ  3j",
}

export default DataList;
