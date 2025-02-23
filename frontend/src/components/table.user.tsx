import { formatToBrazilianTime } from "../utils/formatToBrazilTime";
import { TableCaption, Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "./ui/table";


type infoTableUserProps = {
    array?: any,
    labelHead?: string,
    tableHeadLebal?: any,
    type?: string
}
export function TableUser ({array, labelHead, tableHeadLebal, type}: infoTableUserProps) {
    return(
        <>
            <TableCaption className="text-zinc-800 w-2xl bg-amber-400">{labelHead}</TableCaption>
            <Table>
                <TableHeader>
                    <TableRow>
                        {Array.isArray(tableHeadLebal) && tableHeadLebal.map((head)=>(
                            <TableHead key={head.key}>{head.label}</TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {type === "opning" && Array.isArray(array) && array.map((open:any, index: number)=>(
                        <TableRow key={index}>
                            <TableCell>{formatToBrazilianTime(open.date)}</TableCell>
                            <TableCell>{open.postId}</TableCell>
                            <TableCell>{open.utmSource}</TableCell>
                            <TableCell>{open.utmMedium}</TableCell>
                            <TableCell>{open.utmCampaign}</TableCell>
                        </TableRow>
                    ))}
                    <br />
                    {type === "badge" && Array.isArray(array) && array.map((open:any, index: number)=>(
                        <TableRow key={index}>
                            <TableCell>{open.name}</TableCell>
                            <TableCell>{open.description}</TableCell>
                            <TableCell>{formatToBrazilianTime(open.dateEarned)}</TableCell>
                        </TableRow>
                    ))}
            
                    {type === "general__data" && Array.isArray(array) && array.map((open:any, index: number)=>(
                        <TableRow key={index}>
                            <TableCell>{open.email}</TableCell>
                            <TableCell>{open.Streak}</TableCell>
                            <TableCell>{formatToBrazilianTime(open.lastOpenedAt)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    )
}