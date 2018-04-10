import React,{Component} from 'react';
import styles from './NewsAdminPage.scss';
import classNames from 'classnames/bind';
import { AddListBtn, Navigate, Search, AdminList, ListUtil, BtnMenu} from '../../Atoms';

const cx = classNames.bind(styles);

class NewsAdminPage extends Component{
  constructor(props){
    super(props);
    this.state={
      keyword:'',
      openMenu:false,
      checkIdx:[],
      listContent:[
        {
          idx:0,
          menu:"news",
          img:"https://www.studiomoviegrill.com/content/5717ccb4-8773-4712-a32a-8a01f4d6b1f5.jpg",
          cate:"Economic",
          date:"2017.11.27",
          subTitle:"PSA forcé d'importer de plus en plus de moteurs made in China",
          publish:"MODIFIÉ  3j",
          reporter:"Redigé par KIM",
        },
        {
          idx:1,
          menu:"news",
          img:"https://www.studiomoviegrill.com/content/5717ccb4-8773-4712-a32a-8a01f4d6b1f5.jpg",
          cate:"Economic",
          date:"2017.11.27",
          subTitle:"PSA forcé d'importer de plus en plus de moteurs made in China",
          publish:"MODIFIÉ  3j",
          reporter:"Redigé par KIM",
        },
        {
          idx:2,
          menu:"news",
          img:"https://www.studiomoviegrill.com/content/5717ccb4-8773-4712-a32a-8a01f4d6b1f5.jpg",
          cate:"Economic",
          date:"2017.11.27",
          subTitle:"PSA forcé d'importer de plus en plus de moteurs made in China",
          publish:"MODIFIÉ  3j",
          reporter:"Redigé par KIM",
        },
        {
          idx:3,
          menu:"news",
          img:"https://www.studiomoviegrill.com/content/5717ccb4-8773-4712-a32a-8a01f4d6b1f5.jpg",
          cate:"Economic",
          date:"2017.11.27",
          subTitle:"PSA forcé d'importer de plus en plus de moteurs made in China",
          publish:"MODIFIÉ  3j",
          reporter:"Redigé par KIM",
        }
      ]
    }
    this.closeBtnMenu = this.closeBtnMenu.bind(this);
    this.openBtnMenu = this.openBtnMenu.bind(this);
    this.removeBtn = this.removeBtn.bind(this);
    this.menuToggle = this.menuToggle.bind(this);
  }
  closeBtnMenu(){ this.setState({ openMenu:false })}
  menuToggle(){ this.setState({ openMenu:!this.state.openMenu })}
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
  handleChange = (e) => {this.setState({keyword: e.target.value})}
  render(){
    const mapToComponents = (listContent) => {
      //검색하지 않았을때 전부보이기
      if(this.state.keyword === ''){
        this.renderAdminList()
      }
       listContent = listContent.filter((contact) => {
         return contact.subTitle.toLowerCase().indexOf(this.state.keyword) > -1
       });
       return listContent.map((content,i) => {
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
        });
    };
    const { openMenu, listContent } = this.state;
    return (
      <div className={cx('newsAdminPage')}>
        <AddListBtn menu="news"/>
        <Navigate />
          <div className={cx('newsWrapper')}>
            <Search handleChange={(e) => this.handleChange(e)}/>
            <ListUtil menuToggle={this.menuToggle}/>
            {mapToComponents(listContent)}
            <BtnMenu openMenu={openMenu} closeBtnMenu={this.closeBtnMenu}/>
          </div>
      </div>
    )
  }
}
export default NewsAdminPage;
