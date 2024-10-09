import HistoryItemModel from "../core/models/HistoryItemModel.ts";
import BreadcrumbItem from "./BreadcrumbItem.tsx";

type BreadcrumbProps = {
    history: Array<HistoryItemModel>,
    onDataUpdate: (index: number, item: HistoryItemModel) => void,
}

const Breadcrumb = (props: BreadcrumbProps) => {
    return (
        <article className={
            "absolute top-[16px] right-[16px] w-fit bg-white z-[999] rounded p-[16px]"}>
            <div className={"flex gap-2"}>
                {
                    props.history.map((item: HistoryItemModel, index: number) => (
                        <BreadcrumbItem
                            key={index}
                            history={item}
                            isLast={index === props.history.length - 1}
                            onUnZoom={e => props.onDataUpdate(index, e)}/>
                    ))
                }
            </div>
        </article>
    );
};

export default Breadcrumb;
