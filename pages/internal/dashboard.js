import {Card} from "../../components/cards/Card";
import {StatsCard} from "../../components/cards/StatsCard";

// icon
import {IoMdGitCommit, IoLogoGameControllerB} from 'react-icons/io';
import {HiUserGroup} from 'react-icons/hi';
import {FaServer} from 'react-icons/fa';
import {InternalLayout} from "../../components/layouts/InternalLayout";
import {EnsureUserIsAuthenticated} from "../../middlewares/EnsureUserIsAuthenticated";

export const getServerSideProps = async function ({ req, res }) {
    const authResult = await EnsureUserIsAuthenticated(req);
    if (!authResult.success) {
        return authResult.action;
    }

    return {
        props: {}
    };
}

export default function Dashboard({user}) {
    return (
        <InternalLayout>
            <div className="w-full">
                <Card>
                    <h1 className="text-2xl font-medium">Internal | Dashboard</h1>
                </Card>
                <h1 className="text-2xl font-medium mt-6 mb-2">Black Nitro Development Statistics</h1>
                <div className="grid grid-cols-4 gap-4">
                    <StatsCard title={132} description="Total Commits" icon={<IoMdGitCommit />} />
                    <StatsCard title={132} description="Total Contributors" icon={<HiUserGroup />} />
                    <StatsCard title={1} description="Total Game Servers Online" icon={<FaServer />} />
                    <StatsCard title={0} description="Total PlayTests Done" icon={<IoLogoGameControllerB />} />
                </div>
            </div>
        </InternalLayout>
    )
}