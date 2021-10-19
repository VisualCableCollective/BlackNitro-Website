import MainLayout from "../../components/layouts/MainLayout";
import {Table} from "../../components/tables/shared/Table";
import {TableHead} from "../../components/tables/shared/TableHead";
import {TableRow} from "../../components/tables/shared/TableRow";
import {TableHeadCell} from "../../components/tables/shared/TableHeadCell";

export default function JobsPage() {
    return (
        <MainLayout>
            <div className="flex justify-center">
                <div className={"m-6 max-w-6xl w-full"}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableHeadCell>Position</TableHeadCell>
                                <TableHeadCell>Department</TableHeadCell>
                            </TableRow>
                        </TableHead>
                    </Table>
                </div>
            </div>
        </MainLayout>
    )
}