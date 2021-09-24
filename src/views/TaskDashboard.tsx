import { Component } from "react";
import TaskTable from "../components/tasks/TasksTable";
import TaskCard from "../components/tasks/TaskCard";
import {Slide, toast} from "react-toastify";


const token = localStorage.getItem("access");


type TaskStatus = {
    taskStatus: Object;
    options: any;
    data: any;
};

function getDate() {
    var currentdate = new Date();
    var datetime =
        currentdate.getHours() +
        ":" +
        currentdate.getMinutes() +
        ":" +
        currentdate.getSeconds();
    return datetime;
}

class Dashboard extends Component<TaskStatus, any> {
    _isMounted = false;
    constructor(props: any) {
        super(props);
        this.state = {
            taskStatus: Object,
            successData: [],
            failData: [],
            pendingData: [],
            time: [],
            oldSuccess: 0,
            oldFail: 0,
            oldPending: 0,
            show: false,
        };
        this.close = this.close.bind(this);
        this.toggleDrawer = this.toggleDrawer.bind(this);
    }
    close() {
        this.setState({ show: false });
    }

    toggleDrawer() {
        this.setState({ show: true });
    }

    componentWillMount() {
        this._isMounted = true;
        let ws = new WebSocket(`wss://ws.shigoto.live/status?token=${token}`);

        ws.onopen = () => {
            toast("Fetching task statuses", {
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
        };
        ws.onmessage = (message) => {
            if (this._isMounted) {
                this.setState({ taskStatus: JSON.parse(message.data)[0] });
                this.setState({
                    successData: [
                        ...this.state.successData,
                        JSON.parse(message.data)[0]["Success"],
                    ],
                });
                var frstLast = this.state.successData[
                    this.state.successData.length - 1
                ];
                var scnLast = this.state.successData[this.state.successData.length - 2];

                this.setState({
                    oldSuccess: (frstLast - scnLast) / 100,
                });

                this.setState({
                    failData: [
                        ...this.state.failData,
                        JSON.parse(message.data)[0]["Failure"],
                    ],
                });
                var fLast = this.state.failData[this.state.failData.length - 1];
                var f1Last = this.state.failData[this.state.failData.length - 2];

                this.setState({
                    oldFail: (fLast - f1Last) / 100,
                });
                this.setState({
                    pendingData: [
                        ...this.state.pendingData,
                        JSON.parse(message.data)[0]["Pending"],
                    ],
                });
                var pLast = this.state.pendingData[this.state.pendingData.length - 1];
                var p1Last = this.state.pendingData[this.state.pendingData.length - 2];

                this.setState({
                    oldPending: (pLast - p1Last) / 100,
                });
                this.setState({
                    time: [...this.state.time, getDate()],
                });
                if (this.state.time.length > 5) {
                    this.state.time.shift(1);
                }
                if (this.state.successData.length > 5) {
                    this.state.successData.shift(1);
                }
                if (this.state.failData.length > 5) {
                    this.state.failData.shift(1);
                }
                if (this.state.pendingData.length > 5) {
                    this.state.pendingData.shift(1);
                }
            }
        };
        ws.onclose = () => {
            this._isMounted = false;
            console.log("disconnected");
        };
    }
    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        return (
            <div>
                <div className="divide-opacity-10 divide-y-8 divide-purple-100 divide-solid">
                    <main>
                        <div className="flex flex-col md:flex-row gap-4">
                            <TaskCard
                                cats={this.state.time}
                                label="Successful"
                                total={this.state.taskStatus["Success"]}
                                data={this.state.successData}
                                oldTotal={this.state.oldSuccess}
                            />
                            <TaskCard
                                cats={this.state.time}
                                label="Failed"
                                total={this.state.taskStatus["Failure"]}
                                data={this.state.failData}
                                oldTotal={this.state.oldFail}
                            />
                            <TaskCard
                                cats={this.state.time}
                                label="Pending"
                                total={this.state.taskStatus["Pending"]}
                                data={this.state.pendingData}
                                oldTotal={this.state.oldPending}
                            />
                        </div>
                    </main>
                    <TaskTable />
                </div>
            </div>
        );
    }
}

export default Dashboard;
