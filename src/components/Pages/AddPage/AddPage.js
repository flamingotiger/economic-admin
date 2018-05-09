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
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

const cx = classNames.bind(styles);

class AddPage extends Component{
  constructor(props){
    super(props);
    this.state={
      addvalue:this.props.match.params.menu.slice(1),
      loading:false,
      user:undefined
    }

  }

  //menu select
  handleChange = (e) => {
    this.setState({ addvalue : e.target.value })
    this.pushPage(`add=${e.target.value}`);
  }

  pushPage = (params) => {
    this.props.history.push(`/admin/${params}`)
  }

  renderTemplate = () => {
    //addvalue 는 AddListBtn에서 받아온 값
    //Number나중에 지워야댐 이것들 string
    const { addvalue, getDiscussion, getStartup, getData } = this.state;
    const idx = this.props.match.params.idx;
    const user = this.props.user.user;
    //idx이 undefined 가 아니면 idx를 props로
    //idx가 undefined 면 undefined props로
      switch(addvalue){
        case "news":
          return <NewsTemplate addvalue={addvalue} idx={idx !== undefined ? idx : undefined} user={user} pushPage={() => this.pushPage("news")}/>
        case "discussion":
          return <DiscussionTemplate addvalue={addvalue} idx={idx !== undefined ? idx : undefined} discussion={getDiscussion} user={user} pushPage={() => this.pushPage("discussion")}/>
        case "startup":
          return <StartUpTemplate addvalue={addvalue} idx={idx !== undefined ? idx : undefined} startup={getStartup} user={user} pushPage={() => this.pushPage("startup")}/>
        case "data":
          return <DataTemplate addvalue={addvalue} idx={idx !== undefined ? idx : undefined} data={getData} user={user} pushPage={() => this.pushPage("data")}/>
        default:
          return null;
      }
  }

  componentDidMount(){
    //나중에 여기 api 전부 삭제
    //이유는 쿠키의 lang에 따라서 다른 값을 불러와야함
    const idx = this.props.match.params.idx;
    //discussion
    getApi().then(res => this.setState({getDiscussion : res.data.discussion[idx]}))
    //startup
    getApi().then(res => this.setState({getStartup : res.data.startup[idx]}))
    //data
    getApi().then(res => this.setState({getData : res.data.data[idx], loading:true}))

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
        <AddListBtn menu={this.state.addvalue} />
        <Navigate />
        { this.props.match.params.idx !== undefined  ?
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
        { this.renderTemplate() }
      </div>
    )
  }
}
const mapStateToProps = (state) => ({
  user: state.login
});
export default connect(mapStateToProps)(AddPage);
