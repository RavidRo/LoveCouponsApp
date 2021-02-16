import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { SvgXml } from 'react-native-svg';
import zip from 'lodash.zip';

import colors from '../../config/colors';

// const start = [236, 226, 225, 1]; //colors.unknowngrey
const start = [211, 224, 220, 1]; //colors.cyan
const end = [236, 209, 209, 1];
const colorTransition = zip(start, end);
const calculate = (start, end, progress) => {
	return Math.round((end - start) * progress + start);
};
export default function CouponSVG({
	currentPoints = '0',
	maxPoints = 100,
	textColor = colors.dark,
	style,
	mainColor = colors.dark,
	secondaryColor = colors.dark,
	borderColor = colors.dark,
	...otherProps
}) {
	const textSpace =
		currentPoints.length == 1
			? '      '
			: currentPoints.length == 2
			? '    '
			: '  ';

	const progress = Math.min(Number(currentPoints) / maxPoints, 1);
	const [
		back_r,
		back_g,
		back_b,
		back_a,
	] = colorTransition.map(([start, end]) => calculate(start, end, progress));
	const backgroundColor = `rgba(${back_r}, ${back_g}, ${back_b}, ${back_a})`;

	const svg = `
	<svg width="299" height="245" xmlns="http://www.w3.org/2000/svg">
		<defs>
			<g id="svg_1"/>
		</defs>
		<rect x="10.154" y="16.774" width="281.453" height="47.147" style="fill: ${backgroundColor};"/>
		<rect x="23.012" y="61.063" width="259.07" height="9.048" style="fill: ${backgroundColor};"/>
		<rect x="31.584" y="67.255" width="239.545" height="14.287" style="fill: ${backgroundColor};"/>
		<rect x="10.63" y="121.069" width="280.977" height="47.623" style="fill: ${backgroundColor};"/>
		<rect x="25.393" y="112.497" width="249.07" height="11.906" style="fill: ${backgroundColor};"/>
		<rect x="33.966" y="102.019" width="233.83" height="12.382" style="fill: ${backgroundColor};"/>
		<rect x="36.823" y="78.208" width="228.592" height="36.194" style="fill: ${backgroundColor};"/>
		<g>
			<title>Layer 1</title>
			<g id="surface1" transform="matrix(1, 0, 0, 1, 2.240114, 8.400393)">
				<path id="svg_6" fill-rule="nonzero" d="m88.88921,100.60547l9.96875,0l0,9.98828l-9.96875,0l0,-9.98828zm0,0" style="fill: ${secondaryColor};"/>
				<path id="svg_7" fill-rule="nonzero" d="m88.88921,120.58203l9.96875,0l0,9.99219l-9.96875,0l0,-9.99219zm0,0" style="fill: ${secondaryColor};"/>
				<path id="svg_8" fill-rule="nonzero" d="m89.15093,140.5625l9.96484,0l0,9.98828l-9.96484,0l0,-9.98828zm0,0" style="fill: ${secondaryColor};"/>
				<path id="svg_9" fill-rule="nonzero" d="m88.88921,80.625l9.96875,0l0,9.99219l-9.96875,0l0,-9.99219zm0,0" style="fill: ${secondaryColor};"/>
				<path id="svg_10" fill-rule="nonzero" d="m88.88921,60.64844l9.96875,0l0,9.98828l-9.96875,0l0,-9.98828zm0,0" style="fill: ${secondaryColor};"/>
				<path id="svg_11" fill-rule="nonzero" d="m88.88921,40.67188l9.96875,0l0,9.98828l-9.96875,0l0,-9.98828zm0,0" style="fill: ${secondaryColor};"/>
				<path id="svg_12" fill-rule="nonzero" d="m88.88921,20.69141l9.96875,0l0,9.98828l-9.96875,0l0,-9.98828zm0,0" style="fill: ${secondaryColor};"/>
				<path id="svg_13" fill-rule="nonzero" d="m19.12359,20.69141l9.96484,0l0,9.98828l-9.96484,0l0,-9.98828zm0,0" style="fill: ${secondaryColor};"/>
				<path id="svg_14" fill-rule="nonzero" d="m268.28765,20.69141l9.96875,0l0,9.98828l-9.96875,0l0,-9.98828zm0,0" style="fill: ${secondaryColor};"/>
				<path id="svg_15" fill-rule="nonzero" d="m268.28765,140.5625l9.96875,0l0,9.98828l-9.96875,0l0,-9.98828zm0,0" style="fill: ${secondaryColor};"/>
				<path id="svg_16" fill-rule="nonzero" d="m19.12359,140.5625l9.96484,0l0,9.98828l-9.96484,0l0,-9.98828zm0,0" style="fill: ${secondaryColor};"/>
				<path id="svg_17" fill-rule="nonzero" stroke-miterlimit="4" d="m293.56124,60.64841c2.7539,0 4.98438,-2.23828 4.98438,-4.99609l0,-49.94529c0,-2.75781 -2.23047,-4.99218 -4.98438,-4.99218l-289.03141,0c-2.7539,0 -4.98438,2.23437 -4.98438,4.99218l0,49.94529c0,2.75781 2.23047,4.99609 4.98438,4.99609c13.76173,0 24.91408,11.17968 24.91408,24.97264c0,13.79297 -11.15235,24.97264 -24.91408,24.97264c-2.7539,0 -4.98438,2.23828 -4.98438,4.9961l0,49.94528c0,2.75781 2.23047,4.99609 4.98438,4.99609l289.03141,0c2.7539,0 4.98438,-2.23828 4.98438,-4.99609l0,-49.94528c0,-2.75781 -2.23047,-4.9961 -4.98438,-4.9961c-13.76173,0 -24.91408,-11.17968 -24.91408,-24.97264c0,-13.79296 11.15235,-24.97264 24.91408,-24.97264zm-34.55471,29.94139c2.19922,15.36327 14.24219,27.43358 29.57424,29.64061l0,40.30857l-279.07047,0l0,-40.30857c19.07032,-2.74609 32.31252,-20.46093 29.57424,-39.5781c-2.19922,-15.36328 -14.24219,-27.43358 -29.57424,-29.6367l0,-40.31248l279.07047,0l0,40.31248c-19.07032,2.74219 -32.31252,20.46093 -29.57424,39.5742zm0,0" style="fill: ${mainColor}; stroke: ${borderColor};"/>
				<path id="svg_18" fill-rule="nonzero" d="m161.14702,12.57422c-10.32031,0 -18.6875,8.38672 -18.6875,18.73047c0,10.34375 8.36719,18.73047 18.6875,18.73047c10.32032,0 18.6875,-8.38672 18.6875,-18.73047c0,-10.34375 -8.36718,-18.73047 -18.6875,-18.73047zm0,28.09766c-5.16015,0 -9.34375,-4.19532 -9.34375,-9.36719c0,-5.17188 4.1836,-9.36328 9.34375,-9.36328c5.16016,0 9.34375,4.1914 9.34375,9.36328c0,5.17187 -4.18359,9.36719 -9.34375,9.36719zm0,0" style="fill: ${secondaryColor};"/>
				<path id="svg_19" fill-rule="nonzero" d="m157.00249,74.79297l48.25391,-56.39453l4.26562,4.98437l-48.2539,56.39453l-4.26563,-4.98437zm0,0" style="fill: ${secondaryColor};"/>
				<path id="svg_20" fill-rule="nonzero" d="m207.24468,49.41016c-10.32031,0 -18.6875,8.38672 -18.6875,18.73047c0,10.34375 8.36719,18.73046 18.6875,18.73046c10.32031,0 18.6875,-8.38671 18.6875,-18.73046c0,-10.34375 -8.36719,-18.73047 -18.6875,-18.73047zm0,28.09375c-5.16016,0 -9.34375,-4.19141 -9.34375,-9.36328c0,-5.17188 4.18359,-9.36719 9.34375,-9.36719c5.16016,0 9.34375,4.19531 9.34375,9.36719c0,5.17187 -4.18359,9.36328 -9.34375,9.36328zm0,0" style="fill: ${secondaryColor};"/>
				<path id="svg_21" fill="none" stroke-width="11" stroke-miterlimit="4" d="m76.97128,209.81239c0,-8.01562 -6.5586,-14.51171 -14.64845,-14.51171c-8.08985,0 -14.64844,6.49609 -14.64844,14.51171c0,8.01172 6.55859,14.51171 14.64844,14.51171c8.08985,0 14.64845,-6.49999 14.64845,-14.51171zm0,0" style="stroke: ${mainColor};"/>
				<path id="svg_22" stroke-width="11" stroke-miterlimit="4" d="m132.86584,211.16005c0,-8.01172 -6.5586,-14.51171 -14.64845,-14.51171c-8.08985,0 -14.64844,6.49999 -14.64844,14.51171c0,8.01561 6.55859,14.51171 14.64844,14.51171c8.08985,0 14.64845,-6.49609 14.64845,-14.51171zm0,0" style="fill: none; stroke: ${mainColor};"/>
				<path id="svg_23" fill-rule="nonzero" stroke-width="13" stroke-miterlimit="4" d="m114.00248,158.5898l-27.74216,38.1289c-3.63671,4.99219 -6.64452,8.9961 -6.71874,8.9414c-0.07422,-0.05469 2.8125,-4.14843 6.4453,-9.14063l27.74216,-38.1289c3.63671,-4.99219 6.64452,-8.99609 6.71874,-8.9414c0.07422,0.05469 -2.8125,4.14844 -6.4453,9.14063zm0,0" style="fill: ${mainColor}; stroke: ${mainColor};"/>
				<path id="svg_24" fill-rule="nonzero" stroke-width="13" stroke-miterlimit="4" d="m83.08063,173.90636l15.14452,24.26565c1.98437,3.17969 3.52734,5.79297 3.44921,5.84376c-0.07813,0.05078 -1.74999,-2.48828 -3.73437,-5.66406l-15.14452,-24.26565c-1.98438,-3.17969 -3.53125,-5.79688 -3.45312,-5.84376c0.08203,-0.05078 1.7539,2.48828 3.73828,5.66407zm0,0" style="fill: ${mainColor}; paint-order: fill; stroke: ${mainColor};"/>
				<path id="svg_26" fill="none" stroke-width="13" stroke-miterlimit="4" d="m81.56493,202.67191l-4.69141,7.41016" style="stroke: ${mainColor};"/>
				<text transform="matrix(1.5542350381025256,0,0,2.024687458681216,-108.7008725312282,-107.6921298904897) " id="svg_35" style="fill: ${textColor}; font-family: 'Courier New', Courier, monospace; font-size: 24px; font-style: italic; font-weight: 700; stroke-dashoffset: -35px; stroke-miterlimit: 1; stroke-width: 0px; white-space: pre; vector-effect: non-scaling-stroke;" x="144.387" y="120.486">${textSpace}${currentPoints}/${maxPoints}</text>
			</g>
		</g>
	</svg>`;
	const SVGProp = () => <SvgXml xml={svg} />;
	return (
		<View
			style={[{ transform: [{ rotateZ: '-14deg' }] }, style]}
			{...otherProps}
		>
			<SVGProp />
		</View>
	);
}

CouponSVG.propTypes = {
	currentPoints: PropTypes.string,
	maxPoints: PropTypes.number,
	textColor: PropTypes.string,
	style: PropTypes.object,
	backgroundColor: PropTypes.string,
	mainColor: PropTypes.string,
	secondaryColor: PropTypes.string,
	borderColor: PropTypes.string,
};
