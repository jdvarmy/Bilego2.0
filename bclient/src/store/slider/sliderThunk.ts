import { ThunkDispatchType } from '../index';
import { fetchSlides } from '../../api/requests';
import { setSlides } from './sliderSlice';

export const asyncGetSlides = async (dispatch): Promise<void> => {
  try {
    const { data } = await fetchSlides();

    if (data) {
      dispatch(setSlides(data));
    }
  } catch (e) {
    throw new Error(e);
  }
};
