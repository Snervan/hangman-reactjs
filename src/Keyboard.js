import React from 'react'
import PropTypes from 'prop-types'

import './Keyboard.css'


const Keyboard = ({feedback, letter, index, onMouseDown}) => (
	<div className={`key ${index}`}>
		<button onKeyDown={(e) => {e.preventDefault()}} className={`key ${feedback}`} type='button' onMouseDown={() => onMouseDown(letter)}>{letter}</button>
	</div>
)

Keyboard.propTypes = {
	letter: PropTypes.string.isRequired,
	index: PropTypes.number.isRequired,
	feedback: PropTypes.string.isRequired,
	onMouseDown: PropTypes.func.isRequired,
}

Keyboard.defaultProps = {
	feedback: "",
}

export default Keyboard