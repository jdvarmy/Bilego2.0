import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import ActionCreators from '../store/actions';
import { AppActions } from '../types/enums';

export const useActions = (type: AppActions) => {
  const dispatch = useDispatch();
  return bindActionCreators(ActionCreators[type], dispatch);
};
