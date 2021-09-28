import {Switch} from '@headlessui/react'
import { useState } from 'react';
import { connect } from 'react-redux';
import formatCron from '../../../helpers/formatCron';
import { checkAuthenticated, load_user } from '../../../redux/actions/auth';
import { createTask, updateTask } from '../../../redux/actions/task';
import DropdownMenu from "../../generic/DropdownMenu";




const TaskEdit = ({handleClose, user, selectedTask, updateTask}: any) => {
  const taskTypes: DropdownElement[] = [
    {
        id: 1,
        name: 'Custom endpoint request',
        value: 'custom_endpoint'
    },
    //TODO Disabled until feature flags is implemented
    // {
    //     id: 2,
    //     name: 'Job',
    //     value: 'k8s_job'
    // }

  ]

  let actualCrons:any = []
  let repoNames:any = []
  const userCrons = JSON.parse(user || "{}").crontab;
  if(userCrons) {
      actualCrons = userCrons.map((item: any) => {
          return {
              value: [
                  item.minute,
                  item.hour,
                  item.day_of_month,
                  item.month_of_year,
              ].join(" "),
              id: item.id,
          };
      });
  }
  const userData = JSON.parse(localStorage.getItem("userData") || "{}")
  const isGhConnected = (userData?.github === null) ? false : !!(userData?.github.token)
  if(isGhConnected) {
      repoNames = userData?.github.repository_set.map((el:any, idx:any) => {
          return {
              name:el.full_name,
              value: el.repo_url,
              id: idx
          }
      })
  }

  const handleSubmit = () => {
      updateTask(selectedTask.id, taskName, selectedCron.id, kwargsEndpoint, oneoff, enabled)
  }



  const handleTaskName = (e: React.ChangeEvent<HTMLInputElement>) => {
      setTaskName(e.target.value)
  }


  const [selectedType, setSelectedType] = useState(taskTypes[0]);
  const [selectedCron, setSelectedCron] = useState(
    formatCron(selectedTask.crontab)
  );

  const [oneoff, setOneoff] = useState(selectedTask.one_off);
  const [taskName, setTaskName] = useState(selectedTask.name);
  const [kwargsEndpoint, setKwargsEndpoint] = useState({
      requestEndpoint: JSON.parse(selectedTask.kwargs).request_endpoint,
  });
  const [enabled, setEnabled] = useState(selectedTask.enabled)
  const [expireSeconds, setExpireSeconds] = useState(selectedTask.expire_seconds)


  //disabled
  //const [selectedRepo, setSelectedRepo] = useState(repoNames[0])
  //const [imageName, setImageName] = useState("");
  //const [command, setCommand] = useState("");

    return (
        <div
        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
      >
        <div className="relative w-3/5 my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
              <h3 className="text-3xl font-semibold">
                Edit task
              </h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black opacity-2 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => handleClose()}
              >
                <span className="text-black opacity-2 h-6 w-6 text-2xl block outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>
            {/*body*/}
            <div className="relative flex-auto">
                <div className="flex flex-row justify-center align-center">
                    <div className="w-2/4 mt-5 self-center dark:text-white">
                        <label
                            htmlFor="latitude"
                            className="block text-sm font-medium text-gray-700 dark:text-white"
                        >
                            Task name
                        </label>
                        <input
                            type="text"
                            name="taskname"
                            id="taskname"
                            autoComplete="taskname"
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500
                            block w-full shadow-sm sm:text-sm border-gray-300 rounded-md
                            dark:bg-gray-600 dark:border-gray-800 dark:text-gray-200
                            "
                            value={taskName}
                            onChange = {event => handleTaskName(event)}
                        />
                    </div>
                </div>
            </div>
            <div className="flex flex-row justify-center align-center">
                    <div className="w-2/4 mt-5 self-center dark:text-white">
                        <DropdownMenu selected={selectedType} setSelected={setSelectedType} options={taskTypes} label={"Select your task type:"} />
                    </div>
                </div>
                <div className="flex flex-row justify-center align-center">
                    <div className="w-2/4 mt-5 self-start">
                        <DropdownMenu selected={selectedCron} setSelected={setSelectedCron} options={actualCrons} label={"Select your crontab schedule:"} />
                    </div>
                </div>
                <div className="flex flex-col justify-center align-center">
                <div className="w-2/4 mt-5 self-center dark:text-white" >
                    <label
                        htmlFor="kwargs"
                        className=" dark:text-white block text-sm font-medium text-gray-700"
                    >
                        Request endpoint:
                    </label>
                    <input
                        type="text"
                        name="kwargs"
                        id="kwargs"
                        placeholder="https://www.google.com"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500
                        block w-full shadow-sm sm:text-sm border-gray-300 rounded-md
                        dark:bg-gray-600 dark:border-gray-800 dark:text-gray-200
                        "
                        onChange={(e) => setKwargsEndpoint(prevState => ({
                            ...prevState,
                            requestEndpoint: e.target.value
                        }))}
                        value = {kwargsEndpoint.requestEndpoint}
                        required
                    />
                </div>
                <div className="w-2/4 mt-5 self-center dark:text-white">
                    <label
                        htmlFor="exp"
                        className=" dark:text-white block text-sm font-medium text-gray-700"
                    >
                        Expire timedelta with seconds:
                    </label>
                    <input
                        type="text"
                        name="exp"
                        id="exp"
                        placeholder="100"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500
                        block w-full shadow-sm sm:text-sm border-gray-300 rounded-md
                        dark:bg-gray-600 dark:border-gray-800 dark:text-gray-200
                        "
                        onChange={(e) => setExpireSeconds(e.target.value)}
                        value = {expireSeconds}
                    />
                </div>
            </div>
            <div className = "flex flex-row justify-center align-center m-1.5">
                    <div className="mt-10">
                        <Switch.Group>
                            <Switch.Label className="mr-4 dark:text-white">
                                One-off
                            </Switch.Label>
                            <Switch
                                checked={oneoff}
                                onChange={setOneoff}
                                className={`${
                                    oneoff ? "bg-purple-400" : "bg-gray-500"
                                }  inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none`}
                            >
                            <span
                                className={`${
                                    oneoff ? "translate-x-6" : "translate-x-1"
                                } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
                            />
                            </Switch>
                        </Switch.Group>
                    </div>
                    <div className="mt-10 ml-10" >
                        <Switch.Group>
                            <Switch.Label className="mr-4 dark:text-white">
                                Enabled
                            </Switch.Label>
                            <Switch
                                checked={enabled}
                                onChange={setEnabled}
                                className={`${
                                    enabled ? "bg-purple-400" : "bg-gray-500"
                                }  inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none`}
                            >
                            <span
                                className={`${
                                    enabled ? "translate-x-6" : "translate-x-1"
                                } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
                            />
                            </Switch>
                        </Switch.Group>
                    </div>
                </div>
                
            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
              <button
                className="text-purple-400 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => handleClose()}
              >
                Close
              </button>
              <button
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm
                text-sm font-medium rounded-md text-white bg-purple-400 focus:outline-none
                focus:ring-2 focus:ring-offset-2 focus:ring-purple-500
                transition duration-500 ease-in-out hover:bg-green-400 transform hover:-translate-y-1 hover:scale-110
                "
                type="button"
                onClick={() => handleSubmit()}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const mapStateToProps = (state: any) => ({
      isAuthenticated: state.auth.isAuthenticated,
      user: state.auth.user,
  });

  export default connect(mapStateToProps, {
    checkAuthenticated,
    load_user,
    createTask,
    updateTask,
})(TaskEdit);