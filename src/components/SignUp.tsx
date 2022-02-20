import { Component } from 'react'
import {Redirect} from "react-router-dom"
import { connect } from "react-redux"
import { toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import { register } from "../redux/actions/auth/"
import { countries} from "../constants/countries";
import background from "../assets/images/background.svg"

toast.configure()
type StateProps = {
  username: string
  first_name: string,
  last_name: string,
  email: string,
  country: string,
  password: string,
  re_password: string,
  street_address: string,
  company: string,
  city: string,
  zip: number,
  state?: string
}

type SignUpProps = {
  register: any,
  isAuthenticated: any
}

class SignUp extends Component<SignUpProps, StateProps> {
  constructor(props: any) {
    super(props)
    this.state = {
      username: "",
      first_name: "",
      last_name: "",
      email: "",
      country: "",
      password: "",
      re_password: "",
      street_address: "",
      company: "",
      city: "",
      zip: 0,
      state: ""
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  componentWillMount() {
    if (this.props.isAuthenticated)
      return <Redirect to="/dashboard" />

  }
  handleChange = (event: any) => {
    const value = event.target.value
    this.setState({
      ...this.state,
      [event.target.name]: value
    })
  }
  handleSubmit = (event: any) => {
    event.preventDefault()
    console.log(this.state)
    this.props.register(this.state)
  }
  render() {
    return (
      <div className="mt-4 flex justify-center">
          <form onSubmit={this.handleSubmit}>
            <div className="shadow overflow-hidden sm:rounded-md flex flex-col">
              <h1 className="self-center font-medium text-gray-700 mt-4 text-lg uppercase font-sans">Sign up</h1>
              <div className="px-4 py-5 bg-white sm:p-6">
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
                      First name
                      </label>
                    <input
                      type="text"
                      name="first_name"
                      id="first_name"
                      autoComplete="given-name"
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      required
                      onChange={this.handleChange}
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">
                      Last name
                      </label>
                    <input
                      type="text"
                      name="last_name"
                      id="last_name"
                      autoComplete="family-name"
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      onChange={this.handleChange}
                      required
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      E-mail address
                      </label>
                    <input
                      type="text"
                      name="email_address"
                      id="email_address"
                      autoComplete="email"
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      required
                      onChange={this.handleChange}
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                      Username
                      </label>
                    <input
                      type="text"
                      name="username"
                      id="username"
                      autoComplete="username"
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      required
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                      Password
                      </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      autoComplete="password"
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      required
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                      Confirm password
                      </label>
                    <input
                      type="password"
                      name="re_password"
                      id="re_password"
                      autoComplete="password"
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      required
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                      Country / Region
                      </label>
                    <select
                      id="country"
                      name="country"
                      autoComplete="country"
                      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      required
                      onChange={this.handleChange}
                    >
                      {
                        countries.map((country: any) =>
                            <option key={country.code}>{country.name}</option>)
                      }
                    </select>
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                      Company
                      </label>
                    <input
                      type="text"
                      name="company"
                      id="company"
                      autoComplete="company"
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      onChange={this.handleChange}
                    />
                  </div>

                  <div className="col-span-6">
                    <label htmlFor="street_address" className="block text-sm font-medium text-gray-700">
                      Street address
                      </label>
                    <input
                      type="text"
                      name="street_address"
                      id="street_address"
                      autoComplete="street-address"
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      onChange={this.handleChange}
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                      City
                      </label>
                    <input
                      type="text"
                      name="city"
                      id="city"
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      required
                      onChange={this.handleChange}
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                      State / Province
                      </label>
                    <input
                      type="text"
                      name="state"
                      id="state"
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      onChange={this.handleChange}
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                    <label htmlFor="postal_code" className="block text-sm font-medium text-gray-700">
                      ZIP / Postal
                      </label>
                    <input
                      type="text"
                      name="postal_code"
                      id="postal_code"
                      autoComplete="postal-code"
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
              </div>
              <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <button
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Register
                  </button>
              </div>
            </div>
          </form>
      </div>
    )
  }
}

const mapStateToProps = (state: any) => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { register })(SignUp)
