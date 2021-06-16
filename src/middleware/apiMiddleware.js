import { apiCallBegan } from '../store/auth/actions';
import { finishLoader, startLoader } from '../store/loading/uiSlice';

const apiMiddleware =
  ({ dispatch }) =>
  (next) =>
  async (action) => {
    if (action.type !== apiCallBegan.type) return next(action);

    dispatch(startLoader());

    const { url, method, data, onSuccess, onError } = action.payload;

    next(action); //if we want the apiCallBegan to appear in redux devtools we need to specify this line, otherwise it will show only the other actions

    try {
      const response = await fetch(`https://todo-rc.herokuapp.com/${url}`, {
        method,
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const dataResponse = await response.json();

      dispatch(finishLoader());

      if (dataResponse.error)
        dispatch({ type: onError, payload: dataResponse });
      else {
        dispatch({ type: onSuccess, payload: { user: dataResponse } });
      }
    } catch (error) {
      dispatch(finishLoader());
      if (onError)
        dispatch({ type: onError, payload: { message: error.message } });
    }
  };

export default apiMiddleware;
