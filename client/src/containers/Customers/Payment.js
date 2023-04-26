// import React from "react";
// import Product from '../../components/product'
// import axios from "axios";
// import { URL } from "../../config"
// import { useNavigate } from "react-router-dom";

// import { useStripe } from "@stripe/stripe-js";


// const Payment = ({orders}) => {
//   const navigate = useNavigate();
//   const stripe = useStripe();

//   const calculate_total = () => {
//     let total = 0;
//     orders.forEach((ele) => (total += ele.quantity * ele.price));
//     return total;
//   };

//   // 1. When we click PAY button this function triggers first
//   const createCheckoutSession = async () => {
//     try {
//       debugger;
//       // 2. Sending request to the create_checkout_session controller and passing products to be paid for
//       const response = await axios.post(
//         `${URL}/payment/create-checkout-session`,
//         { orders }
//       );
//       return response.data.ok
//         ? // we save session id in localStorage to get it later
//           (localStorage.setItem(
//             "sessionId",
//             JSON.stringify(response.data.sessionId)
//           ),
//           // 9. If server returned ok after making a session we run redirect() and pass id of the session to the actual checkout / payment form
//           redirect(response.data.sessionId))
//         : navigate("/payment/error");
//     } catch (error) {
//       navigate("/payment/error");
//     }
//   };

//   const redirect = (sessionId) => {
//     debugger;
//     // 10. This redirects to checkout.stripe.com and if charge/payment was successful send user to success url defined in create_checkout_session in the controller (which in our case renders payment_success.js)
//     stripe
//       .redirectToCheckout({
//         // Make the id field from the Checkout Session creation API response
//         // available to this file, so you can provide it as parameter here
//         // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
//         sessionId: sessionId,
//       })
//       .then(function (result) {
//         // If `redirectToCheckout` fails due to a browser or network
//         // error, display the localized error message to your customer
//         // using `result.error.message`.
//       });
//   };
//   //=====================================================================================
//   //=====================================================================================
//   //=====================================================================================
//   return (
//     <div className="checkout_container">
//       <div className="header">Checkout - Check products before pay</div>
//       <div className="products_list">
//         {orders.map((item, idx) => {
//           return <Product key={idx} {...item} />;
//         })}
//       </div>
//       <div className="footer">
//         <div className="total">Total : {calculate_total()} €</div>
//         <button className="button" onClick={() => createCheckoutSession()}>
//           PAY
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Payment;

