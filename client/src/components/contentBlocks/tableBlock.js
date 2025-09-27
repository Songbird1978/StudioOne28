//import { useNavigate } from "react-router-dom";

export default function TableBlock({ table }) {
    // const navigate = useNavigate();

    //console.log("table from tableblock", table);

    const onlyTable = table.filter(
        (t) =>
            t.__component === "elements.table" ||
            t._component === "elements.table"
    );

    if (!onlyTable.length) return null;

    const { tableHeaders = [], tableRows = [] } = onlyTable[0];

    //console.log("tableHeaders:", tableHeaders);
    //console.log("tableRows:", tableRows);

    if (!tableHeaders.length || !tableRows.length) return null;

    return (
        <div
            className="tableBlock"
            style={{
                overflowX: "none",
                width: "100%",
                display: "flex",
            }}
        >
            {tableRows.map((row, i) => (
                <div className="td" key={i}>
                    {row.tableDataCell}
                </div>
            ))}
        </div>
    );
}
