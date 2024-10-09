import MapDataModel from "./MapDataModel.ts";

type DepartmentsModel = MapDataModel & {
    properties: {
        libgeo: string,
        reg: string,
        dep: string
    }
}

export default DepartmentsModel;