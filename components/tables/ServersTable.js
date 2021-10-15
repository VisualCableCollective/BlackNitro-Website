import {TableHeadCell} from "./shared/TableHeadCell";
import {Table} from "./shared/Table";
import {TableHead} from "./shared/TableHead";
import {TableRow} from "./shared/TableRow";
import {TableBodyCell} from "./shared/TableBodyCell";
import {CommonButton} from "../buttons/CommonButton";

import Link from 'next/link';

export function ServersTable({servers}) {
    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableHeadCell>#</TableHeadCell>
                    <TableHeadCell>Name</TableHeadCell>
                    <TableHeadCell>Status</TableHeadCell>
                    <TableHeadCell />
                </TableRow>
            </TableHead>
            <tbody>
            {servers.map(x => <TableBodyItem key={x.id} role={x} />)}
            </tbody>
        </Table>
    )
}

function TableBodyItem({role}) {
    let createdBy = "n/a";

    if (role.creator_id === "0") {
        createdBy = "System";
    } else if (role.creator) {
        createdBy = <Link href={"/internal/users/" + role.creator.id}><a>{role.creator.name}</a></Link>;
    }

    return (
        <TableRow>
            <TableBodyCell>{role.id}</TableBodyCell>
            <TableBodyCell>{role.name}</TableBodyCell>
            <TableBodyCell>{createdBy}</TableBodyCell>
            <TableBodyCell >
                <CommonButton href={"/internal/roles/" + role.id}>
                    Show
                </CommonButton>
            </TableBodyCell>
        </TableRow>
    )
}