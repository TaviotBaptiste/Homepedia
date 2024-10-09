type MapDataModel = {
    _id: string,
    geometry: {
        type: string,
        coordinates: number[][][] | number[][][][],
    },
    stats: {
        price?: number
    }
}

export default MapDataModel;