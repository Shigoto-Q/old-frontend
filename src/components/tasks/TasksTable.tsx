import  api from "../../api/";
import { useState, useEffect } from "react";
import { CheckCircle, XCircle, Edit2 } from "react-feather";
import { Redirect } from "react-router-dom"
import {closeModal, deleteTask, getTaskList, openModal, runTask} from "../../redux/actions/task/"
import { connect } from "react-redux"
import { checkAuthenticated } from "../../redux/actions/auth/"
import TaskEdit from "../modal/task/TaskEdit";


type TaskProps = {
  isAuthenticated?: boolean,
  tasks: any,
  modalActive: boolean,
  getTaskList: any,
  runTask: any,
  deleteTask: any,
  openModal: any,
  closeModal: any
}


const TaskTable = ({ isAuthenticated, tasks, modalActive, getTaskList, runTask, deleteTask, openModal, closeModal }: TaskProps) => {
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedTask, setSelectedTask] = useState(undefined)


  const handleClose = () => {
    closeModal()
  }

  const handleEditClick = (task: any) => {
    setSelectedTask(task)
    openModal()
  }

  const handleRun = (id: number, event: any) => {
    event.preventDefault()
    runTask(id)
  }
  const handleDelete = (id:number, event:any)  => {
    event.preventDefault()
    deleteTask(id)
  }
  useEffect(() => {
    getTaskList()
    //getUserTasks();
  }, []);
  if (!isAuthenticated) {
    return <Redirect to="/login" />
  }
  return (
    <div className="flex flex-col">
      {modalActive && <TaskEdit handleClose={handleClose} selectedTask={selectedTask}></TaskEdit>}
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 dark:border-gray-900">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-200">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider"
                  >
                    Task Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider"
                  >
                    Crontab
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500  dark:text-gray-200 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium dark:text-gray-200 text-gray-500 uppercase tracking-wider"
                  >
                    One-off
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500  dark:text-gray-200 uppercase tracking-wider"
                  >
                    Enabled
                  </th>
                  <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500  dark:text-gray-200 uppercase tracking-wider"
                  >
                    Run
                  </th>
                  <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500  dark:text-gray-200 uppercase tracking-wider"
                  >
                    Delete
                  </th>
                  <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500  dark:text-gray-200 uppercase tracking-wider"
                  >
                    Edit
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-500 dark:bg-gray-700">
                {tasks.map((task: any) => (
                  <tr key={task.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <span className="h-10 w-10 rounded-full dark:text-gray-200">
                            {task.id}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-gray-200">
                            {task.name}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            Total run count: {task.total_run_count}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-gray-200">
                        {task.crontab
                          ? task.crontab.minute +
                          " " +
                          task.crontab.hour +
                          " " +
                          task.crontab.day_of_month +
                          " " +
                          task.crontab.month_of_year +
                          " " +
                          task.crontab.day_of_week
                          : task.interval}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Active
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-200">
                      {task.one_off ? <CheckCircle /> : <XCircle />}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-200">
                      {task.enabled ? <CheckCircle /> : <XCircle />}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-200">
                      <button
                        type="submit"
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm
                        text-sm font-medium rounded-md text-white bg-purple-400 focus:outline-none
                        focus:ring-2 focus:ring-offset-2 focus:ring-purple-500
                        transition duration-500 ease-in-out hover:bg-green-400 transform hover:-translate-y-1 hover:scale-110
                        "
                        onClick={(e) => handleRun(task.id, e)}
                      >
                        Run
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-200">
                      <button
                          type="submit"
                          className="inline-flex justify-center py-2 px-4
                          border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-400
                          hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500
                          transition duration-500 ease-in-out hover:bg-red-400 transform hover:-translate-y-1 hover:scale-110
                          "
                          onClick={(e) => handleDelete(task.id, e)}
                      >
                        Delete
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-200">
                    <button onClick={() => handleEditClick(task)}>
                      <Edit2/>
                    </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  isAuthenticated: state.auth.isAuthenticated,
  tasks: state.task.tasks,
  modalActive: state.task.modalActive
})

export default connect(mapStateToProps, { checkAuthenticated, getTaskList, runTask, deleteTask, openModal, closeModal })(TaskTable);
