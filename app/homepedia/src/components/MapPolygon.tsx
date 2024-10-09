import { Polygon } from "react-leaflet";
import { LatLngExpression, LeafletMouseEvent } from "leaflet";
import DataTypes from "../core/models/DataTypes.ts";
import dataTypeUtil from "../core/utils/DataTypeUtil.ts";
import MapViewModel from "../core/models/MapViewModel.ts";

type MapPolygonProps = {
    id: string,
    type: DataTypes,
    polygon: LatLngExpression[],
    color: string,
    onClick: (id: string, type: DataTypes, mapView: MapViewModel) => void,
}

const MapPolygon = (props: MapPolygonProps) => {
    const handleClick = (event: LeafletMouseEvent, id: string, type: DataTypes) =>
        props.onClick(id, type, {
            zoom: dataTypeUtil.getZoom(dataTypeUtil.getParentDataType(type)),
            center: [event.latlng.lat, event.latlng.lng]
        });

    return (
        <Polygon
            key={props.id}
            positions={props.polygon}
            fillColor={props.color}
            fillOpacity={0.6}
            eventHandlers={{
                click: (e => handleClick(e, props.id, props.type)),
            }}/>
    );
};

export default MapPolygon;
