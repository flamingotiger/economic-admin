import React,{Component} from 'react';
import styles from './StartUpAdminPage.scss';
import classNames from 'classnames/bind';
import { AddListBtn, Navigate, Search, AdminList, ListUtil, BtnMenu } from '../../Atoms';
const cx = classNames.bind(styles);

class StartUpAdminPage extends Component{
  constructor(props){
    super(props);
    this.state={
      openMenu:false,
      checkIdx:[],
      listContent:[
        {
          idx:0,
          menu:"startup",
          img:"https://i1.sndcdn.com/avatars-000331952894-ntjz65-t500x500.jpg",
          cate:"Automobile",
          date:"",
          subTitle:"DONFENG AUTOMOBILE GROUP",
          publish:"MODIFIÉ  3j",
          reporter:"",
        },
        {
          idx:1,
          menu:"startup",
          img:"https://i1.sndcdn.com/avatars-000331952894-ntjz65-t500x500.jpg",
          cate:"Automobile",
          date:"",
          subTitle:"DONFENG AUTOMOBILE GROUP",
          publish:"MODIFIÉ  3j",
          reporter:"",
        },
        {
          idx:2,
          menu:"startup",
          img:"https://i1.sndcdn.com/avatars-000331952894-ntjz65-t500x500.jpg",
          cate:"Automobile",
          date:"",
          subTitle:"DONFENG AUTOMOBILE GROUP",
          publish:"MODIFIÉ  3j",
          reporter:"",
        }
      ]

    }
    this.closeBtnMenu = this.closeBtnMenu.bind(this);
    this.openBtnMenu = this.openBtnMenu.bind(this);
    this.removeBtn = this.removeBtn.bind(this);
    this.menuToggle = this.menuToggle.bind(this);
  }
  closeBtnMenu(){
    this.setState({
      openMenu:false
    })
  }
  menuToggle(){
    this.setState({
      openMenu:!this.state.openMenu
    })
  }
  openBtnMenu(e){
    const check = Number(e.target.parentNode.parentNode.parentNode.getAttribute('id'))
    this.setState({
      openMenu:true,
      checkIdx:this.state.checkIdx.concat(check)
    })
  }
  removeBtn(){
    console.log(this.state.checkIdx)
    //체크한 리스트 인덱스 값들
  }
  renderAdminList = () => {
    const listContent = this.state.listContent.map((content,i) => {
      return <AdminList
        key={i}
        idx={content.idx}
        img={content.img}
        cate={content.cate}
        publish={content.publish}
        date={content.date}
        subTitle={content.subTitle}
        reporter={content.reporter}
        openmenu={this.openBtnMenu}
        menu={content.menu}
        />
    })
    return listContent
  }
  render(){
    const { openMenu } = this.state;
    return (
      <div className={cx('startupAdminPage')}>
        <AddListBtn menu="startup"/>
        <Navigate />
          <div className={cx('startupWrapper')}>
            <Search />
            <ListUtil menuToggle={this.menuToggle}/>
            {this.renderAdminList()}
            <BtnMenu openMenu={openMenu} closeBtnMenu={this.closeBtnMenu}/>
          </div>
      </div>
    )
  }
}

export default StartUpAdminPage;
