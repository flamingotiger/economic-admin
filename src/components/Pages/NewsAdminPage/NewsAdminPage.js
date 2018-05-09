import React,{Component} from 'react';
import styles from './NewsAdminPage.scss';
import classNames from 'classnames/bind';
import { AddListBtn, Navigate, Search, AdminList, ListUtil, BtnMenu, SelectBtn} from '../../Atoms';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { NewsApi } from '../../../api';

const cx = classNames.bind(styles);

class NewsAdminPage extends Component{
  constructor(props){
    super(props);
    this.state={
      keyword:'',
      openMenu:false,
      checkId:[],
      checkAll:false,

      newses:[]
    }

  }

  closeBtnMenu = () => { this.setState({ openMenu:false })}

  handleChange = (e) => {this.setState({keyword: e.target.value, checkId:[] })}

  menuToggle = () => { this.setState({ openMenu:!this.state.openMenu })}

  listCheckAll = (e) => {
    const { newses, checkAll, keyword } = this.state
    this.setState((prevState) => ({checkAll: !prevState.checkAll}))
      if(!checkAll){
        const srch = newses.filter((contact) => {
          return contact.title.toLowerCase().indexOf(keyword) > -1
        });
        if(keyword === ""){
          this.setState({checkId:newses.map(content => content._id), openMenu:true})
        }else{
          this.setState({checkId:srch.map(content => content._id), openMenu:true})
        }
      }else{
        this.setState({checkId:[], openMenu:false })
      }
    }

  //버튼 클릭시 check된것가져오고 삭제 메뉴열기
  openMenu = (e) => {
    const check = e.target.parentNode.getAttribute('data-item')
    const checked = e.target.previousSibling.checked
    const checkId = this.state.checkId.concat(check)
    const delcheckId = this.state.checkId.filter(value => value !== check)


    if(!checked){
      this.setState({
        openMenu:true,
        checkId:checkId
      })
    }else{
      this.setState({
        openMenu:false,
        checkId:delcheckId
       })
    }
  }

  removeBtn = () => {
    //체크한 리스트 인덱스 값들 ${checkId} ex) [0,2,4,5,6,7]
    const checkId = this.state.checkId;
    console.log(checkId)
    /*checkId.map((remove) => (
      NewsApi.deleteNews(remove).then(res => console.log(res))
    ))
    */
  }

  renderAdminList = () => {
    const news = this.state.newses.map((content,i) => {
      return <AdminList
        key={i}
        id={content._id}
        image={content.images[0]}
        sector={content.sector}
        publish={content.publish}
        date={content.date}
        updatedAt={content.updatedAt}
        title={content.title}
        reporter={content.authors[0]}
        openmenu={this.openMenu}
        menu={content.menu}
        checkAll={this.state.checkAll}
        />
    })
    return news
  }

  sortDate = (date) => {
    NewsApi.listNews(`?date=${date}`).then(res => this.setState({ newses: res.data.newses }))
  }

  componentDidMount(){
    NewsApi.listNews(`?sort=-updatedAt`).then(res => this.setState({ newses: res.data.newses }))
  }

  render(){
    const auth = Object(this.props.user.user);
    const { user } = this.props;
    if(!user.isLoggedIn) {
      return (
        <Redirect to="/admin"/>
      );
    }
    if(!auth.newsManager){
      return (
        <Redirect to="/admin/notallow"/>
      );
    }

    const mapToComponents = (newses) => {
      if(this.state.keyword === ''){
        //검색하지 않았을때 전부보이기
        this.renderAdminList()
      }
       newses = newses.filter((contact) => {
         return contact.title.toLowerCase().indexOf(this.state.keyword) > -1
       });
       return newses.map((content,i) => {
            return <AdminList
              key={i}
              id={content._id}
              image={content.images[0]}
              sector={content.sector}
              publish={content.publish}
              date={content.date}
              updatedAt={content.updatedAt}
              title={content.title}
              reporter={content.authors[0]}
              openmenu={this.openMenu}
              menu={content.menu}
              checkAll={this.state.checkAll}
              />
        });
    };

    const { openMenu, newses } = this.state;
    return (
      <div className={cx('newsAdminPage')}>
        <AddListBtn menu="news"/>
        <Navigate news="news"/>
          <div className={cx('newsWrapper')}>
            <div className={cx('search')}>
              <div className={cx('selectBtn')}><SelectBtn sortDate={this.sortDate}/></div>
              <div className={cx('searchBox')}><Search handleChange={(e) => this.handleChange(e)}/></div>
            </div>
            <ListUtil menuToggle={this.menuToggle} listCheckAll={this.listCheckAll}/>
            { mapToComponents(newses) }
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
