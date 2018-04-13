import React,{Component} from 'react';
import styles from './DataList.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

class DataList extends Component{
  render(){
    return (
      <div className={cx('newsList')} id={this.props.idx}>
        <div className={cx('listCheck')}>
          <label htmlFor={`newsListCheck${this.props.idx}`}>
            <input type="checkbox" id={`newsListCheck${this.props.idx}`} />
            <span onClick={this.props.openmenu}></span>
          </label>
        </div>
        <Link to={`/admin/add=${this.props.menu}`}>
          <div className={cx('listImg')}>
            <img src={this.props.img} alt="img"/>
          </div>
          <div className={cx('listText')}>
            <div className={cx('listTitle')}>{this.props.title}</div>
            <div className={cx('listReport')}>
              <span className={cx('first')}>{this.props.publish}</span>
              <span className={cx('last')}>{this.props.reporter}</span>
            </div>
          </div>
        </Link>
      </div>
    );
  }
}
DataList.defaultProps={
  img:"https://www.studiomoviegrill.com/content/5717ccb4-8773-4712-a32a-8a01f4d6b1f5.jpg",
  title:"PSA forcé d'importer de plus en plus de moteurs made in China",
  publish:"MODIFIÉ  3j",
}

export default DataList;
