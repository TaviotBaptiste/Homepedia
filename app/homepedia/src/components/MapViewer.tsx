import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import MapDataListModel from "../core/models/MapDataListModel.ts";
import { LatLngExpression } from "leaflet";
import MapPolygon from "./MapPolygon.tsx";
import DataTypes from "../core/models/DataTypes.ts";
import MapDataModel from "../core/models/MapDataModel.ts";
import MapViewModel from "../core/models/MapViewModel.ts";
import ZoomHandler from "./ZoomHandler.tsx";
import dataStatUtil from "../core/utils/DataStatUtil.ts";

type MapViewerProps = {
    mapView: MapViewModel,
    onViewUpdate: (mapView: MapViewModel) => void,
    dataList: MapDataListModel | undefined,
    onDataUpdate: (type: DataTypes, item: MapDataModel, mapView: MapViewModel) => void
}

const MapViewer = (props: MapViewerProps) => {
    const getPolygon = (coordinates: number[][]): LatLngExpression[] =>
        coordinates.map(coords => [coords[1], coords[0]])

    const handleClick = (id: string, type: DataTypes, mapView: MapViewModel) =>
        props.onDataUpdate(type, props.dataList!.items.find(i => i._id == id)!, mapView);

    return (
        <MapContainer
            zoom={props.mapView.zoom}
            className="h-screen w-screen"
            center={props.mapView.center}
            zoomControl={false}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            {
                props.dataList && props.dataList.items.map((item) => (
                    (typeof item.geometry.coordinates[0][0][0] == "number") ? (
                        <MapPolygon
                            key={item._id}
                            id={item._id}
                            type={props.dataList!.type}
                            color={dataStatUtil.getPriceColor(item.stats?.price ?? undefined)}
                            polygon={getPolygon(item.geometry.coordinates[0] as number[][])}
                            onClick={handleClick} />
                    ) : (
                        item.geometry.coordinates.map((subitemCoord, index) => (
                            <MapPolygon
                                key={item._id + index}
                                id={item._id}
                                type={props.dataList!.type}
                                color={dataStatUtil.getPriceColor(item.stats?.price ?? undefined)}
                                polygon={getPolygon(subitemCoord[0] as number[][])}
                                onClick={handleClick} />
                        ))
                    )
                ))
            }

            <ZoomHandler mapView={props.mapView} />
        </MapContainer>
    );
};

export default MapViewer;
