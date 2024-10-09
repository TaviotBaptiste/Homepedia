import {useEffect, useState} from "react";
import ApiService from "./core/service/ApiService.ts";
import MapDataListModel from "./core/models/MapDataListModel.ts";
import DataTypes from "./core/models/DataTypes.ts";
import MapViewer from "./components/MapViewer.tsx";
import Loader from "./components/Loader.tsx";
import MapSideBar from "./components/MapSideBar.tsx";
import dataTypeUtil from "./core/utils/DataTypeUtil.ts";
import MapDataModel from "./core/models/MapDataModel.ts";
import HistoryItemModel from "./core/models/HistoryItemModel.ts";
import MapViewModel from "./core/models/MapViewModel.ts";
import Breadcrumb from "./components/Breadcrumb.tsx";
import PricesModel from "./core/models/PricesModel.ts";
import dataStatUtil from "./core/utils/DataStatUtil.ts";
import DataHeatModel from "./core/models/DataHeatModel.ts";
import {Chart, registerables} from 'chart.js';
import DataStatsModel from "./core/models/DataStatsModel.ts";

Chart.register(...registerables)

function App() {
    const default_view: MapViewModel = {
        zoom: 6,
        center: [46.603354, 1.888334]
    }
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [historyItems, setHistoryItems] = useState<Array<HistoryItemModel>>([{
        type: DataTypes.France,
        item: undefined,
        mapView: default_view
    }]);
    const [mapDataList, setMapDataList] = useState<MapDataListModel | undefined>(undefined);
    const [dataHeatList, setDataHeatList] = useState<Array<DataHeatModel> | undefined>(undefined);
    const [dataStats, setDataStats] = useState<DataStatsModel | undefined>(undefined);
    const [mapView, setMapView] = useState<MapViewModel>(default_view);
    const [isSideOpen, setIsSideOpen] = useState<boolean>(false);


    useEffect(() => {
        getRegions();

        return () => {
            setIsLoading(true)
        }
    }, []);

    useEffect(() => {
        setDataHeatList(mapDataList?.items
            .sort((a: MapDataModel, b: MapDataModel) => (b.stats.price ?? 0) - (a.stats.price ?? 0))
            .map((d, index) => ({
                Label: index + " : " + dataTypeUtil.getDataTypeLabel(mapDataList?.type, d),
                Value: d.stats.price ?? 0,
                Color: dataStatUtil.getPriceColor(d.stats.price)
            })));
    }, [mapDataList]);

    const getRegions = () =>
        Promise.all([
            new Promise<MapDataModel[]>((resolve) =>
                ApiService.getRegions().then(res => resolve(res))),
            new Promise<PricesModel[]>((resolve) =>
                ApiService.getRegionsPrice().then(res => resolve(res)))
        ]).then(([items, prices]: [MapDataModel[], PricesModel[]]) => {
            setMapDataList({
                type: DataTypes.Regions,
                items: dataStatUtil.addPriceStat(items, prices, DataTypes.Regions)
            })
            setIsLoading(false)
        })

    const getDepartments = (reg: string) =>
        Promise.all([
            new Promise<MapDataModel[]>((resolve) =>
                ApiService.getDepartments(reg).then(res => resolve(res))),
            new Promise<PricesModel[]>((resolve) =>
                ApiService.getDepartmentsPrice(reg).then(res => resolve(res)))
        ]).then(([items, prices]: [MapDataModel[], PricesModel[]]) => {
            setMapDataList({
                type: DataTypes.Departments,
                items: dataStatUtil.addPriceStat(items, prices, DataTypes.Departments)
            })
            setIsLoading(false)
        })

    const getCities = (dep: string) =>
        Promise.all([
            new Promise<MapDataModel[]>((resolve) =>
                ApiService.getCities(dep).then(res => resolve(res))),
            new Promise<PricesModel[]>((resolve) =>
                ApiService.getCitiesPrice(dep).then(res => resolve(res)))
        ]).then(([items, prices]: [MapDataModel[], PricesModel[]]) => {
            setMapDataList({
                type: DataTypes.Cities,
                items: dataStatUtil.addPriceStat(items, prices, DataTypes.Cities)
            })
            setIsLoading(false)
        })

    const getCityStats = (id: string) =>
        ApiService
            .getCityStats(id)
            .then(res => {
                setDataStats(res[0])
                setIsLoading(false)
            });

    const updateMapDataZoom = (currentType: DataTypes, item: MapDataModel, view: MapViewModel) => {
        setIsLoading(true)

        setDataHeatList(undefined)
        setMapView(view)
        setHistoryItems(items => [...items, {
            type: currentType,
            item: item,
            mapView: view
        }]);

        const num = dataTypeUtil.getDataTypeId(currentType, item);
        const type = dataTypeUtil.getParentDataType(currentType);

        if (type == DataTypes.Departments) {
            getDepartments(num);
            return;
        }

        if (type == DataTypes.Cities) {
            getCities(num);
            return;
        }

        if (type == DataTypes.Places) {
            getCityStats(dataTypeUtil.getDataTypeLabel(DataTypes.Places, item))
            return;
        }

        setIsLoading(false)
    }


    const updateMapDataUnZoom = (index: number, item: HistoryItemModel) => {
        setIsLoading(true)

        setDataStats(undefined)
        setMapView(item.mapView)
        setHistoryItems(items => items.slice(0, index + 1));

        if (item.item == undefined) {
            getRegions();
            return;
        }

        const num = dataTypeUtil.getDataTypeId(item.type, item.item);

        if (item.type == DataTypes.Regions) {
            getDepartments(num);
            return;
        }

        if (item.type == DataTypes.Departments) {
            getCities(num);
            return;
        }

        setIsLoading(false)
    }

    return (
        <main className="relative">
            <MapViewer
                mapView={mapView}
                onViewUpdate={setMapView}
                dataList={mapDataList}
                onDataUpdate={updateMapDataZoom}/>

            <Breadcrumb
                history={historyItems}
                onDataUpdate={updateMapDataUnZoom}/>

            {
                mapDataList && mapDataList.type != DataTypes.Regions && (dataHeatList || dataStats) ? (
                    <MapSideBar
                        isOpen={isSideOpen}
                        openHandler={setIsSideOpen}
                        history={historyItems[historyItems.length-1]}
                        dataStats={dataStats}
                        dataHeat={dataHeatList}/>
                ) : undefined
            }

            {
                isLoading ? (
                    <Loader />
                ) : undefined
            }
        </main>
    )
}

export default App
