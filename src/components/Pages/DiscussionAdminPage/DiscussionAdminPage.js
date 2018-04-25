import React,{Component} from 'react';
import styles from './DiscussionAdminPage.scss';
import classNames from 'classnames/bind';
import { AddListBtn, Navigate, Search, DiscussionList, ListUtil, BtnMenu, SelectBtn } from '../../Atoms';
import { getApi, deleteApi } from '../../../api';

const cx = classNames.bind(styles);

class DiscussionAdminPage extends Component{
  constructor(props){
    super(props);
    this.state={
      keyword:'',
      openMenu:false,
      checkIdx:[],
      discussion:[],
      checkAll:false
    }
    this.closeBtnMenu = this.closeBtnMenu.bind(this);
    this.openMenu = this.openMenu.bind(this);
    this.removeBtn = this.removeBtn.bind(this);
    this.menuToggle = this.menuToggle.bind(this);
  }
  closeBtnMenu(){this.setState({ openMenu:false })}
  //검색시 인덱스 초기화
  handleChange = (e) => {this.setState({keyword: e.target.value, checkIdx:[] })}
  //ListUtil연결
  menuToggle(){this.setState({ openMenu:!this.state.openMenu })}
  listCheckAll = (e) => {
    const {discussion, checkAll, keyword } = this.state
    this.setState((prevState) => ({checkAll: !prevState.checkAll}))
      if(!checkAll){
        const srch = discussion.filter((contact) => {
          return contact.title1.toLowerCase().indexOf(keyword) > -1
        });
        if(keyword === ""){
          this.setState({checkIdx:discussion.map(content => content.idx), openMenu:true})
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
    const discussion = this.state.discussion.map((content,i) => {
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
        openmenu={this.openMenu}
        menu={content.menu}
        checkAll={this.state.checkAll}
        />
    })
    return discussion
  }
  componentDidMount(){
    getApi().then(res => this.setState({discussion: res.data.discussion}))
  }
  render(){
    console.log(this.state.checkIdx)
    const mapToComponents = (discussion) => {
      if(this.state.keyword === ''){
          this.renderAdminList()
      }
       discussion = discussion.filter((contact) => {
         return contact.title1.toLowerCase().indexOf(this.state.keyword) > -1
       });
       return discussion.map((content,i) => {
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
              openmenu={this.openMenu}
              menu={content.menu}
              checkAll={this.state.checkAll}
              />
        });
    };
    const { openMenu, discussion } = this.state;
    return (
      <div className={cx('discussionAdminPage')}>
        <AddListBtn menu="discussion"/>
        <Navigate discussion="discussion"/>
          <div className={cx('discussionWrapper')}>
            <div className={cx('search')}>
              <div className={cx('selectBtn')}><SelectBtn /></div>
              <div className={cx('searchBox')}><Search handleChange={(e) => this.handleChange(e)}/></div>
            </div>
            <ListUtil menuToggle={this.menuToggle} listCheckAll={this.listCheckAll}/>
            <form>
              {mapToComponents(discussion)}
            </form>
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
export default DiscussionAdminPage;
