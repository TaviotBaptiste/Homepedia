import MapDataModel from "./MapDataModel.ts";

type CitiesModel = MapDataModel & {
    properties: {
        nom: string,
        dep: string,
        code: string
    }
}

export default CitiesModel;