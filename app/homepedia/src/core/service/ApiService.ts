import MapDataModel from "../models/MapDataModel.ts";
import PricesModel from "../models/PricesModel.ts";
import DataStatsModel from "../models/DataStatsModel.ts";

const BASE_URL = "http://localhost:3001/api";

const getRegions = async () : Promise<Array<MapDataModel>> => {
    const response = await fetch(`${BASE_URL}/regions`);

    return response.json()
        .then(res => res)
        .catch(() => undefined);
}

const getDepartments = async (reg: string) : Promise<Array<MapDataModel>> => {
    const response = await fetch(`${BASE_URL}/departments/${reg}`);

    return response.json()
        .then(res => res)
        .catch(() => undefined);
}

const getCities = async (dep: string) : Promise<Array<MapDataModel>> => {
    const response = await fetch(`${BASE_URL}/cities/${dep}`);

    return response.json()
        .then(res => res)
        .catch(() => undefined);
}

const getRegionsPrice = async () : Promise<Array<PricesModel>> => {
    const response = await fetch(`${BASE_URL}/price/reg`);

    return response.json()
        .then(res => res)
        .catch(() => undefined);
}

const getDepartmentsPrice = async (reg: string) : Promise<Array<PricesModel>> => {
    const response = await fetch(`${BASE_URL}/price/dep/${reg}`);

    return response.json()
        .then(res => res)
        .catch(() => undefined);
}

const getCitiesPrice = async (dep: string) : Promise<Array<PricesModel>> => {
    const response = await fetch(`${BASE_URL}/price/city/${dep}`);

    return response.json()
        .then(res => res)
        .catch(() => undefined);
}

const getCityStats = async (id: string): Promise<Array<DataStatsModel>> => {
    const response = await fetch(`${BASE_URL}/stats/${id}`);

    return response.json()
        .then(res => res)
        .catch(() => undefined);
}



export default {
    getRegions,
    getDepartments,
    getCities,
    getRegionsPrice,
    getDepartmentsPrice,
    getCitiesPrice,
    getCityStats
}