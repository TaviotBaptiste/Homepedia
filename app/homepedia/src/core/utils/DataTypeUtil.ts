import DataTypes from "../models/DataTypes.ts";
import MapDataModel from "../models/MapDataModel.ts";
import RegionsModel from "../models/RegionsModel.ts";
import DepartmentsModel from "../models/DepartmentsModel.ts";
import CitiesModel from "../models/CitiesModel.ts";

const getDataTypeId = (type: DataTypes, item: MapDataModel) => {
    switch (type) {
        case DataTypes.Regions:
            return (item as RegionsModel)!.properties.reg
        case DataTypes.Departments:
            return (item as DepartmentsModel)!.properties.dep
        case DataTypes.Cities:
        case DataTypes.Places:
        default:
            return (item as CitiesModel)!.properties.code
    }
}

const getDataTypeLabel = (type: DataTypes, item: MapDataModel) => {
    switch (type) {
        case DataTypes.France:
            return "France";
        case DataTypes.Regions:
            return (item as RegionsModel).properties.libgeo
        case DataTypes.Departments:
            return (item as DepartmentsModel).properties.libgeo
        case DataTypes.Cities:
        case DataTypes.Places:
        default:
            return (item as CitiesModel).properties.nom
    }
}

const getZoom = (type: DataTypes) => {
    switch(type) {
        case DataTypes.Regions:
            return 6;
        case DataTypes.Departments:
            return 8;
        case DataTypes.Cities:
            return 10;
        case DataTypes.Places:
        default:
            return 12;
    }
}

const getParentDataType = (type: DataTypes) => {
    switch(type) {
        case DataTypes.Regions:
            return DataTypes.Departments;
        case DataTypes.Departments:
            return DataTypes.Cities;
        case DataTypes.Cities:
        case DataTypes.Places:
        default:
            return DataTypes.Places;
    }
}

const getChildDataType = (type: DataTypes) => {
    switch(type) {
        case DataTypes.Regions:
        case DataTypes.Departments:
            return DataTypes.Regions;
        case DataTypes.Cities:
            return DataTypes.Departments;
        case DataTypes.Places:
        default:
            return DataTypes.Cities;
    }
}

export default {
    getDataTypeId,
    getDataTypeLabel,
    getZoom,
    getParentDataType,
    getChildDataType
}