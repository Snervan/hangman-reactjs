import React from 'react'
import PropTypes from 'prop-types'
import './GuessWord.css'

const HIDDENSYMBOL = '_'

const GuessWord = ({index, letter, feedback}) => (
	<div className={`letter ${letter} ${feedback}`}>
		{letter === ' ' ? "\u00A0" : feedback === 'hidden' ? HIDDENSYMBOL : letter}
	</div>
)

GuessWord.propTypes = {
	feedback: PropTypes.oneOf([
		'hidden',
		'visible'
	]).isRequired,
	letter: PropTypes.string.isRequired,
	index: PropTypes.number.isRequired,
}

GuessWord.defaultProps = {
	feedback: 'hidden',
}


export default GuessWord