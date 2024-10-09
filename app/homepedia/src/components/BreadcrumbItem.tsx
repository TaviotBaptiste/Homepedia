import HistoryItemModel from "../core/models/HistoryItemModel.ts";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import dataTypeUtil from "../core/utils/DataTypeUtil.ts";

type BreadcrumbItemProps = {
    isLast: boolean,
    history: HistoryItemModel,
    onUnZoom: (item: HistoryItemModel) => void,
}

const BreadcrumbItem = (props: BreadcrumbItemProps) => {
    return (
        <>
            <div
                className={"clickable"}
                onClick={() => props.onUnZoom(props.history)}>
                <strong>
                    {dataTypeUtil.getDataTypeLabel(props.history.type, props.history.item!)}
                </strong>
            </div>

            {
                !props.isLast ? (
                    <NavigateNextIcon />
                ) : undefined
            }
        </>
    );
};

export default BreadcrumbItem;
