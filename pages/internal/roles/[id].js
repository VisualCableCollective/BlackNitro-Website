import {InternalLayout} from "../../../components/layouts/InternalLayout";
import {Card} from "../../../components/cards/Card";
import {useRouter} from "next/router";
import {CommonButton} from "../../../components/buttons/CommonButton";
import {EnsureUserIsAuthenticated} from "../../../middlewares/EnsureUserIsAuthenticated";
import {HttpRequestUtil} from "../../../utils/HttpRequestUtil";
import Link from "next/link";
import {useState} from "react";
import {Modal} from "../../../components/modals/Modal";
import {DangerButton} from "../../../components/buttons/DangerButton";

export const getServerSideProps = async function ({req, res, query}) {
    const authResult = await EnsureUserIsAuthenticated(req);
    if (!authResult.success) {
        return authResult.action;
    }

    const roleResponse = await HttpRequestUtil.Request("api/roles/" + query.id, "GET", req.cookies.access_token);
    const role = await roleResponse.json();

    return {
        props: {
            role,
        },
    }
}

export default function RolePage({role}) {
    const router = useRouter();

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isDeletingRole, setIsDeletingRole] = useState(false);

    const openDeleteModal = () => setIsDeleteModalOpen(true);
    const closeDeleteModal = () => {
        if (isDeletingRole){
            return;
        }
        setIsDeleteModalOpen(false)
    };

    async function deleteRole() {
        if (isDeletingRole) {
            return;
        }

        setIsDeletingRole(true);

        const response = await HttpRequestUtil.Request("api/roles/" + role.id, "DELETE");

        if (response.status === 204) {
            await router.push("/internal/users");
            return;
        }
        setIsDeletingRole(false);
    }

    let createdBy = "n/a";
    let deleteRoleDisabled = false;

    if (role.creator_id === "0") {
        createdBy = "System";
        deleteRoleDisabled = true;
    } else if (role.creator) {
        createdBy = <Link href={"/internal/users/" + role.creator.id}><a>{role.creator.name}</a></Link>;
    }

    return (
        <InternalLayout>
            <div className="w-full">
                <Card>
                    <h1 className="text-2xl font-medium">Internal | User Management | Role: {role.id}</h1>
                </Card>
                <div className="mt-6 flex w-full">
                    <Card className="w-full mr-6">
                        <h2><strong>ID:</strong> {role.id}</h2>
                        <h2><strong>Name:</strong> {role.name}</h2>
                        <h2><strong>Created By:</strong> {createdBy}</h2>
                        <h2><strong>Created At:</strong> 1</h2>
                    </Card>
                    <div>
                        <DangerButton className="w-full" onClick={openDeleteModal} disabled={deleteRoleDisabled}>Delete</DangerButton>
                        <CommonButton className="mt-4 w-full">Edit</CommonButton>
                    </div>
                </div>
                <Modal isOpen={isDeleteModalOpen}
                       closeModal={closeDeleteModal}
                       title="Are you sure you want to delete this role?"
                       description="You are currently trying to delete this role. This removes the role from the system and all users who have been given that role will lose it. This action cannot be undone!">
                    <DangerButton className="w-full font-bold mr-2" onClick={deleteRole} disabled={isDeletingRole}>Delete</DangerButton>
                    <CommonButton className="w-full font-bold ml-2" onClick={closeDeleteModal} disabled={isDeletingRole}>Cancel</CommonButton>
                </Modal>
            </div>
        </InternalLayout>
    )
}