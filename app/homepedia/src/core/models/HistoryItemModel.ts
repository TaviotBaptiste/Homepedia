import DataTypes from "./DataTypes.ts";
import MapDataModel from "./MapDataModel.ts";
import MapViewModel from "./MapViewModel.ts";

type HistoryItemModel = {
    type: DataTypes,
    item?: MapDataModel,
    mapView: MapViewModel,
}

export default HistoryItemModel;