import React, {Component} from 'react'
import PropTypes from 'prop-types'
import './Pendu.css'

var [
		baseX1,
		baseY1,
		baseX2,
		baseY2,
		batonX1,
		batonX2,
		batonY2,
		baton2X2,
		baton2Y2,
		supportX1,
		supportX2,
		supportY1,
		supportY2,
		baton3X1,
		baton3X2,
		baton3Y2,
		circleX,
		circleY,
		rayon,
		torseX1,
		torseX2,
		torseY1,
		torseY2,
		bras1X1,
		bras1Y1,
		bras1X2,
		bras1Y2,
		bras2X1,
		bras2Y1,
		bras2X2,
		bras2Y2,
		jambe1X1,
		jambe1Y1,
		jambe1X2,
		jambe1Y2,
		jambe2X1,
		jambe2Y1,
		jambe2X2,
		jambe2Y2 
	] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

export default class MonPendu extends Component {

	drawLine(wrongAnswer) {
		switch(wrongAnswer) {
			case 1:
				[baseY1, baseX2, baseY2] = [300, 300, 300]
				break
			case 2:
				[batonX1, batonX2, batonY2] = [20, 20, 400]
				break
			case 3:
				[baton2X2, baton2Y2] = [200, 0]
				break
			case 4:
			 	[supportX1, supportY1, supportX2, supportY2] = [20, 40, 50, 0]
			 	break
			case 5:
				[baton3X1, baton3Y2, baton3X2] = [180, 100, 180]
				break
			case 6:
				[circleX, circleY, rayon] = [180, 100, 20]
				break
			case 7:
				[torseX1, torseY1, torseX2,  torseY2] = [180, 120, 180, 200]
				break
			case 8:
				[bras1X1, bras1Y1, bras1X2, bras1Y2] = [180, 150, 200, 175]
				break
			case 9:
				[bras2X1, bras2Y1, bras2X2, bras2Y2] = [180, 150, 160, 175]
				break
			case 10:
				[jambe1X1, jambe1Y1, jambe1X2, jambe1Y2] = [180, 199, 150, 270]
				break
			case 11:
				[jambe2X1, jambe2Y1, jambe2X2, jambe2Y2] = [180, 199, 210, 270]
				break
			default:
				break
		}
	}

	wonOrLost(wrongAnswer) {
		if(wrongAnswer === 0) {
			[
			 baseX1,
			 baseY1,
			 baseX2,
			 baseY2,
			 batonX1,
			 batonX2,
			 batonY2,
			 baton2X2,
			 baton2Y2,
			 supportX1,
			 supportX2,
			 supportY1,
			 supportY2,
			 baton3X1,
			 baton3X2,
			 baton3Y2,
			 circleX,
			 circleY,
			 rayon,
			 torseX1,
			 torseX2,
			 torseY1,
			 torseY2,
			 bras1X1,
			 bras1Y1,
			 bras1X2,
			 bras1Y2,
			 bras2X1,
			 bras2Y1,
			 bras2X2,
			 bras2Y2,
			 jambe1X1,
			 jambe1Y1,
			 jambe1X2,
			 jambe1Y2,
			 jambe2X1,
			 jambe2Y1,
			 jambe2X2,
			 jambe2Y2
			] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
		} else {
			this.drawLine(wrongAnswer)
		}
		
	}

	render() {
		const Pendu = ({wrongAnswer}) => (
			<div feedback={this.wonOrLost(wrongAnswer)}>
				<svg width={228} height={300} style={{marginTop: "15px"}}>
					<line x1={baseX1} y1={baseY1} x2={baseX2} y2={baseY2} strokeWidth="5" stroke="green" />
					<line x1={batonX1} y1="0" x2={batonX2} y2={batonY2} strokeWidth="5" stroke="green" />
					<line x1="0" y1="0" x2={baton2X2} y2={baton2Y2} strokeWidth="5" stroke="green" />
					<line x1={supportX1} y1={supportY1} x2={supportX2} y2={supportY2} strokeWidth="5" stroke="green" />
					<line x1={baton3X1} y1={0} x2={baton3X2} y2={baton3Y2} strokeWidth="5" stroke="GoldenRod" />
					<circle cx={circleX} cy={circleY} r={rayon} stroke="black" strokeWidth="3" fill="white" />
					<line x1={torseX1} y1={torseY1} x2={torseX2} y2={torseY2} strokeWidth="5" stroke="black" />
					<line x1={bras1X1} y1={bras1Y1} x2={bras1X2} y2={bras1Y2} strokeWidth="5" stroke="black" />
					<line x1={bras2X1} y1={bras2Y1} x2={bras2X2} y2={bras2Y2} strokeWidth="5" stroke="black" />
					<line x1={jambe1X1} y1={jambe1Y1} x2={jambe1X2} y2={jambe1Y2} strokeWidth="5" stroke="black" />
					<line x1={jambe2X1} y1={jambe2Y1} x2={jambe2X2} y2={jambe2Y2} strokeWidth="5" stroke="black" />
				</svg>
			</div>
		)

		Pendu.propTypes = {
			guesses: PropTypes.number.isRequired,
		}

		Pendu.defaultProps = {
			guesses: 0,
		}

		return(
			<Pendu wrongAnswer={this.props.wrongAnswer} />
		)
	}
}