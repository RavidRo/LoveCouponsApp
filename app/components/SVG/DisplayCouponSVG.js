import React from 'react';
import PropTypes from 'prop-types';
import { SvgXml } from 'react-native-svg';

import colors from '../../config/colors';

export default function DisplayCouponSVG({
	rarityColor = colors.legendary,
	color = colors.black,
}) {
	const svg = `<svg width="480.00000000000006" height="280" xmlns="http://www.w3.org/2000/svg"> <g>  <title>background</title>  <rect x="-1" y="-1" width="230.5727" height="135.33408" id="canvas_background" fill="none"/> </g> <g>  <title>Layer 1</title>  <rect fill="${rarityColor}" stroke-width="1.5" x="431.5" y="16.45313" width="38" height="79" id="svg_67"/>  <rect fill="${rarityColor}" stroke-width="1.5" x="431.5" y="180.45313" width="38" height="79" id="svg_65"/>  <rect fill="${rarityColor}" stroke-width="1.5" x="422.5" y="166.45312" width="14" height="93" id="svg_64"/>  <rect fill="${rarityColor}" stroke-width="1.5" x="423.5" y="16.45312" width="16" height="94" id="svg_62"/>  <rect fill="${rarityColor}" stroke-width="1.5" x="349.5" y="15.45313" width="78" height="249.99999" id="svg_61"/>  <g id="svg_1">   <g id="svg_2">    <rect stroke="${color}" fill="#000000" x="340" y="164" width="16" height="16" id="svg_3"/>   </g>  </g>  <g id="svg_4">   <g id="svg_5">    <rect stroke="#000000" fill="#000000" x="340" y="196" width="16" height="16" id="svg_6"/>   </g>  </g>  <g id="svg_7">   <g id="svg_8">    <rect stroke="#000000" fill="#000000" x="340" y="228" width="16" height="16" id="svg_9"/>   </g>  </g>  <g id="svg_10">   <g id="svg_11">    <rect stroke="#000000" fill="#000000" x="340" y="132" width="16" height="16" id="svg_12"/>   </g>  </g>  <g id="svg_13">   <g id="svg_14">    <rect stroke="#000000" fill="#000000" x="340" y="100" width="16" height="16" id="svg_15"/>   </g>  </g>  <g id="svg_16">   <g id="svg_17">    <rect stroke="#000000" fill="#000000" x="340" y="68" width="16" height="16" id="svg_18"/>   </g>  </g>  <g id="svg_19">   <g id="svg_20">    <rect stroke="#000000" fill="#000000" stroke-width="0" x="340" y="36" width="16" height="16" id="svg_21"/>   </g>  </g>  <g id="svg_22">   <g id="svg_23">    <rect stroke="#000000" fill="#000000" x="32" y="35" width="16" height="16" id="svg_24"/>   </g>  </g>  <g id="svg_25">   <g id="svg_26">    <rect stroke="#000000" fill="#000000" x="432" y="35" width="16" height="16" id="svg_27"/>   </g>  </g>  <g id="svg_28">   <g id="svg_29">    <rect stroke="#000000" fill="#000000" x="432" y="227" width="16" height="16" id="svg_30"/>   </g>  </g>  <g id="svg_31">   <g id="svg_32">    <rect stroke="#000000" fill="#000000" x="32" y="227" width="16" height="16" id="svg_33"/>   </g>  </g>  <g id="svg_34">   <g id="svg_35">    <path stroke="#000000" fill="#000000" d="m472,99c4.418,0 8,-3.582 8,-8l0,-80c0,-4.418 -3.582,-8 -8,-8l-464,0c-4.418,0 -8,3.582 -8,8l0,80c0,4.418 3.582,8 8,8c22.091,0 40,17.909 40,40s-17.909,40 -40,40c-4.418,0 -8,3.582 -8,8l0,80c0,4.418 3.582,8 8,8l464,0c4.418,0 8,-3.582 8,-8l0,-80c0,-4.418 -3.582,-8 -8,-8c-22.091,0 -40,-17.909 -40,-40s17.909,-40 40,-40zm-55.476,47.956c3.532,24.61 22.867,43.944 47.476,47.476l0,64.568l-448,0l0,-64.568c30.614,-4.394 51.87,-32.773 47.476,-63.388c-3.532,-24.609 -22.866,-43.944 -47.476,-47.476l0,-64.568l448,0l0,64.568c-30.614,4.394 -51.87,32.773 -47.476,63.388z" id="svg_36"/>   </g>  </g>  <g id="svg_46"/>  <g id="svg_47"/>  <g id="svg_48"/>  <g id="svg_49"/>  <g id="svg_50"/>  <g id="svg_51"/>  <g id="svg_52"/>  <g id="svg_53"/>  <g id="svg_54"/>  <g id="svg_55"/>  <g id="svg_56"/>  <g id="svg_57"/>  <g id="svg_58"/>  <g id="svg_59"/>  <g id="svg_60"/> </g></svg>`;

	const SVGProp = () => <SvgXml xml={svg} />;
	return <SVGProp />;
}

DisplayCouponSVG.propTypes = {
	color: PropTypes.string,
	rarityColor: PropTypes.string,
};
