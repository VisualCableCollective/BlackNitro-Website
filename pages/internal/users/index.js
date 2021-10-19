import {Card} from "../../../components/cards/Card";
import {InternalLayout} from "../../../components/layouts/InternalLayout";
import {EnsureUserIsAuthenticated} from "../../../middlewares/EnsureUserIsAuthenticated";
import {CommonButton} from "../../../components/buttons/CommonButton";
import {HttpRequestUtil} from "../../../utils/HttpRequestUtil";
import {TabPanel} from "../../../components/navigation/Tabs/TabPanel";
import {Tab} from "../../../components/navigation/Tabs/Tab";
import {UsersTable} from "../../../components/tables/UsersTable";
import {RolesTable} from "../../../components/tables/RolesTable";
import {SuccessButton} from "../../../components/buttons/SuccessButton";
import {Modal} from "../../../components/modals/Modal";
import {useState} from "react";
import {CommonInput} from "../../../components/inputs/CommonInput";
import {DangerButton} from "../../../components/buttons/DangerButton";
import {useRouter} from "next/router";
import {EnsureUserHasPermission} from "../../../middlewares/EnsureUserHasPermission";

export const getServerSideProps = async function ({req, res}) {
    const authResult = await EnsureUserIsAuthenticated(req);
    if (!authResult.success) {
        return authResult.action;
    }

    const permissionCheckResult = await EnsureUserHasPermission(authResult.user, "show_users");

    if (!permissionCheckResult.hasPermission) {
        return {
            redirect: {
                permanent: false,
                destination: "/internal/dashboard"
            }
        }
    }

    const usersResponse = await HttpRequestUtil.Request("api/users", "GET", req.cookies.access_token);
    const users = await usersResponse.json();

    const rolesResponse = await HttpRequestUtil.Request("api/roles", "GET", req.cookies.access_token);
    const roles = await rolesResponse.json();

    return {
        props: {
            users,
            roles
        },
    }
}

export default function UsersPage({users, roles}) {
    const [isCreateNewRoleModalOpen, setIsCreateNewRoleModalOpen] = useState(false);
    const [isCreatingRole, setIsCreatingRole] = useState(false);

    const router = useRouter();

    function ToggleCreateNewRoleModal() {
        if (isCreatingRole) {
            return;
        }

        setIsCreateNewRoleModalOpen(!isCreateNewRoleModalOpen);
    }

    async function CreateRole(event) {
        await event.preventDefault();

        if (isCreatingRole) {
            return;
        }

        setIsCreatingRole(true);

        const response = await HttpRequestUtil.Request(
            'api/roles/',
            "POST",
            "",
            JSON.stringify({
                name: event.target.role_name.value,
            })
        )

        if (response.status === 201) {
            await router.reload();
            return;
        }

        setIsCreatingRole(false);
    }

    return (
        <InternalLayout>
            <div className="w-full">
                <Card>
                    <h1 className="text-2xl font-medium">Internal | Staff Management</h1>
                </Card>
                <Card className="mt-6">
                    <TabPanel>
                        <Tab title="Users" defaultActive={true}>
                            <UsersTable users={users} />
                        </Tab>
                        <Tab title="Roles">
                            <SuccessButton className={"float-right mb-2"} onClick={ToggleCreateNewRoleModal}>
                                Create Role
                            </SuccessButton>
                            <Modal title={"Create new role"} isOpen={isCreateNewRoleModalOpen} closeModal={ToggleCreateNewRoleModal} className={"w-full"} >
                                <form onSubmit={CreateRole}>
                                    <CommonInput name={"role_name"} placeholder={"Role Name"} className={"w-full"} />
                                    <div className={"flex mt-4"}>
                                        <SuccessButton type={"submit"} className="w-full mr-2" disabled={isCreatingRole}>Create</SuccessButton>
                                        <DangerButton className="w-full ml-2" onClick={ToggleCreateNewRoleModal} disabled={isCreatingRole}>Cancel</DangerButton>
                                    </div>
                                </form>
                            </Modal>
                            <RolesTable roles={roles} />
                        </Tab>
                    </TabPanel>
                </Card>
            </div>
        </InternalLayout>
    )
}

function TableBodyItem({user}) {
    return (
        <tr>
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
        </tr>
    )
}
