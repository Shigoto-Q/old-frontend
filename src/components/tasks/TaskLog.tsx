import { useEffect, useState } from "react"
import DataTable from 'react-data-table-component'
import { Link } from "react-router-dom"
import { taskTypes, taskWsActions } from '../../constants/wsChannels'

const TaskLog = () => {
    const [tasks, setTasks] = useState<any[]>([])
    const token = localStorage.getItem("access")
    const handleWebsocket = () => {
        const ws = new WebSocket(`${process.env.REACT_APP_WEBSOCKET_URL}`)
        const resultSubscribe = {
            action: taskWsActions.SUBSCRIBE,
            token: token,
            topic: taskTypes.taskResults,
        }
        ws.onopen = (event) => {
            ws.send(JSON.stringify(resultSubscribe))
        }
        ws.onmessage = (message) => {
            let parsedMessage = JSON.parse(message.data)
            setTasks(prevState => [...prevState, parsedMessage])
        }
        ws.onerror = (error) => {
            console.log(error)
        }
        ws.onclose = (event) => {
            console.log(event)
            console.log('disconnected')
        }
    }

    useEffect(() => {
        handleWebsocket()
        // eslint-disable-next-line
    }, ['a'])

    const columns = [
        {
            name: 'Task ID',
            selector: 'task_id',
            sortable: true,
            cell: (row: any) => <Link className="text-blue-800" to={`${row.task_id}/result`}>{row.task_id}</Link>
        },
        {
            name: 'Task name',
            selector: 'task_name',
            sortable: true,
        },
        {
            name: 'Status',
            selector: 'status',
            sortable: true,
            width: "150px",
            cell: (row: any) => <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-${(row.status === 'SUCCESS') ? ('green') : ((row.status === 'FAILURE') ? 'red' : 'yellow')}-100 text-black-800`}>{row.status}</span >
        },
        {
            name: 'Date done',
            selector: 'date_done',

            sortable: true,
        },
        {
            name: 'Date created',
            selector: 'date_created',
            sortable: true,
        },
        {
            name: 'Created by',
            selector: 'user',
            sortable: true,
        },
    ];
    return (
        <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <DataTable title="Tasks logs" columns={columns} data={tasks} pagination />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TaskLog
