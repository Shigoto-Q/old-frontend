import { toast, Slide } from "react-toastify";
import { idText } from "typescript";
import {TASK_CREATION_FAILED, TASK_CREATION_SUCCESS, TASK_DELETE_SUCCESS, TASK_LIST_GET_SUCCESS, TASK_RAN_SUCCESS} from "../../types/task"

const initialState = {
  tasks: [] as any[]
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
      console.log(payload)
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id != payload)
      };
    default:
      return state;
  }
};

export default reducers;
