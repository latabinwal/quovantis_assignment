import React from 'react';
import { Field } from 'redux-form';

const InputWithLabel = ({ wrapperClass, placeholder, type, name, label }) => {
	return(
		<div className={wrapperClass}>
			<label>{label}</label>
			<Field
				name={name}
				component="input"
				type={type}
				placeholder={placeholder}
			/>
		</div>
	)
}

export default InputWithLabel;