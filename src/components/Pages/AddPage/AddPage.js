import React,{Component} from 'react';
import styles from './AddPage.scss';
import classNames from 'classnames/bind';
import { Navigate } from '../../Atoms';
import { NewsTemplate, DiscussionTemplate } from '../../Templates';

const cx = classNames.bind(styles);

class AddPage extends Component{
  constructor(props){
    super(props);
    this.state={
      addvalue:this.props.match.params.menu.slice(1)
    }
    this.handleChange = this.handleChange.bind(this);
    this.renderTemplate = this.renderTemplate.bind(this);
  }
  handleChange(e){
    this.setState({
      addvalue : e.target.value
    })
  }

  renderTemplate(){
    switch(this.state.addvalue){
      case "news":
        return <NewsTemplate addvalue={this.state.addvalue}/>
      case "discussion":
        return <DiscussionTemplate addvalue={this.state.addvalue}/>
    }
  }
  render(){
    const params = this.props.match.params.menu.slice(1);
    return (
      <div className={cx('addWrapper')}>
        <Navigate />
        <div className={cx('addMenu')}>
          <div className={cx('addTitle')}>ADD</div>
            <select defaultValue={params} onChange={this.handleChange}>
                <option value="news">news</option>
                <option value="startup">startup</option>
                <option value="discussion">discussion</option>
                <option value="data">data</option>
            </select>
        </div>
          {this.renderTemplate()}
      </div>
    )
  }
}

export default AddPage;
