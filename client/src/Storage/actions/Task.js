import { FETCH_ALL, CREATE, UPDATE, DELETE } from './TaskActionTypes.js';

import * as api from '../api/taskApi.js';

export const getTasks = () => async (dispatch) => {
  try {
    const { data } = await api.getTasks();

    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const createTask = (Task) => async (dispatch) => {
  try {
    const { data } = await api.createTask(Task);

    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateTask = (id, Task) => async (dispatch) => {
  try {
    const { data } = await api.updateTask(id, Task);

    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};


export const deleteTask = (id) => async (dispatch) => {
  try {
    await api.deleteTask(id);

    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error.message);
  }
};
