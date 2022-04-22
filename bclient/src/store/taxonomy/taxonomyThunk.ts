import { fetchTaxonomies } from '../../api/requests';
import { Term } from '../../types/enums';
import { setCategory, setFeeling, setGenre, setSelection } from './taxonomySlice';

export const asyncGetTaxonomy = async (dispatch): Promise<void> => {
  try {
    const { data } = await fetchTaxonomies();

    if (data) {
      dispatch(setSelection(data?.[Term.selection]));
      dispatch(setCategory(data?.[Term.category]));
      dispatch(setGenre(data?.[Term.genre]));
      dispatch(setFeeling(data?.[Term.feeling]));
    }
  } catch (e) {
    throw new Error(e);
  }
};
