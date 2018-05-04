import React,{Component} from 'react';
import styles from './AddPage.scss';
import classNames from 'classnames/bind';
import { Navigate, AddListBtn } from '../../Atoms';
import { NewsTemplate,
         DiscussionTemplate,
         StartUpTemplate,
         DataTemplate
} from '../../Templates';
import { getApi } from '../../../api';
import { NewsApi, DiscussionApi, StartupApi, DataApi} from '../../../api';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Cookies from 'js-cookie';

const cx = classNames.bind(styles);

class AddPage extends Component{
  constructor(props){
    super(props);
    this.state={
      addvalue:this.props.match.params.menu.slice(1),
      loading:false,
      user:undefined
    }
    this.handleChange = this.handleChange.bind(this);
    this.renderTemplate = this.renderTemplate.bind(this);
  }

  //menu select
  handleChange(e){
    this.setState({ addvalue : e.target.value })
    this.props.history.push(`/admin/add=${e.target.value}`)
  }

  renderTemplate(){
    //addvalue 는 AddListBtn에서 받아온 값
    //Number나중에 지워야댐 이것들 string
    const { addvalue, getNews, getDiscussion, getStartup, getData } = this.state;
    const idx = this.props.match.params.idx;
    const user = this.props.user.user;
    switch(addvalue){
      case "news":
        return <NewsTemplate addvalue={addvalue} idx={idx} news={getNews} user={user}/>
      case "discussion":
        return <DiscussionTemplate addvalue={addvalue} idx={idx} discussion={getDiscussion} user={user}/>
      case "startup":
        return <StartUpTemplate addvalue={addvalue} idx={idx} startup={getStartup} user={user}/>
      case "data":
        return <DataTemplate addvalue={addvalue} idx={idx} data={getData} user={user}/>
      default:
        return null;
    }
  }

  componentDidMount(){
    //나중에 여기 전부 삭제
    //이유는 쿠키의 lang에 따라서 다른 값을 불러와야되는데
    //여기서 가능하긴하지만 많이 번거로울 가능성이 높음

    const idx = this.props.match.params.idx;
    //news
    getApi().then(res => this.setState({getNews : res.data.news[idx]}))
    //NewsApi.getNews(idx).then(res => console.log(res))

    //discussion
    getApi().then(res => this.setState({getDiscussion : res.data.discussion[idx]}))
    //DiscussionApi.getDiscussion(idx).then(res => console.log(res))

    //startup
    getApi().then(res => this.setState({getStartup : res.data.startup[idx]}))
    //StartupApi.getStartup(idx).then(res => console.log(res))

    //data
    getApi().then(res => this.setState({getData : res.data.data[idx], loading:true}))
    //DataApi.getData(idx).then(res => console.log(res))

  }

  render(){
    const { user } = this.props;
    if(!user.isLoggedIn) {
      return (
        <Redirect to="/admin"/>
      );
    }
    const params = this.props.match.params.menu.slice(1);
    return (
      <div className={cx('addWrapper')}>
        <AddListBtn menu={this.state.addvalue}/>
        <Navigate />
        { Number(this.props.match.params.idx) >= 0  ?
          null
          :
        <div className={cx('addMenu')}>
          <div className={cx('addTitle')}>ADD</div>
            <select defaultValue={params} onChange={this.handleChange}>
                <option value="news">NEWS</option>
                <option value="startup">STARTUP</option>
                <option value="discussion">DISCUSSION</option>
                <option value="data">DATA</option>
            </select>
        </div>
        }
        {this.state.loading ?
          this.renderTemplate()
          :
          null
        }
      </div>
    )
  }
}
const mapStateToProps = (state) => ({
  user: state.login
});
export default connect(mapStateToProps)(AddPage);
