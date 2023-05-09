import calcGeoArea from "../calc/calc-geo-area";
import scaleArray from "../scale-array";
import randChance from "./rand-chance";
import randRange from "./rand-range";

import geoPolygons from '../../config/geo-polygons.json';
// Just a note:
// JSON.stringify(obj.map(el => el.map(el => el.map(el => +el.toFixed(6)))));

function allPolygons(obj) { // I think it will be useful when I make nested regions
    if (obj instanceof Array) return obj;
    return Object.values(obj).reduce((res, curr) => [...res, ...allPolygons(curr)]);
}

export default function genRandomCoords(region) {
    const regPlg = allPolygons(region === 'wrl' ? geoPolygons : geoPolygons[region]);
    const proportions = scaleArray(regPlg.map(el => calcGeoArea(...el)), 10000, 6);

    const randPlg = regPlg[randChance(proportions)];
    return [
        randRange(randPlg[0][0], randPlg[1][0], false),
        randRange(randPlg[0][1], randPlg[1][1], false)
    ];
}
