import React from 'react';
import {loadStripe} from '@stripe/stripe-js'
import {Elements} from '@stripe/react-stripe-js';
import Checkout from '../containers/Customers/Checkout';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const Stripe = ({user}) => {
	return (
			<Elements stripe={stripePromise}>
				<Checkout user={user} />
			</Elements>

	);
};

export default Stripe;