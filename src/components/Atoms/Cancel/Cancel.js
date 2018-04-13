import React,{Component} from 'react';
import styles from './Cancel.scss';
import classNames from 'classnames/bind';
import axios  from 'axios';

const cx = classNames.bind(styles);

class Cancel extends Component{
  constructor(props){
    super(props)
    this.state={ close:false }
  }
  handleClose = () => {this.setState({close:true})}
  removeUser = () => {
    console.log('api DELETE사용')
    //파라미터에 해당하는 `url${idx}` 값을 토대로 delete
    axios.delete('https://jsonplaceholder.typicode.com/posts/1')
    .then(res => console.log(res))
  }
  render(){
    const { idx, handleCancel, openCancel } = this.props
    return (
      <div className={openCancel? cx('cancelBg','close') : cx('cancelBg')}>
        <div className={cx('cancel')}>
          <span>Are you sure you want to delete?</span>
          <div>
            <button className={cx('return')} onClick={() => handleCancel(0)}>RETURN</button>
            <button className={cx('delete')} onClick={(e) => this.removeUser(idx)}>DELETE</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Cancel;
