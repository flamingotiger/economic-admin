import React,{Component} from 'react';
import styles from './DiscussionAdminPage.scss';
import classNames from 'classnames/bind';
import { AddListBtn, Navigate, Search, DiscussionList, ListUtil, BtnMenu } from '../../Atoms';

const cx = classNames.bind(styles);

class DiscussionAdminPage extends Component{
  constructor(props){
    super(props);
    this.state={
      keyword:'',
      openMenu:false,
      checkIdx:[],
      listContent:[
        {
          idx:0,
          menu:"discussion",
          img:"https://i.ndtvimg.com/i/2017-02/group-discussion_650x400_71487508322.jpg",
          cate:"Automobile",
          year:"2018",
          month:"OCTOBER",
          title1:"PSA forcé d'importer de plus en plus de moteurs made in China",
          title2:"PSA forcé d'importer de plus en plus de moteurs made in China",
          publish1:"MODIFIÉ  3j",
          reporter1:"Redigé par KIM",
          publish2:"MODIFIÉ  3j",
          reporter2:"Redigé par KIM",
        },
        {
          idx:1,
          menu:"discussion",
          img:"https://i.ndtvimg.com/i/2017-02/group-discussion_650x400_71487508322.jpg",
          cate:"Automobile",
          year:"2018",
          month:"OCTOBER",
          title1:"PSA forcé d'importer de plus en plus de moteurs made in China",
          title2:"PSA forcé d'importer de plus en plus de moteurs made in China",
          publish1:"MODIFIÉ  3j",
          reporter1:"Redigé par KIM",
          publish2:"MODIFIÉ  3j",
          reporter2:"Redigé par KIM",
        },
        {
          idx:2,
          menu:"discussion",
          img:"https://i.ndtvimg.com/i/2017-02/group-discussion_650x400_71487508322.jpg",
          cate:"Automobile",
          year:"2018",
          month:"OCTOBER",
          title1:"PSA forcé d'importer de plus en plus de moteurs made in China",
          title2:"PSA forcé d'importer de plus en plus de moteurs made in China",
          publish1:"MODIFIÉ  3j",
          reporter1:"Redigé par KIM",
          publish2:"MODIFIÉ  3j",
          reporter2:"Redigé par KIM",
        }
      ]

    }
    this.closeBtnMenu = this.closeBtnMenu.bind(this);
    this.openBtnMenu = this.openBtnMenu.bind(this);
    this.removeBtn = this.removeBtn.bind(this);
    this.menuToggle = this.menuToggle.bind(this);
  }
  closeBtnMenu(){this.setState({ openMenu:false })}
  menuToggle(){this.setState({ openMenu:!this.state.openMenu })}
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
      return <DiscussionList
        key={i}
        idx={content.idx}
        img={content.img}
        cate={content.cate}
        year={content.year}
        month={content.month}
        title1={content.title1}
        publish1={content.publish1}
        reporter1={content.reporter1}
        title2={content.title2}
        publish2={content.publish2}
        reporter2={content.reporter2}
        openmenu={this.openBtnMenu}
        menu={content.menu}
        />
    })
    return listContent
  }
  handleChange = (e) => {this.setState({keyword: e.target.value})}
  render(){
    const mapToComponents = (listContent) => {
      if(this.state.keyword === ''){
          this.renderAdminList()
      }
       listContent = listContent.filter((contact) => {
         return contact.title1.toLowerCase().indexOf(this.state.keyword) > -1
       });
       return listContent.map((content,i) => {
            return <DiscussionList
              key={i}
              idx={content.idx}
              img={content.img}
              cate={content.cate}
              year={content.year}
              month={content.month}
              title1={content.title1}
              publish1={content.publish1}
              reporter1={content.reporter1}
              title2={content.title2}
              publish2={content.publish2}
              reporter2={content.reporter2}
              openmenu={this.openBtnMenu}
              menu={content.menu}
              />
        });
    };
    const { openMenu, listContent } = this.state;
    return (
      <div className={cx('startupAdminPage')}>
        <AddListBtn menu="discussion"/>
        <Navigate discussion="discussion"/>
          <div className={cx('startupWrapper')}>
            <Search handleChange={(e) => this.handleChange(e)}/>
            <ListUtil menuToggle={this.menuToggle}/>
            {mapToComponents(listContent)}
            <BtnMenu openMenu={openMenu} closeBtnMenu={this.closeBtnMenu}/>
          </div>
      </div>
    )
  }
}
export default DiscussionAdminPage;
