import dataTypeUtil from "./DataTypeUtil.ts";
import MapDataModel from "../models/MapDataModel.ts";
import PricesModel from "../models/PricesModel.ts";
import dataTypes from "../models/DataTypes.ts";

const getPriceColor = (price?: number) => {
    if (!price)
        return '#aaaaaa'

    switch (true) {
        case (price < 1400):
            return '#5e4fa2'
        case (price < 1800):
            return '#3288bd'
        case (price < 2200):
            return '#66c2a5'
        case (price < 2600):
            return '#abdda4'
        case (price < 3000):
            return '#e6f598'
        case (price < 3400):
             return '#fee08b'
        case (price < 3800):
            return '#fdae61'
        case (price < 4200):
             return '#f46d43'
        default:
            return '#d53e4f'
    }
}

const addPriceStat = (items: MapDataModel[], prices: PricesModel[], type: dataTypes) => {
    return items.map((item) => {
        const stat = prices.find(p =>  p.code === dataTypeUtil.getDataTypeId(type, item))

        return {
            ...item,
            stats: {price: stat?.price ?? undefined}
        }
    })
}

export default {
    getPriceColor,
    addPriceStat
}
