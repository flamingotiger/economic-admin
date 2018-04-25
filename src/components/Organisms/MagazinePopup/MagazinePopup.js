import React,{Component} from 'react';
import styles from './MagazinePopup.scss';
import classNames from 'classnames/bind';
import { NewsMagazine, DataMagazine, DiscussionMagazine, StartupMagazine } from '../../Organisms';

const cx = classNames.bind(styles);

class MagazinePopup extends Component{
  constructor(props){
    super(props);
    this.state={
      popup:this.props.popup,
      open:true
    }
    this.handleClose = this.handleClose.bind(this);
  }
  componentWillReceiveProps(nextProps){
      this.setState({popup: nextProps.popup, open:true})
  }
  renderPopup(){
    const {popup} = this.state;
    switch(popup){
      case "news1":
        return <NewsMagazine magazine="true" />
      case "news2":
        return <NewsMagazine magazine="true" />
      case "discussion":
        return <DiscussionMagazine magazine="true" />
      case "startup1":
        return <StartupMagazine magazine="true" />
      case "startup2":
        return <StartupMagazine magazine="true" />
      case "startup3":
        return <StartupMagazine magazine="true" />
      case "data":
        return <DataMagazine magazine="true" />
      default:
        return null;
    }
  }
  handleClose(){ this.setState({open:false, popup:this.props.popup});}
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
