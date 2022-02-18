import React, {useEffect, useState} from 'react'
import {Switch} from '@headlessui/react'
import DropdownMenu from "../components/generic/DropdownMenu";
import {connect} from "react-redux";
import {checkAuthenticated, load_user} from "../redux/actions/auth";
import {createTask} from "../redux/actions/task";
import {useHistory} from "react-router-dom";
import formatCron from '../helpers/formatCron';
import api from "../api";

type TaskProps = {
    isAuthenticated: boolean;
    user: any;
    createTask: any;
};


const TaskCreate = ({isAuthenticated, user, createTask} : TaskProps) => {
    let history = useHistory();
    const [taskTypes, setTaskTypes] = useState([{id: 0, name: '', value: ''}])
    const fetchTaskTypes = ()  => {
        api.get(`/api/v1/task/types/`)
            .then((resp: any) => {
                setTaskTypes(resp.data)
            })
    }
    useEffect(() => {
       fetchTaskTypes()
    }, [])
    let actualCrons:any = []
    let repoNames:any = []
    const userCrons = JSON.parse(user || "{}").crontab;
    if(userCrons) {
        actualCrons = userCrons.map((item: any) => {
            return formatCron(item);
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



    const handleTaskName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTaskName(e.target.value)
    }


    const handleNext = () => {
        setAtFirstStep(false)
    }

    const handleBack = () => {
        setAtFirstStep(true)
    }


    const handleSubmit = (event: any) => {
        event.preventDefault();
        switch (selectedType.id) {
            case 1:
                createTask(taskName, selectedType?.value, selectedCron?.id, kwargsEndpoint, oneoff, enabled, expireSeconds)
                break
            case 2:
                const kwargsJob = {
                    repoUrl: selectedRepo.value,
                    repoName: selectedRepo.name,
                    imageName: imageName,
                    command: command
                }
                createTask(taskName, selectedType.value, selectedCron.id, kwargsJob, oneoff, enabled, expireSeconds);
                history.push("/dashboard/tasks");
        }
    };
    const [first]: any = taskTypes;
    const [selectedType, setSelectedType] = useState(first);
    const [selectedCron, setSelectedCron] = useState(actualCrons[0]);
    const [atFirstStep, setAtFirstStep] = useState(true);
    const [oneoff, setOneoff] = useState(false);
    const [taskName, setTaskName] = useState("");
    const [kwargsEndpoint, setKwargsEndpoint] = useState({
        requestEndpoint: "",
    });
    const [selectedRepo, setSelectedRepo] = useState(repoNames[0])
    const [imageName, setImageName] = useState("");
    const [command, setCommand] = useState("");
    const [enabled, setEnabled] = useState(false)
    const [expireSeconds, setExpireSeconds] = useState(120)

    return (
        <div>
            {atFirstStep &&
            <div className="flex flex-col justify-center align-center">
                <div className="mt-10 w-2/4 self-center">
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
                        value = {taskName}
                        onChange = {event => handleTaskName(event)}
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500
                        block w-full shadow-sm sm:text-sm border-gray-300 rounded-md
                        dark:bg-gray-600 dark:border-gray-800 dark:text-gray-200
                        "
                    />
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


                <div className="w-5/12 self-end justify-end ">
                    <div className="flex">
                        <button
                            onClick={handleNext}
                            className="mt-10 bg-purple-400 hover:bg-blue-700 text-white font-bold py-2 px-10 rounded self-center ml-36"
                        >
                            Next
                        </button>
                    </div>
                </div>


            </div>}
            {!atFirstStep && selectedType.id === 1 &&

            <div className="flex flex-col justify-center align-center">
                <div className="mt-10 w-2/4 self-center" >
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
                        className="mt-1 mb-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-700 dark:bg-gray-800  rounded-md"
                        onChange={(e) => setKwargsEndpoint(prevState => ({
                            ...prevState,
                            requestEndpoint: e.target.value
                        }))}
                        value = {kwargsEndpoint.requestEndpoint}
                        required
                    />
                </div>
                <div className={"mt-10 w-2/4 self-center"}>
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
                        className="mt-1 mb-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm  dark:bg-gray-800 border-gray-700 rounded-md"
                        value = {expireSeconds}
                        onChange = {(e) => setExpireSeconds(parseInt(e.target.value))}
                    />
                </div>

                <div className="w-2/4 self-center flex flex-row">
                        <button
                            onClick={handleBack}
                            className="mt-10 bg-purple-400 hover:bg-blue-700 text-white font-bold py-2 px-10 rounded"
                        >
                            Back
                        </button>

                        <button
                            onClick={handleSubmit}
                            className="mt-10 bg-purple-400 hover:bg-blue-700 text-white font-bold py-2 px-10 rounded ml-auto"
                        >
                            Create task
                        </button>
                    </div>
            </div>

            }

            {!atFirstStep && selectedType.id === 2 &&

            <div className="flex flex-col justify-center align-center">
                <div className="w-2/4 mt-5 self-center ">
                    <DropdownMenu selected={selectedRepo} setSelected={setSelectedRepo} options={repoNames} label={"Select your GitHub repository:"} />
                </div>
                <div className={"mt-10 w-2/4 self-center"}>
                    <label
                        className=" dark:text-white block text-sm font-medium text-gray-700"
                    >
                        Image name:
                    </label>
                    <input
                        type="text"
                        className="mt-1 mb-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm  dark:bg-gray-800 border-gray-700 rounded-md"
                        onChange={(e) => {
                            setImageName(e.target.value);
                        }}
                    />
                </div>
                <div className={"mt-10 w-2/4 self-center"}>
                    <label
                        className=" dark:text-white block text-sm font-medium text-gray-700"
                    >
                        Command:
                    </label>
                    <input
                        type="text"
                        placeholder='["echo", "Hello world"]'
                        className="mt-1 mb-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm  dark:bg-gray-800 border-gray-700 rounded-md"
                        onChange={(e) => {
                            setCommand(e.target.value);
                        }}
                    />
                </div>
                <div className={"mt-10 w-2/4 self-center"}>
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
                        className="mt-1 mb-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm  dark:bg-gray-800 border-gray-700 rounded-md"
                    />
                </div>

                <div className="w-2/4 self-center flex flex-row">
                    <button
                        onClick={handleBack}
                        className="mt-10 bg-purple-400 hover:bg-blue-700 text-white font-bold py-2 px-10 rounded"
                    >
                        Back
                    </button>

                    <button
                        onClick={handleSubmit}
                        className="mt-10 bg-purple-400 hover:bg-blue-700 text-white font-bold py-2 px-10 rounded ml-auto"
                    >
                        Create task
                    </button>
                </div>

            </div>

            }
        </div>
    )

}


const mapStateToProps = (state: any) => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
});
export default connect(mapStateToProps, {
    checkAuthenticated,
    load_user,
    createTask,
})(TaskCreate);
