import {TableHeadCell} from "./shared/TableHeadCell";
import {Table} from "./shared/Table";
import {TableHead} from "./shared/TableHead";
import {TableRow} from "./shared/TableRow";
import {TableBodyCell} from "./shared/TableBodyCell";
import {CommonButton} from "../buttons/CommonButton";

export function UsersTable({users}) {
    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableHeadCell>#</TableHeadCell>
                    <TableHeadCell>Name</TableHeadCell>
                    <TableHeadCell>E-Mail</TableHeadCell>
                    <TableHeadCell>Last login</TableHeadCell>
                    <TableHeadCell>Registration date</TableHeadCell>
                    <TableHeadCell />
                </TableRow>
            </TableHead>
            <tbody>
                {users.map(x => <TableBodyItem key={x.id} user={x} />)}
            </tbody>
        </Table>
    )
}

function TableBodyItem({user}) {
    return (
        <TableRow>
            <TableBodyCell>{user.id}</TableBodyCell>
            <TableBodyCell>{user.name}</TableBodyCell>
            <TableBodyCell>{user.email}</TableBodyCell>
            <TableBodyCell>{new Date(user.updated_at).toLocaleDateString()}</TableBodyCell>
            <TableBodyCell>{new Date(user.created_at).toLocaleDateString()}</TableBodyCell>
            <TableBodyCell >
                <CommonButton href={"/internal/users/" + user.id}>
                    Show
                </CommonButton>
            </TableBodyCell>
        </TableRow>
    )
}