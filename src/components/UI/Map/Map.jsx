import {useRef, useEffect} from 'react';
import PropTypes from 'prop-types';

function Map({ className, options, onMount, type = 'map' }) {
    const mapCreated = useRef(false);
    const ref = useRef();

    useEffect(() => {
        if (mapCreated.current) return;
        const map = new window.google.maps[{
            map: 'Map',
            pano: 'StreetViewPanorama'
        }[type]](ref.current, options);
        onMount?.(map, ref);
        mapCreated.current = true;
    });

    return (
        <div className={className} ref={ref} />
    );
}
Map.propTypes = {
    className: PropTypes.string,
    options: PropTypes.object,
    onMount: PropTypes.func
};
Map.defaultProps = {
    className: '',
    options: {},
    type: 'map'
};

export default Map;
