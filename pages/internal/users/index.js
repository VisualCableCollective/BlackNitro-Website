import {Card} from "../../../components/cards/Card";
import {InternalLayout} from "../../../components/layouts/InternalLayout";
import {EnsureUserIsAuthenticated} from "../../../middlewares/EnsureUserIsAuthenticated";
import {CommonButton} from "../../../components/buttons/CommonButton";
import {HttpRequestUtil} from "../../../utils/HttpRequestUtil";
import {TabPanel} from "../../../components/navigation/Tabs/TabPanel";
import {Tab} from "../../../components/navigation/Tabs/Tab";
import {UsersTable} from "../../../components/tables/UsersTable";
import {RolesTable} from "../../../components/tables/RolesTable";

export const getServerSideProps = async function ({req, res}) {
    const authResult = await EnsureUserIsAuthenticated(req);
    if (!authResult.success) {
        return authResult.action;
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
