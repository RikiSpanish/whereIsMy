import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import spbw from '../../utils/spbw';
import strCut from '../../utils/str-cut';
import geoUrl from '../../utils/geo-url';
import readableTime from '../../utils/readable/readable-time';

import calcGeoDistance from '../../utils/calc/calc-geo-distance';
import calcAccuracy from '../../utils/calc/calc-accuracy';
import calcPoints from '../../utils/calc/calc-points';

import gameConfig from '../../config/game.json';
import cls from './game-results.module.css';

const formulas = `
You can scroll this message.
The formulas could be shortened but they are not - to better understand their sense.

[Formulas]

Guess accuracy (A):
 A = 1 - D / (E / 4); A ≥ 0;

Points (P):
 F = U * Floor(T / I) + 1;
 P = Floor(A / F * M);

[Units]

D - Distance [meters]
T - Time (spent to guess) [seconds]
A - Accuracy [%]
P - Points [1]
E - Earth Circumference [meters]
F - TPE [1]
I - TPE Time [seconds] = ${gameConfig.value.tpeTime}
U - TPE Multiplier [1] = ${gameConfig.value.tpeMul}
M - Max Points [1] = ${gameConfig.value.maxPoints}
Floor - Rounding Down

[Definitions]

"TPE" (Time-Points-Effect) affects the points: the greater the effect, the more points are deducted
"TPE Time" is the time passed to increase the effect. (The effect increases after every N seconds)
"TPE Multiplier" is the effect coefficient: the greater its value, the more points are deducted
`;

function GameResults({ className, map, data }) {
    const [animatedPoints, setAnimatedPoints] = useState(0);
    const [animatedDistanceKm, setAnimatedDistanceKm] = useState(0);
    const [showMiles, setShowMiles] = useState(false);
    
    const cutCoords = a => a.map(el => strCut(el.toString(), 7)).join(',');
    const dst = calcGeoDistance(data.guessPos, data.realPos);
    const acc = calcAccuracy(dst);
    const points = calcPoints(acc, data.time);
    
    const distanceInKm = dst / 1000;
    const distanceInMiles = distanceInKm * 0.621371;
    
    // Calculate display values based on animated km distance
    const displayDistance = showMiles ? animatedDistanceKm * 0.621371 : animatedDistanceKm;
    const distanceUnit = showMiles ? 'miles' : 'km';
    
    const formatNumber = (num) => {
        return Math.round(num).toLocaleString();
    };

    useEffect(() => {
        const animateValue = (start, end, duration, setter) => {
            const startTime = Date.now();
            const animate = () => {
                const elapsed = Date.now() - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const easeOutQuart = 1 - Math.pow(1 - progress, 4);
                const current = start + (end - start) * easeOutQuart;
                setter(current);
                
                if (progress < 1) {
                    requestAnimationFrame(animate);
                }
            };
            animate();
        };

        // Start animations with slight delay - faster duration (1000ms instead of 2000ms)
        setTimeout(() => {
            animateValue(0, points, 1000, setAnimatedPoints);
            animateValue(0, distanceInKm, 1000, setAnimatedDistanceKm);
        }, 500);
    }, [points, distanceInKm]); // Only depend on the calculated values, not showMiles

    return (
        <div className={spbw(className, cls.results)}>
            <div>
                <div className="container">
                    <h2 className="title title-center section-title">Results</h2>
                    <div className={cls.map}>{map}</div>
                    <div className={cls.main}>
                        <div className={cls.resultsTable}>
                            <div className={cls.tableRow}>
                                <div className={cls.tableLabel}>Points</div>
                                <div className={cls.tableValue}>{formatNumber(animatedPoints)}</div>
                            </div>
                            <div className={cls.tableRow}>
                                <div className={cls.tableLabel}>Distance</div>
                                <div className={cls.tableValue}>
                                    {formatNumber(displayDistance)} {distanceUnit}
                                </div>
                            </div>
                            <div className={cls.tableRow}>
                                <div className={cls.tableLabel}></div>
                                <div className={cls.tableValue}>
                                    <button 
                                        className={cls.unitToggle}
                                        onClick={() => setShowMiles(!showMiles)}
                                    >
                                        Switch to {showMiles ? 'kilometers' : 'miles'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <p className={cls.home_link}>
                        <a href="/">Home</a>
                    </p>
                </div>
            </div>
        </div>
    );
}

GameResults.propTypes = {
    className: PropTypes.string,
    map: PropTypes.object,
    data: PropTypes.object
};
GameResults.defaultProps = {
    className: '',
    map: <span />,
    data: {}
};

export default GameResults;