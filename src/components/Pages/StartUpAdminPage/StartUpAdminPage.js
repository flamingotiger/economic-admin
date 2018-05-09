import React,{Component} from 'react';
import styles from './StartUpAdminPage.scss';
import classNames from 'classnames/bind';
import { AddListBtn, Navigate, Search, StartupList, ListUtil, BtnMenu, SelectBtn } from '../../Atoms';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getApi, deleteApi } from '../../../api';
import { StartupApi } from '../../../api';

const cx = classNames.bind(styles);

class StartUpAdminPage extends Component{
  constructor(props){
    super(props);
    this.state={
      keyword:'',
      openMenu:false,
      checkIdx:[],
      startup:[],
      checkAll:false
    }

  }

  closeBtnMenu = () => { this.setState({ openMenu:false })}

  handleChange = (e) => {this.setState({keyword: e.target.value, checkIdx:[] })}

  menuToggle = () => { this.setState({ openMenu:!this.state.openMenu })}

  listCheckAll = (e) => {
    const {startup, checkAll, keyword } = this.state
    this.setState((prevState) => ({checkAll: !prevState.checkAll}))
      if(!checkAll){
        const srch = startup.filter((contact) => {
          return contact.ftitle.toLowerCase().indexOf(keyword) > -1
        });
        if(keyword === ""){
          this.setState({checkIdx:startup.map(content => content.idx), openMenu:true})
        }else{
          this.setState({checkIdx:srch.map(content => content.idx), openMenu:true})
        }
      }else{
        this.setState({checkIdx:[], openMenu:false })
      }
    }
  //버튼 클릭시 check된것가져오고 삭제 메뉴열기
  openMenu = (e) => {
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

  removeBtn = () => {
    //체크한 리스트 인덱스 값들 ${checkIdx}
    const checkIdx = this.state.checkIdx;
    checkIdx.map((remove) => (
      deleteApi(remove)
      ))
  }

  renderAdminList = () => {
    const startup = this.state.startup.map((content,i) => {
      return <StartupList
        key={i}
        idx={content.idx}
        img={content.img}
        cate={content.cate}
        publish={content.publish}
        date={content.date}
        ftitle={content.ftitle}
        reporter={content.reporter}
        openmenu={this.openMenu}
        menu={content.menu}
        checkAll={this.state.checkAll}
        />
    })
    return startup
  }

  sortDate = (date) => {
    console.log(date)
  }

  componentDidMount(){
    getApi().then(res => this.setState({startup: res.data.startup}))
    StartupApi.listStartup().then(res => console.log(res))
  }

  render(){
    const auth = Object(this.props.user.user);
    const { user } = this.props;
    if(!user.isLoggedIn) {
      return (
        <Redirect to="/admin"/>
      );
    }

    if(!auth.startUpManager){
      return (
        <Redirect to="/admin/notallow"/>
      );
    }

    const mapToComponents = (startup) => {
      //검색하지 않았을때 전부보이기
      if(this.state.keyword === ''){
        //검색하지 않았을때 전부보이기
        this.renderAdminList()
      }
       startup = startup.filter((contact) => {
         return contact.ftitle.toLowerCase().indexOf(this.state.keyword) > -1
       });
       return startup.map((content,i) => {
            return <StartupList
              key={i}
              idx={content.idx}
              img={content.img}
              cate={content.cate}
              publish={content.publish}
              date={content.date}
              ftitle={content.ftitle}
              reporter={content.reporter}
              openmenu={this.openMenu}
              menu={content.menu}
              checkAll={this.state.checkAll}
              />
        });
    };
    const { openMenu, startup } = this.state;
    return (
      <div className={cx('startupAdminPage')}>
        <AddListBtn menu="startup"/>
        <Navigate startup="startup"/>
          <div className={cx('startupWrapper')}>
            <div className={cx('search')}>
              <div className={cx('selectBtn')}><SelectBtn sortDate={this.sortDate} /></div>
              <div className={cx('searchBox')}><Search handleChange={(e) => this.handleChange(e)}/></div>
            </div>
            <ListUtil menuToggle={this.menuToggle} listCheckAll={this.listCheckAll}/>
            { mapToComponents(startup) }
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
export default connect(mapStateToProps)(StartUpAdminPage);
