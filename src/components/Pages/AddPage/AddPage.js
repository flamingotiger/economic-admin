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
      loading:false
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
    const {addvalue, getNews, getDiscussion, getStartup, getData} = this.state;
    const idx = Number(this.props.match.params.idx);
    switch(addvalue){
      case "news":
        return <NewsTemplate addvalue={addvalue} idx={idx} news={getNews}/>
      case "discussion":
        return <DiscussionTemplate addvalue={addvalue} idx={idx} discussion={getDiscussion}/>
      case "startup":
        return <StartUpTemplate addvalue={addvalue} idx={idx} startup={getStartup}/>
      case "data":
        return <DataTemplate addvalue={addvalue} idx={idx} data={getData}/>
      default:
        return null;
    }
  }
  componentDidMount(){
    const idx = Number(this.props.match.params.idx);
    //news
    getApi().then(res => this.setState({getNews : res.data.news[idx]}))
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
