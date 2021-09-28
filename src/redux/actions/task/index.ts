import { Dispatch } from "redux";
import api from "../../../api/";
import {TASK_CREATION_FAILED, TASK_CREATION_SUCCESS, TASK_DELETE_SUCCESS, TASK_LIST_GET_SUCCESS, TASK_RAN_SUCCESS, TASK_UPDATE_SUCCESS, TASK_UPDATE_FAILURE, TASK_EDIT_OPEN_MODAL, TASK_EDIT_CLOSE_MODAL} from "../../types/task/";



type Kwargs = {
  requestEndpoint: string;
  repoUrl: string,
  repoName: string,
  imageName: string;
  command: string;
}

export const getTaskList = () => async (dispatch: Dispatch) => {
  const res = await api.get('/api/v1/task/')
  dispatch({
    type: TASK_LIST_GET_SUCCESS,
    payload: res.data
  });
}

export const createTask = (
  taskName: string,
  task: string,
  crontab: number,
  kwargs: Kwargs,
  oneoff: boolean,
  enabled: boolean,
  expireSeconds: number
) => async (dispatch: Dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  let kw = {}
  let taskType = undefined;
  if(task === "custom_endpoint") {
    taskType = 1
    kw = {
      "request_endpoint": kwargs.requestEndpoint
    }
  } else if (task === "k8s_job") {
    taskType = 2
    kw = {
      "repo_url" : kwargs.repoUrl,
      "full_name" : kwargs.repoName,
      "image_name": kwargs.imageName,
      "command": kwargs.command
    }
  }


  const body = {
    name: taskName,
    task: task,
    task_type: taskType,
    crontab: crontab,
    args: '',
    kwargs: JSON.stringify(kw),
    one_off: oneoff,
    enabled: enabled,
    expire_seconds: expireSeconds
  };


  await api
    .post("/api/v1/task/", body, config)
    .then((res) => {
      dispatch({
        type: TASK_CREATION_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: TASK_CREATION_FAILED,
        payload: err.response,
      });
    });
};

export const runTask = (taskId: number) => async (dispatch: Dispatch) => {
  await api
    .get(`/api/v1/task/${taskId}/run/`)
    .then(res => {
      dispatch({
        type: TASK_RAN_SUCCESS,
        payload: res.data
      })
    })
}

// Add update for k8s_job when enabled
export const updateTask = (
  taskId: number,
  taskName: string,
  crontab: number,
  kwargs: Kwargs,
  oneoff: boolean,
  enabled: boolean
) => async (dispatch: Dispatch, getState: any) => {

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = {
    name: taskName,
    crontab: crontab,
    args: '',
    kwargs: JSON.stringify(kwargs),
    one_off: oneoff,
    enabled: enabled,
  };

  await api.put(`/api/v1/task/${taskId}/update/`, body, config)
    .then(res => {
      console.log(getState().schedule.crontab)
      dispatch({
        type: TASK_UPDATE_SUCCESS,
        payload: {
          data: res.data,
          crontab: getState().schedule.crontab.filter((crontab: Crontab) => crontab.id === res.data.crontab)[0]
        }
      })
    }).catch(err => {
      dispatch({
        type: TASK_UPDATE_FAILURE,
        payload: err.response
      })
    })
}

export const deleteTask = (taskId: number) => async (dispatch: Dispatch) => {
  await api.delete(`/api/v1/task/${taskId}/delete/`)
      .then(_ => {
        dispatch({
          type: TASK_DELETE_SUCCESS,
          payload: taskId,
        })
      })
}

export const openModal: any = () => (dispatch: Dispatch) => {
  dispatch({
    type: TASK_EDIT_OPEN_MODAL,
  });
}

export const closeModal: any = () => (dispatch: Dispatch) => {
  dispatch({
    type: TASK_EDIT_CLOSE_MODAL,
  });
}