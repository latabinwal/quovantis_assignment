import React from 'react';

const Pagination = ({pageNumbers, onClickPrev, onClickNext, onClickList}) => {
	return(
		<ul className="pagination__list">
			<li onClick={onClickPrev}>Prev</li>
			{pageNumbers.map((number) => (
				<li key={number} onClick={()=>{onClickList(number)}}>{number}</li>
			))}
			<li onClick={onClickNext}>Next</li>
		</ul>	
	)
}

export default Pagination