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

    const serversResponse = await HttpRequestUtil.Request("api/servers", "GET", req.cookies.access_token);
    const servers = await serversResponse.json();

    return {
        props: {
            servers
        },
    }
}

export default function ServersPage({servers}) {
    return (
        <InternalLayout>
            <div className="w-full">
                <Card>
                    <h1 className="text-2xl font-medium">Internal | Staff Management</h1>
                </Card>
                <Card className="mt-6">

                </Card>
            </div>
        </InternalLayout>
    )
}