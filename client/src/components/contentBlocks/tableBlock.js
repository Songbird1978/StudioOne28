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
        <div style={{ overflowX: "auto", width: "100%" }}>
            <table className="tableBlock" style={{ width: "100%" }}>
                <tbody>
                    <tr>
                        {tableHeaders.map((header, i) => (
                            <th key={i}>{header.tableheader}</th>
                        ))}
                    </tr>
                    <tr>
                        {tableRows.map((row, i) => (
                            <td key={i}>{row.tableDataCell}</td>
                        ))}
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
