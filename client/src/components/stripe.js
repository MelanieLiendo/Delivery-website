import React from 'react';
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/stripe-js';
import Payment from '../containers/Customers/Payment'

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const Stripe = (props) => {
	return (

			<Elements stripe={stripePromise}>
				<Payment {...props} />
			</Elements>

	);
};

export default Stripe;