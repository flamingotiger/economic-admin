import React,{Component} from 'react';
import styles from './DiscussionList.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

class DiscussionList extends Component{
  render(){
    const {
      idx, img, title1, title2, year, month,
      publish1, reporter1, publish2, reporter2,
      openmenu
    } = this.props;
    return (
      <div className={cx('discussionList')} id={idx}>
        <div className={cx('listCheck')}>
          <label htmlFor={`newsListCheck${idx}`}>
            <input type="checkbox" id={`newsListCheck${idx}`} />
            <span onClick={openmenu}></span>
          </label>
        </div>
        <Link to={`/admin/add:${this.props.menu}`}>
        <div className={cx('listImg')}>
          <img src={img} alt="img"/>
          <div className={cx('label')}>
            <span className={cx('year')}>{year}</span>
            <span className={cx('month')}>{month}</span>
          </div>
        </div>
        <div className={cx('listText')}>
          <div className={cx('topText')}>
            <div className={cx('listTitle')}>{title1}</div>
            <div className={cx('listReport')}>
              <span className={cx('first')}>{publish1}</span>
              <span className={cx('last')}>{reporter1}</span>
            </div>
          </div>
          <div className={cx('bottomText')}>
            <div className={cx('listTitle')}>{title2}</div>
            <div className={cx('listReport')}>
              <span className={cx('first')}>{publish2}</span>
              <span className={cx('last')}>{reporter2}</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
    );
  }
}
DiscussionList.defaultProps={
  img:"https://www.studiomoviegrill.com/content/5717ccb4-8773-4712-a32a-8a01f4d6b1f5.jpg",
  title1:"PSA forcé d'importer de plus en plus de moteurs made in China",
  title2:"PSA forcé d'importer de plus en plus de moteurs made in China",
  year:"2018",
  month:"OCTOBER",
  publish1:"MODIFIÉ  3j",
  reporter1:"Redigé par KIM",
  publish2:"MODIFIÉ  3j",
  reporter2:"Redigé par KIM"
}

export default DiscussionList;
