import { fetchSlides } from '../../api/requests';
import { setSlides } from './sliderSlice';
import { Cities } from '../../types/enums';

export const asyncGetSlides = async (dispatch, city?: Cities): Promise<void> => {
  try {
    const { data } = await fetchSlides(city);

    if (data) {
      dispatch(setSlides(data));
    }
  } catch (e) {
    throw new Error(e);
  }
};
