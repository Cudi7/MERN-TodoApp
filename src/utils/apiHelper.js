import { displayPublicTodos } from '../store/todos/todosSlice';

async function apiHelper(info) {
  const { data, url, method, dispatch } = info;
  try {
    await fetch(url, {
      method,
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (dispatch) dispatch(displayPublicTodos());
  } catch (error) {
    console.log(error.message);
  }
}

export default apiHelper;
