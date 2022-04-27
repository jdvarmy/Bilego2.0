import { fetchSlides } from '../../api/requests';
import { setSlides } from './sliderSlice';
import { Cities } from '../../types/enums';

export const asyncGetSlides = async (dispatch, city?: Cities | null): Promise<void> => {
  try {
    const response = await fetchSlides(city);

    if (response?.data) {
      dispatch(setSlides(response.data));
    }
  } catch (e) {
    throw new Error(e);
  }
};
