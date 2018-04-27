import React,{Component} from 'react';
import styles from './MagazineAdminPage.scss';
import classNames from 'classnames/bind';
import { AddListBtn, Navigate, MagazineThumb } from '../../Atoms';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

const cx = classNames.bind(styles);

class MagazineAdminPage extends Component{
  constructor(){
    super();
    this.state={
      thumb:[
          {
            idx:"9",
            img:"http://cfile30.uf.tistory.com/image/1328B84C5096712A020554",
            year:"2018",
            month:"NOVEMBER",
            date:"84",
            type:"next"
          },
          {
            idx:"8",
            img:"http://cfile30.uf.tistory.com/image/1328B84C5096712A020554",
            year:"2018",
            month:"NOVEMBER",
            date:"84",
            type:"next"
          },
          {
            idx:"7",
            img:"http://cfile30.uf.tistory.com/image/1328B84C5096712A020554",
            year:"2018",
            month:"NOVEMBER",
            date:"84",
            type:"next"
          },
          {
            idx:"6",
            img:"http://cfile30.uf.tistory.com/image/1328B84C5096712A020554",
            year:"2018",
            month:"NOVEMBER",
            date:"10",
            type:"on"
          },
          {
            idx:"5",
            img:"http://cfile30.uf.tistory.com/image/1328B84C5096712A020554",
            year:"2018",
            month:"NOVEMBER",
            date:"-1",
            type:"off"
          },
          {
            idx:"4",
            img:"http://cfile30.uf.tistory.com/image/1328B84C5096712A020554",
            year:"2018",
            month:"NOVEMBER",
            date:"-1",
            type:"off"
          },
          {
            idx:"3",
            img:"http://cfile30.uf.tistory.com/image/1328B84C5096712A020554",
            year:"2018",
            month:"NOVEMBER",
            date:"-1",
            type:"off"
          },
          {
            idx:"2",
            img:"http://cfile30.uf.tistory.com/image/1328B84C5096712A020554",
            year:"2018",
            month:"NOVEMBER",
            date:"-1",
            type:"off"
          },
          {
            idx:"1",
            img:"http://cfile30.uf.tistory.com/image/1328B84C5096712A020554",
            year:"2018",
            month:"NOVEMBER",
            date:"-1",
            type:"off",
          },
          {
            idx:"0",
            img:"http://cfile30.uf.tistory.com/image/1328B84C5096712A020554",
            year:"2018",
            month:"NOVEMBER",
            date:"-1",
            type:"off"
          }
      ]
    }
  }
  render(){
    const { user } = this.props;
    if(!user.isLoggedIn) {
      return (
        <Redirect to="/admin"/>
      );
    }
    return (
      <div className={cx('magazine')}>
        <AddListBtn menu="magazine"/>
        <Navigate magazine="magazine" />
        <div className={cx('magazineWrapper')}>
          {this.state.thumb.map((list, i) =>
              <MagazineThumb
                key={i}
                idx={list.idx}
                img={list.img}
                year={list.year}
                month={list.month}
                date={list.date}
                type={list.type}
              />
          )}
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state) => ({
  user: state.login
});
export default connect(mapStateToProps)(MagazineAdminPage);
