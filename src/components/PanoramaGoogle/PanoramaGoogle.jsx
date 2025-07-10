import {Wrapper} from '@googlemaps/react-wrapper';
import PropTypes from 'prop-types';

import Map from '../UI/Map/Map';

import spbw from '../../utils/spbw';
import arrToLLObj from '../../utils/arr-to-ll-obj';
import genRandomCoords from '../../utils/random/gen-random-coords';

import api from '../../config/api';
import eventConfig from '../../config/events.json';

function PanoramaGoogle({ className, getParams, utils, realPos }) {
    // Get zoom level from params, default to 15 if not specified
    const satelliteZoom = getParams.zoom ? parseInt(getParams.zoom) : 15;

    return (
        <Wrapper apiKey={api.googleMapsApiKey}>
            <Map
                type="map"
                className={spbw(className, 'satellite-view')}
                options={{
                    mapTypeId: 'satellite',
                    zoom: satelliteZoom,
                    disableDefaultUI: true,
                    draggable: false,
                    scrollwheel: false,
                    disableDoubleClickZoom: true,
                    keyboardShortcuts: false,
                    gestureHandling: 'none'
                }}
                onMount={map => {
                    function getRandomLocation(n = 1) {
                        if (n <= 0) return;
                        const randomCoords = genRandomCoords(getParams.region);
                        const location = arrToLLObj(randomCoords);
                        
                        realPos.current = [randomCoords[0], randomCoords[1]];
                        map.setCenter(location);
                        map.setZoom(satelliteZoom);
                        utils.timer.itvId = setInterval(() => utils.timer.nextSec(), 1000);
                    }
                    getRandomLocation(10);

                    // Keep existing event listeners but remove pov_changed since it's not applicable to satellite view
                    window.addEventListener(eventConfig.gGoToStart, () => {
                        map.setCenter(arrToLLObj(realPos.current));
                        map.setZoom(satelliteZoom);
                    });
                    // Remove zoom event listeners since zoom is locked
                }}
            />
        </Wrapper>
    );
}
PanoramaGoogle.propTypes = {
    className: PropTypes.string,
    getParams: PropTypes.object.isRequired,
    utils: PropTypes.object.isRequired,
    realPos: PropTypes.object.isRequired
};

export default PanoramaGoogle;
