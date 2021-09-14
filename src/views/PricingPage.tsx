import { Component } from "react";
import Card from "../components/PricingCard";
import { motion } from "framer-motion";
import { bareAPI } from "../api/";
type PricingState = {
  price: Array<Object>;
  monthly: boolean;
};

class Pricing extends Component<PricingState, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      prices: [],
      monthly: true,
    };
  }
  componentWillMount() {
    bareAPI.get("/api/v1/products/").then((res) => {
      this.setState({ prices: res.data });
    });
  }
  render() {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <section className="text-gray-600 body-font overflow-hidden">
          <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-col text-center w-full mb-20">
              <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">
                Pricing
              </h1>
              <p className="lg:w-2/3 mx-auto leading-relaxed text-base text-gray-500">
                Choose a subscription package.
              </p>
              <div className="flex mx-auto border-2 border-indigo-500 rounded overflow-hidden mt-6">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={`${this.state.monthly ? "py-1 px-4 bg-indigo-500 text-white focus:outline-none" : "py-1 px-4 focus:outline-none"}`}
                  onClick={() =>
                    this.setState({ monthly: !this.state.monthly })
                  }
                >
                  Monthly
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={`${!this.state.monthly ? "py-1 px-4 bg-indigo-500 text-white focus:outline-none" : "py-1 px-4 focus:outline-none"}`}
                  onClick={() =>
                    this.setState({ monthly: !this.state.monthly })
                  }
                >
                  Annually
                </motion.button>
              </div>
            </div>
            <div className="flex flex-wrap -m-4">
              {this.state.prices.map((product: any) => (
                <Card
                  plan={product.name}
                  price={
                    this.state.monthly
                      ? product.plan_set[0].amount
                      : product.plan_set[1].amount
                  }
                  id={product.plan_set[0].id}
                  metadata={product.metadata}
                  isPopular={product.name === "Professional Plan"}
                  monthly={this.state.monthly}
                />
              ))}
            </div>
          </div>
        </section>
      </motion.div>
    );
  }
}

export default Pricing;
