import { Component } from 'react'

class Dashboard extends Component {

    render() {
        return (
            <>
                <section className="text-gray-600 body-font relative">
                    <div className="container px-5 py-24 mx-auto flex sm:flex-nowrap flex-wrap">
                        <div className="lg:w-2/3 md:w-1/2 bg-gray-300 rounded-lg overflow-hidden sm:mr-10 p-10 flex items-end justify-start relative">
                            <iframe
                                className="absolute inset-0"
                                style={{ filter: "grayscale(1) contrast(1.2) opacity(0.4)" }}
                                title="map"
                                marginHeight={0}
                                marginWidth={0}
                                scrolling="no"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2769.5671017972545!2d14.485786515830137!3d46.03978560287218!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47652d4107c73b83%3A0xad1f763faa111f58!2sGerbi%C4%8Deva%20ulica%2C%201000%20Ljubljana!5e0!3m2!1sen!2ssi!4v1632006189129!5m2!1sen!2ssi"
                                width="100%"
                                height="100%"
                                frameBorder={0}
                            />
                            <div className="bg-white relative flex flex-wrap py-6 rounded shadow-md">
                                <div className="lg:w-1/2 px-6">
                                    <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs">
                                        Gerbičeva ulica
                                    </h2>
                                    <p className="mt-1">
                                        Top of the damn shelf offices.
                                    </p>
                                </div>
                                <div className="lg:w-1/2 px-6 mt-4 lg:mt-0">
                                    <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs">
                                        EMAIL
                                    </h2>
                                    <a className="text-indigo-500 leading-relaxed">support@shigo.to</a>
                                    <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs mt-4">
                                        PHONE
                                    </h2>
                                    <p className="leading-relaxed">00386-70-681-003</p>
                                </div>
                            </div>
                        </div>
                        <div className="lg:w-1/3 md:w-1/2 bg-white flex flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0">
                            <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">
                                Feedback
                            </h2>
                            <p className="leading-relaxed mb-5 text-gray-600">
                                Report a bug, or just say hi.
                            </p>
                            <div className="relative mb-4">
                                <label htmlFor="name" className="leading-7 text-sm text-gray-600">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                />
                            </div>
                            <div className="relative mb-4">
                                <label htmlFor="email" className="leading-7 text-sm text-gray-600">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                />
                            </div>
                            <div className="relative mb-4">
                                <label htmlFor="message" className="leading-7 text-sm text-gray-600">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                                    defaultValue={""}
                                />
                            </div>
                            <button className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                                Button
                            </button>
                            <p className="text-xs text-gray-500 mt-3">
                                We read everything, just sayin'.
                            </p>
                        </div>
                    </div>
                </section>
            </>)
    }
}

export default Dashboard
