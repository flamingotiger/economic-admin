import {ProfileLists} from '../components/Molecules';
import * as actions from '../actions';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  setuser:state.setuser
});
const mapDispatchToProps = (dispatch) => ({
  onRemoveUser : (index) => dispatch(actions.removeUser(index))
});

const SetUserContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileLists);

export default SetUserContainer;
