import { ProfileLists } from '../../components/Molecules';
import * as actions from '../../actions';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  profile:state.profile
});
const mapDispatchToProps = (dispatch) => ({
  onRemoveUser : (index) => dispatch(actions.removeUser(index)),
});

const ProfileContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileLists);

export default ProfileContainer;
