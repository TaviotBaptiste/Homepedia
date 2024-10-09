import MapDataModel from "./MapDataModel.ts";

type RegionsModel = MapDataModel & {
    properties: {
        libgeo: string,
        reg: string
    }
}

export default RegionsModel;