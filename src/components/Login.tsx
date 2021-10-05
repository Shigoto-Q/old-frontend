import { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { checkAuthenticated, load_user, login } from "../redux/actions/auth/"
import logoIcon from "../assets/shigoto2/PNG/shigoto2-04.png";
import Spinner from './Spinner'


type LoginProps = {
  login: any,
  load_user: any,
  isAuthenticated: any,
  checkAuthenticated: any,
  checkedAuth: any,
  user: any
}

const Login = ({ login, load_user, isAuthenticated, checkAuthenticated, checkedAuth, user }: LoginProps) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    checkAuthenticated()
  }, [])



  if (checkedAuth && isAuthenticated && user)
    return <Redirect to="/dashboard/tasks" />
  const handleSubmit = (e: any) => {
    e.preventDefault()
    login(username, password).then(() => {
      load_user()
    })
  }
  return (
    <div>
      {(checkedAuth && !isAuthenticated) ? <div className="flex items-center justify-center">
    <div className="max-w-md w-full space-y-8">
      <div>
        <img src={logoIcon} alt="logo"/>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
    </h2>
        <p className="text-center text-sm text-gray-600">
          Or <Link to="/pricing" className="font-medium text-indigo-600 hover:text-indigo-500">start your 14-day free trial</Link>
        </p>
      </div>
      <form className="mt-8 space-y-6" onSubmit={e => handleSubmit(e)}>
        <input type="hidden" name="remember" defaultValue="true" />
        <div className="rounded-md shadow-sm -space-y-px">
          <div>
            <label htmlFor="username" className="sr-only">Username</label>
            <input id="username" name="username" type="username" autoComplete="username" required
                   className="appearance-none rounded-none relative block w-full px-3 py-2 mb-2
                   border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md
                   focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Username" onChange={e => setUsername(e.target.value)} />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">Password</label>
            <input id="password" name="password" type="password" autoComplete="current-password" required
                   className="appearance-none rounded-none relative block w-full px-3 py-2 border
                   border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none
                   focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                   placeholder="Password" onChange={e => setPassword(e.target.value)} />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input id="remember_me" name="remember_me" type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
            <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900">
              Remember me
        </label>
          </div>
          <div className="text-sm">
            <Link to="/" className="font-medium text-indigo-600 hover:text-indigo-500">
              Forgot your password?
        </Link>
          </div>
        </div>
        <div>
          <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
              {/* Heroicon name: solid/lock-closed */}
              <svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
            </span>
        Sign in
      </button>
        </div>
      </form>
    </div>
  </div> : <Spinner />}
    </div>
  )
}

const mapStateToProps = (state: any) => ({
  isAuthenticated: state.auth.isAuthenticated,
  checkedAuth: state.auth.checkedAuth,
  user: state.auth.user
})

export default connect(mapStateToProps, { login, load_user, checkAuthenticated })(Login);
