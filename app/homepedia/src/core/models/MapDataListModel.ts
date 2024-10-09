import MapDataModel from "./MapDataModel.ts";
import DataTypes from "./DataTypes.ts";

type MapDataListModel = {
    type: DataTypes,
    items: Array<MapDataModel>
}

export default MapDataListModel;

