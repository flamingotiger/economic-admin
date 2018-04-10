import React,{Component} from 'react';
import styles from './DataAdminPage.scss';
import classNames from 'classnames/bind';
import { AddListBtn, Navigate, Search, DataList, ListUtil, BtnMenu } from '../../Atoms';

const cx = classNames.bind(styles);

class DataAdminPage extends Component{
  constructor(props){
    super(props);
    this.state={
      keyword:'',
      openMenu:false,
      checkIdx:[],
      listContent:[
        {
          idx:0,
          menu:"data",
          img:"https://visualstudiomagazine.com/~/media/ECG/visualstudiomagazine/Images/introimages/BigData.jpg",
          cate:"",
          date:"",
          subTitle:"GDP OF CHINA",
          publish:"MODIFIÉ  3j",
          reporter:"",
        },
        {
          idx:1,
          menu:"data",
          img:"https://visualstudiomagazine.com/~/media/ECG/visualstudiomagazine/Images/introimages/BigData.jpg",
          cate:"",
          date:"",
          subTitle:"GDP OF CHINA",
          publish:"MODIFIÉ  3j",
          reporter:"",
        },
        {
          idx:2,
          menu:"data",
          img:"https://visualstudiomagazine.com/~/media/ECG/visualstudiomagazine/Images/introimages/BigData.jpg",
          cate:"",
          date:"",
          subTitle:"GDP OF CHINA",
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
      return <DataList
        key={i}
        idx={content.idx}
        img={content.img}
        publish={content.publish}
        subTitle={content.subTitle}
        openmenu={this.openBtnMenu}
        menu={content.menu}
        />
    })
    return listContent
  }
  handleChange = (e) => {this.setState({keyword: e.target.value})}
  render(){
    console.log(this.state.keyword)
    const mapToComponents = (listContent) => {
      //검색하지 않았을때 전부보이기
      if(this.state.keyword === ''){
        this.renderAdminList()
      }
       listContent = listContent.filter((contact) => {
         return contact.subTitle.toLowerCase().indexOf(this.state.keyword) > -1
       });
       return listContent.map((content,i) => {
            return <DataList
              key={i}
              idx={content.idx}
              img={content.img}
              publish={content.publish}
              subTitle={content.subTitle}
              openmenu={this.openBtnMenu}
              menu={content.menu}
              />
        });
    };
    const { openMenu, listContent } = this.state;
    return (
      <div className={cx('startupAdminPage')}>
        <AddListBtn menu="data"/>
        <Navigate />
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
export default DataAdminPage;
