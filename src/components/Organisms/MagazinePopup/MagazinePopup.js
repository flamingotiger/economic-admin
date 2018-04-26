import React,{Component} from 'react';
import styles from './MagazinePopup.scss';
import classNames from 'classnames/bind';
import { NewsMagazine, DataMagazine, DiscussionMagazine, StartupMagazine } from '../../Organisms';

const cx = classNames.bind(styles);

class MagazinePopup extends Component{
  constructor(props){
    super(props);
    this.state={
      open:true
    }
    this.handleClose = this.handleClose.bind(this);
  }
  componentWillReceiveProps(nextProps){
      this.setState({ open:true })
  }
  renderPopup(){
    const {popup} = this.props;
    switch(popup){
      case "news1":
        return <NewsMagazine magazine="true" getIdx={this.props.getIdx} selectItem="0" handleClose={this.handleClose}/>
      case "news2":
        return <NewsMagazine magazine="true" getIdx={this.props.getIdx} selectItem="1" handleClose={this.handleClose}/>
      case "discussion":
        return <DiscussionMagazine magazine="true" getIdx={this.props.getIdx} handleClose={this.handleClose}/>
      case "startup1":
        return <StartupMagazine magazine="true" getIdx={this.props.getIdx} selectItem="0" handleClose={this.handleClose}/>
      case "startup2":
        return <StartupMagazine magazine="true" getIdx={this.props.getIdx} selectItem="1" handleClose={this.handleClose}/>
      case "startup3":
        return <StartupMagazine magazine="true" getIdx={this.props.getIdx} selectItem="2" handleClose={this.handleClose}/>
      case "data":
        return <DataMagazine magazine="true" getIdx={this.props.getIdx}/>
      default:
        return null;
    }
  }
  handleClose(){ this.setState({ open:false });}
  render(){
    return (
      <div className={this.state.open ? cx('bg') : cx('bg','hidden')}>
        <div className={cx('popup')}>
          <div className={cx('cancelBox')} onClick={this.handleClose}>
            <img src="/assets/btn-cancle-box.svg" alt="cancelBox"/>
          </div>
          <div className={cx('list')}>
            {this.renderPopup()}
          </div>
        </div>
      </div>
    )
  }
}
export default MagazinePopup;
