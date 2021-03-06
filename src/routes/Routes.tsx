import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom"
import Layout from "../layout/Layout"
import UserLayout from "../layout/UserLayout"
import Home from "../views/HomePage"
import { AnimatePresence } from 'framer-motion'
import { lazy } from "react"

const isUserLoggedIn = () => localStorage.getItem('isAuthenticated')

const Routes = () => {
    return (
        <Router>
            <AnimatePresence exitBeforeEnter>
                <Switch >
                    <Route path='/dashboard/:path?'>
                        <UserLayout>
                            <Switch>
                                <Route exact path='/dashboard' component={lazy(() => import("../views/Dashboard"))} />
                                <Route exact path='/dashboard/task/create' component={lazy(() => import("../views/TaskCreateView"))} />
                                <Route exact path='/dashboard/tasks' component={lazy(() => import("../views/TaskDashboard"))} />
                                <Route exact path='/dashboard/scheduler' component={lazy(() => import("../views/DashboardCron"))} />
                                <Route exact path='/dashboard/logs' component={lazy(() => import("../components/tasks/TaskLog"))} />
                                <Route exact path='/dashboard/profile-settings' component={lazy(() => import("../views/UserProfile"))} />
                                <Route path="/dashboard/:id/result/" component={lazy(() => import("../views/ResultView"))} />
                            </Switch>
                        </UserLayout>
                    </Route>
                    <Route>
                        <Layout>
                            <Switch>
                                <Route exact path='/' component={Home} render={() => { return isUserLoggedIn() ? <Redirect to='/home' /> : <Redirect to='/login' /> }} />
                                <Route exact path='/login' component={lazy(() => import("../components/Login"))} />
                                <Route exact path='/signup' component={lazy(() => import("../components/SignUp"))} />
                                <Route exact path='/pricing' component={lazy(() => import("../views/PricingPage"))} />
                                <Route exact path='/team' component={lazy(() => import("../views/TeamView"))} />
                                <Route exact path='/contact' component={lazy(() => import("../views/ContactView"))} />
                                <Route exact path ='/features' component={lazy(() => import("../views/FeaturesPage"))} />
                            </Switch>
                        </Layout>
                    </Route>
                </Switch>
            </AnimatePresence>
        </Router>
    )
}

export default Routes
