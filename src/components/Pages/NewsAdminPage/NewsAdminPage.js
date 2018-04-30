import React,{Component} from 'react';
import styles from './NewsAdminPage.scss';
import classNames from 'classnames/bind';
import { AddListBtn, Navigate, Search, AdminList, ListUtil, BtnMenu, SelectBtn} from '../../Atoms';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getApi, deleteApi } from '../../../api';
import { NewsApi } from '../../../api';

const cx = classNames.bind(styles);

class NewsAdminPage extends Component{
  constructor(props){
    super(props);
    this.state={
      keyword:'',
      openMenu:false,
      checkIdx:[],
      news:[],
      checkAll:false
    }
    this.closeBtnMenu = this.closeBtnMenu.bind(this);
    this.openMenu = this.openMenu.bind(this);
    this.removeBtn = this.removeBtn.bind(this);
    this.menuToggle = this.menuToggle.bind(this);
  }
  closeBtnMenu(){ this.setState({ openMenu:false })}
  //검색시 인덱스 초기화
  handleChange = (e) => {this.setState({keyword: e.target.value, checkIdx:[] })}
  //ListUtil연결
  menuToggle(){ this.setState({ openMenu:!this.state.openMenu })}
  listCheckAll = (e) => {
    const {news, checkAll, keyword } = this.state
    this.setState((prevState) => ({checkAll: !prevState.checkAll}))
      if(!checkAll){
        const srch = news.filter((contact) => {
          return contact.subTitle.toLowerCase().indexOf(keyword) > -1
        });
        if(keyword === ""){
          this.setState({checkIdx:news.map(content => content.idx), openMenu:true})
        }else{
          this.setState({checkIdx:srch.map(content => content.idx), openMenu:true})
        }
      }else{
        this.setState({checkIdx:[], openMenu:false })
      }
    }
  //버튼 클릭시 check된것가져오고 삭제 메뉴열기
  openMenu(e){
    const check = Number(e.target.parentNode.getAttribute('data-item'))
    const checked = e.target.previousSibling.checked

    const checkIdx = this.state.checkIdx.concat(check)
    const delCheckIdx = this.state.checkIdx.filter(value => value !== check)

    if(!checked){
      this.setState({
        openMenu:true,
        checkIdx:checkIdx
      })
    }else{
      this.setState({
        openMenu:false,
        checkIdx:delCheckIdx
       })
    }
  }
  removeBtn(){
    //체크한 리스트 인덱스 값들 ${checkIdx} ex) [0,2,4,5,6,7]
    const checkIdx = this.state.checkIdx;
    checkIdx.map((remove) => (
      deleteApi(remove)
    ))
  }
  renderAdminList = () => {
    const news = this.state.news.map((content,i) => {
      return <AdminList
        key={i}
        idx={content.idx}
        img={content.img}
        cate={content.cate}
        publish={content.publish}
        date={content.date}
        subTitle={content.subTitle}
        reporter={content.reporter}
        openmenu={this.openMenu}
        menu={content.menu}
        checkAll={this.state.checkAll}
        />
    })
    return news
  }
  componentDidMount(){
    getApi().then(res => this.setState({news: res.data.news}))
    NewsApi.listNews().then(res => console.log(res))
  }
  render(){
    const { user } = this.props;
    if(!user.isLoggedIn) {
      return (
        <Redirect to="/admin"/>
      );
    }
    /*
    if(!user.user.newsManage){
      return (
        <Redirect to="/admin"/>
      );
    }
    */
    const mapToComponents = (news) => {
      if(this.state.keyword === ''){
        //검색하지 않았을때 전부보이기
        this.renderAdminList()
      }
       news = news.filter((contact) => {
         return contact.subTitle.toLowerCase().indexOf(this.state.keyword) > -1
       });
       return news.map((content,i) => {
            return <AdminList
              key={i}
              idx={content.idx}
              img={content.img}
              cate={content.cate}
              publish={content.publish}
              date={content.date}
              ftitle={content.f_title}
              reporter={content.reporter}
              openmenu={this.openMenu}
              menu={content.menu}
              checkAll={this.state.checkAll}
              />
        });
    };
    const { openMenu, news } = this.state;
    return (
      <div className={cx('newsAdminPage')}>
        <AddListBtn menu="news"/>
        <Navigate news="news"/>
          <div className={cx('newsWrapper')}>
            <div className={cx('search')}>
              <div className={cx('selectBtn')}><SelectBtn /></div>
              <div className={cx('searchBox')}><Search handleChange={(e) => this.handleChange(e)}/></div>
            </div>
            <ListUtil menuToggle={this.menuToggle} listCheckAll={this.listCheckAll}/>
            {mapToComponents(news)}
            <BtnMenu
              openMenu={openMenu}
              closeBtnMenu={this.closeBtnMenu}
              removeBtn={this.removeBtn}
            />
          </div>
      </div>
    )
  }
}
const mapStateToProps = (state) => ({
  user: state.login
});
export default connect(mapStateToProps)(NewsAdminPage);
