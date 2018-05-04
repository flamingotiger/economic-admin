import React,{Component} from 'react';
import styles from './Cancel.scss';
import classNames from 'classnames/bind';
import { UserApi } from '../../../api';

const cx = classNames.bind(styles);

class Cancel extends Component{
  constructor(props){
    super(props)
    this.state={ close:false }
  }
  handleClose = () => {this.setState({close:true})}
  removeUser = () => {
    UserApi.deleteUser(this.props.id).then(res => console.log(res))
  }
  render(){
    const { id, handleCancel, openCancel } = this.props
    return (
      <div className={openCancel? cx('cancelBg','close') : cx('cancelBg')}>
        <div className={cx('cancel')}>
          <span>Are you sure you want to delete?</span>
          <div>
            <button className={cx('return')} onClick={() => handleCancel(false)}>RETURN</button>
            <button className={cx('delete')} onClick={(e) => this.removeUser(id)}>DELETE</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Cancel;
