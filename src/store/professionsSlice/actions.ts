import professionService from "../../services/professionService";
import {
  ProfessionsRequested,
  ProfessionsReceived,
  ProfessionsRequestedFailed,
} from "./slice";

function isOutdate(date: number) {
  if (Date.now() - date > 60 * 10 * 100) return true;
  return false;
}

export const loadProfessions = () => async (dispatch: any, getState: any) => {
  const { lastFetch } = getState().professions;
  if (isOutdate(lastFetch)) {
    try {
      dispatch(ProfessionsRequested());
      const { content } = await professionService.fetchAll();
      dispatch(ProfessionsReceived(content));
    } catch (error: any) {
      dispatch(ProfessionsRequestedFailed(error.message));
    }
  }
};

// export const loadProfessions = createAsyncThunk(
//   "users/fetchUsers",
//   async (_, thunkApi) => {
//     try {
//       const { data } = await professionService.fetchAll();
//       return data;
//     } catch (error) {
//       return thunkApi.rejectWithValue("Error!");
//     }
//   }
// );
