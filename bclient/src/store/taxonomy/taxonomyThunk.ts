import { fetchTaxonomies } from '../../api/requests';
import { Term } from '../../types/enums';
import { setCategory, setFeeling, setGenre, setSelection } from './taxonomySlice';

export const asyncGetTaxonomy = async (dispatch): Promise<void> => {
  try {
    const response = await fetchTaxonomies();

    if (response?.data) {
      dispatch(setSelection(response?.data[Term.selection]));
      dispatch(setCategory(response?.data[Term.category]));
      dispatch(setGenre(response?.data[Term.genre]));
      dispatch(setFeeling(response?.data[Term.feeling]));
    }
  } catch (e) {
    throw new Error(e);
  }
};
