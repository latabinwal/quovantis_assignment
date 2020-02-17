import React from 'react';

const ErrorAlert = ({ message, className }) => {
	return(
		<div className={className}>{message}</div>
	)
}

export default ErrorAlert;