import {TableHeadCell} from "./shared/TableHeadCell";
import {Table} from "./shared/Table";
import {TableHead} from "./shared/TableHead";
import {TableRow} from "./shared/TableRow";
import {TableBodyCell} from "./shared/TableBodyCell";
import {DangerButton} from "../buttons/DangerButton";
import {HttpRequestUtil} from "../../utils/HttpRequestUtil";
import {useEffect, useState} from "react";
import {Modal} from "../modals/Modal";
import {CommonButton} from "../buttons/CommonButton";
import {useRouter} from "next/router";

export function UserRolesTable({user, updateUser}) {
    const router = useRouter();

    const [isRemoving, setIsRemoving] = useState(false);
    const [isRemoveRoleModalOpen, setIsRemoveRoleModalOpen] = useState(false);
    const [selectedRole, setSelectedRole] = useState({name: ""});
    const [tableContent, setTableContent] = useState(user.roles.map(x => <TableBodyItem key={x.id} openRemoveModal={openRemoveRoleModal} role={x} />));

    function openRemoveRoleModal(role) {
        setIsRemoveRoleModalOpen(true);
        setSelectedRole(role);
    }

    function closeRemoveRoleModal() {
        setIsRemoveRoleModalOpen(false);
    }

    async function removeRole() {
        if (isRemoving) {
            return;
        }

        await setIsRemoving(true);

        const response = await HttpRequestUtil.Request("api/users/" + user.id + "/roles/" + selectedRole.id, "DELETE");

        if (response.status === 204) {
            router.reload();
            return;
        }
        await setIsRemoving(false);
    }

    useEffect(() => {
         setTableContent(user.roles.map(x => <TableBodyItem key={x.id} openRemoveModal={openRemoveRoleModal} role={x} />));
    }, [user]);

    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableHeadCell>Role ID</TableHeadCell>
                    <TableHeadCell>Name</TableHeadCell>
                    <TableHeadCell>Member since</TableHeadCell>
                    <TableHeadCell />
                </TableRow>
            </TableHead>
            <tbody>
            {tableContent}
            </tbody>
            <Modal isOpen={isRemoveRoleModalOpen}
                   closeModal={closeRemoveRoleModal}
                   title={"Are you sure you want to remove the '" + selectedRole.name + "' role from '" + user.name + "'?"}
                   description="You are currently trying to remove a role from this user. This removes the role from the user and the user will loose access to the granted permissions by the role. This action cannot be undone!">
                <div className="flex">
                    <DangerButton className="w-full font-bold mr-2" onClick={removeRole} disabled={isRemoving}>Remove Role</DangerButton>
                    <CommonButton className="w-full font-bold ml-2" onClick={closeRemoveRoleModal} disabled={isRemoving}>Cancel</CommonButton>
                </div>
            </Modal>
        </Table>
    )
}

function TableBodyItem({role, openRemoveModal}) {
    return (
        <TableRow>
            <TableBodyCell>{role.id}</TableBodyCell>
            <TableBodyCell>{role.name}</TableBodyCell>
            <TableBodyCell>{new Date(role.pivot.created_at).toLocaleString()}</TableBodyCell>
            <TableBodyCell >
                <DangerButton onClick={() => openRemoveModal(role)}>
                    Remove
                </DangerButton>
            </TableBodyCell>
        </TableRow>
    )
}