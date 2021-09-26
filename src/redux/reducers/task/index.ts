import { toast, Slide } from "react-toastify";
import { idText } from "typescript";
import {TASK_CREATION_FAILED, TASK_CREATION_SUCCESS, TASK_DELETE_SUCCESS, TASK_EDIT_CLOSE_MODAL, TASK_EDIT_OPEN_MODAL, TASK_LIST_GET_SUCCESS, TASK_RAN_SUCCESS, TASK_UPDATE_FAILURE, TASK_UPDATE_SUCCESS} from "../../types/task"

const initialState = {
  tasks: [] as any[],
  modalActive: false
};

const reducers = (state = initialState, action: any) => {
  const { type, payload } = action;

  switch (type) {
    case TASK_LIST_GET_SUCCESS:
      return {
        ...state,
        tasks: payload
      }

    case TASK_CREATION_FAILED:
      return {
        ...state,
      };
    case TASK_CREATION_SUCCESS:
      console.log(state)
      toast("Task created successfully!", {
        position: "bottom-center",
        transition: Slide,
        hideProgressBar: false,
        autoClose: 2000,
        closeOnClick: true,
        progress: undefined,
        pauseOnHover: false,
        pauseOnFocusLoss: false,
        draggable: true,
      });
      return {
        ...state,
        task: payload,
      };
    case TASK_RAN_SUCCESS:
      toast("Task ran successfully!", {
        position: "bottom-center",
        transition: Slide,
        hideProgressBar: false,
        autoClose: 2000,
        closeOnClick: true,
        progress: undefined,
        pauseOnHover: false,
        pauseOnFocusLoss: false,
        draggable: true,
      });
      return {
        ...state,
      };
    case TASK_DELETE_SUCCESS:
      toast("Task deleted successfully!", {
        position: "bottom-center",
        transition: Slide,
        hideProgressBar: false,
        autoClose: 2000,
        closeOnClick: true,
        progress: undefined,
        pauseOnHover: false,
        pauseOnFocusLoss: false,
        draggable: true,
      });
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id != payload)
      };
      case TASK_UPDATE_SUCCESS:
        toast("Task updated successfully!", {
          position: "bottom-center",
          transition: Slide,
          hideProgressBar: false,
          autoClose: 2000,
          closeOnClick: true,
          progress: undefined,
          pauseOnHover: false,
          pauseOnFocusLoss: false,
          draggable: true,
        });
        const updatedTask = {
          ...payload.data,
          crontab: payload.crontab
        }
        return {
          ...state,
          tasks: [...state.tasks.filter(task => task.id !== payload.data.id), updatedTask],
          modalActive: false
        }
      case TASK_UPDATE_FAILURE:
        toast("Task failed updating", {
          position: "bottom-center",
          transition: Slide,
          hideProgressBar: false,
          autoClose: 2000,
          closeOnClick: true,
          progress: undefined,
          pauseOnHover: false,
          pauseOnFocusLoss: false,
          draggable: true,
        });
        return {
          ...state
        }

      case TASK_EDIT_OPEN_MODAL:
        return {
          ...state,
          modalActive: true
        }
      case TASK_EDIT_CLOSE_MODAL:
        return {
          ...state,
          modalActive: false
        }
    default:
      return state;
  }
};

export default reducers;
