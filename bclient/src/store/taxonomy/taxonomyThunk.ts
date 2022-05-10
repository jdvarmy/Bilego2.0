import { fetchTaxonomies } from '../../api/requests';
import { EventTerm } from '../../types/enums';
import { setCategory, setFeeling, setGenre, setSelection } from './taxonomySlice';

export const asyncGetTaxonomy = async (dispatch): Promise<void> => {
  try {
    const { data } = await fetchTaxonomies();

    if (data) {
      dispatch(setSelection(data[EventTerm.selection]));
      dispatch(setCategory(data[EventTerm.category]));
      dispatch(setGenre(data[EventTerm.genre]));
      dispatch(setFeeling(data[EventTerm.feeling]));
    }
  } catch (e) {
    throw new Error(e);
  }
};
