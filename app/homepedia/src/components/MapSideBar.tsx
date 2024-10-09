import {useEffect, useState} from "react";
import MenuIcon from '@mui/icons-material/Menu';
import dataTypeUtil from "../core/utils/DataTypeUtil.ts";
import HistoryItemModel from "../core/models/HistoryItemModel.ts";
import DataHeatModel from "../core/models/DataHeatModel.ts";
import {Bar, Doughnut} from "react-chartjs-2";
import {ChartData} from "chart.js";
import DataStatsModel from "../core/models/DataStatsModel.ts";

type MapSideBarProps = {
    isOpen: boolean,
    openHandler: (value: boolean) => void,
    history: HistoryItemModel,
    dataStats?: DataStatsModel,
    dataHeat?: Array<DataHeatModel>
}

const MapSideBar = (props: MapSideBarProps) => {
    const heatOptions = {
        scales: {
            x: {
                beginAtZero: true,
            },
            y: {
                ticks: {
                    display: false
                },
                grid: {
                    display: false
                },
            },
        },
        indexAxis: 'y' as const,
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: 'Price per square meter ordered by price in €'
            },
            legend: {
                display: false,
            },
        },
    };

    const statsOptions = {
        plugins: {
            title: {
                display: true,
                text: 'Proportion of active/inactive people in the city.'
            },
            legend: {
                position: "bottom"
            }
        }
    }

    const [dataStats, setDataStats] = useState<ChartData<"doughnut", (number | [number, number] | null)[], unknown> | undefined>(undefined);
    const [dataHeat, setDataHeat] = useState<ChartData<"bar", (number | [number, number] | null)[], unknown> | undefined>(undefined);

    useEffect(() => {
        if (!props.dataStats || props.dataStats.pop_active == null)
            return;

        setDataStats({
            labels: ['Active', 'Non active'],
            datasets: [{
                data: [
                    Number(props.dataStats.pop_active.replace("%", "")),
                    100 - Number(props.dataStats.pop_active.replace("%", ""))
                ],
                backgroundColor: ["#d53e4f", "#66c2a5"],
            }]
        });

        return () => {
            setDataHeat(undefined)
        }
    }, [props.dataStats]);

    useEffect(() => {
        if (!props.dataHeat)
            return;

        setDataHeat({
            labels: props.dataHeat.map(item => item.Label),
            datasets: [{
                data: props.dataHeat.map(item => item.Value),
                backgroundColor: props.dataHeat.map(item => item.Color),
            }]
        });

        return () => {
            setDataHeat(undefined)
        }
    }, [props.dataHeat]);

    return (
        <article className={
            "absolute top-[16px] left-[16px] w-[350px] bg-white z-[999] rounded p-[16px] "
            + (props.isOpen ? 'bottom-[16px]' : '')}>
            <div className={"h-[18px] flex justify-between items-center"}>
                <button onClick={() => props.openHandler(!props.isOpen)}>
                    <MenuIcon/>
                </button>
                <h4>
                    <strong>
                        {dataTypeUtil.getDataTypeLabel(props.history.type, props.history.item!)}
                    </strong>
                </h4>
            </div>

            {
                props.isOpen ? (
                    <div className={"overflow-x-auto h-full py-2"}>
                        {
                            dataHeat ? (
                                <Bar
                                    data={dataHeat}
                                    height={"fit-content"}
                                    options={heatOptions}/>
                            ) : undefined
                        }
                        {
                            dataStats ? (
                                <div className={"flex flex-col gap-4 py-8"}>
                                    <div className="flex flex-row gap-2">
                                        <span>Number of residents :</span>
                                        <span><strong>{props.dataStats?.nb_habitant ?? "unknown"}</strong></span>
                                    </div>
                                    <div className="flex flex-row gap-2">
                                        <span>Average age :</span>
                                        <span><strong>{props.dataStats?.age_moyen?.replace("ans", "years") ?? "unknown"}</strong></span>
                                    </div>

                                    <Doughnut
                                        data={dataStats}
                                        height={"fit-content"}
                                        options={statsOptions}/>
                                </div>
                            ) : undefined
                        }
                    </div>
                ) : undefined
            }
        </article>
    );
};

export default MapSideBar;
