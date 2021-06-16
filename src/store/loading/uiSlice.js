import { createSelector, createSlice } from '@reduxjs/toolkit';

//Reducer ******************************************************************************************************

const loadingSlice = createSlice({
  name: 'progress',
  initialState: { isLoading: false },
  reducers: {
    loaderStared: (state, action) => {
      state.isLoading = true;
    },
    loaderFinished: (state, action) => {
      state.isLoading = false;
    },
  },
});

export default loadingSlice.reducer;
const { loaderStared, loaderFinished } = loadingSlice.actions;

//Actions ******************************************************************************************************

export const startLoader = () => (dispatch) => {
  dispatch({ type: loaderStared.type });
};

export const finishLoader = () => (dispatch) => {
  dispatch({ type: loaderFinished.type });
};

//Selectors ******************************************************************************************************

export const selectLoadingState = (state) =>
  createSelector(
    (state) => state.ui.progress, //input
    (progress) => progress //output
  );
