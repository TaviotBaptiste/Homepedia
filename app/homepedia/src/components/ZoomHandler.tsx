import {useEffect} from "react";
import MapViewModel from "../core/models/MapViewModel.ts";
import { useMap } from "react-leaflet";

type ZoomHandlerProps = {
    mapView: MapViewModel
}

const ZoomHandler = (props: ZoomHandlerProps) => {
    const map = useMap();

    useEffect(() => {
        map.setView(props.mapView.center, props.mapView.zoom);
    }, [props.mapView]);

    return (
        <></>
    );
};

export default ZoomHandler;
