import {InternalLayout} from "../../../components/layouts/InternalLayout";
import {Card} from "../../../components/cards/Card";
import {CommonButton} from "../../../components/buttons/CommonButton";
import {DangerButton} from "../../../components/buttons/DangerButton";
import {Modal} from "../../../components/modals/Modal";
import {EnsureUserIsAuthenticated} from "../../../middlewares/EnsureUserIsAuthenticated";
import {HttpRequestUtil} from "../../../utils/HttpRequestUtil";
import {useState} from "react";
import {UserRolesTable} from "../../../components/tables/UserRolesTable";
import {SuccessButton} from "../../../components/buttons/SuccessButton";
import SelectMenu from "../../../components/SelectMenu";
import {useRouter} from "next/router";

export const getServerSideProps = async function ({req, res, query}) {
    const authResult = await EnsureUserIsAuthenticated(req);
    if (!authResult.success) {
        return authResult.action;
    }

    const userResponse = await HttpRequestUtil.Request("api/users/" + query.id, "GET", req.cookies.access_token);
    const userData = await userResponse.json();

    const rolesResponse = await HttpRequestUtil.Request("api/roles", "GET", req.cookies.access_token);
    const rolesData = await rolesResponse.json();

    return {
        props: {
            userData,
            rolesData,
        },
    }
}


export default function UserPage({userData, rolesData}) {
    const router = useRouter();

    const [user, setUser] = useState(userData);

    const [isEditRolesModalOpen, setIsEditRolesModalOpen] = useState(false);

    const [isAddRoleModalOpen, setIsAddRoleModalOpen] = useState(false);
    const [isAddingRole, setIsAddingRole] = useState(false);
    const [addRoleSelectedRole, setAddRoleSelectedRole] = useState({});

    function toggleAddRoleModal() {
        if (isAddingRole) {
            return;
        }

        setIsAddRoleModalOpen(!isAddRoleModalOpen);
    }

    async function AddRole() {
        if (isAddingRole) {
            return;
        }

        await setIsAddingRole(true);

        const response = await HttpRequestUtil.Request("api/users/" + user.id + "/roles/" + addRoleSelectedRole.id, "POST");

        if (response.status === 201) {
            await router.reload();
            return;
        }
        await setIsAddingRole(false);
    }

    function toggleEditRolesModal() {
        setIsEditRolesModalOpen(!isEditRolesModalOpen);
    }

    let userRoles = "";

    user.roles.map(role => {
        userRoles += role.name + ", ";
    });

    if (userRoles.length > 2) {
        userRoles = userRoles.substr(0, userRoles.length - 2);
    }

    let availableRoles = [];
    rolesData.map(role => {
        availableRoles.push({name: role.name, id: role.id, disabled: user.roles.find(x => x.id === role.id) });
    })

    return (
        <InternalLayout>
            <div className="w-full">
                <Card>
                    <h1 className="text-2xl font-medium">Internal | User Management | User: {user.id}</h1>
                </Card>
                <div className="mt-6 flex w-full">
                    <Card className="w-full mr-6">
                        <h2><strong>ID:</strong> {user.id}</h2>
                        <h2><strong>Name:</strong> {user.name}</h2>
                        <h2><strong>Email:</strong> {user.email}</h2>
                        <h2><strong>Roles:</strong> {userRoles}</h2>
                    </Card>
                    <div>
                        <CommonButton className="w-full" onClick={toggleEditRolesModal}>Edit Roles</CommonButton>
                        <DangerButton className="mt-4 w-full">Delete</DangerButton>
                    </div>
                </div>
                <Modal title={"Edit roles for " + user.name}
                       description={"Here you can add and remove roles from a user. Keep in mind, that actions cannot be undone!"}
                       isOpen={isEditRolesModalOpen}
                       closeModal={toggleEditRolesModal}>
                    <div className="w-full">
                        <SuccessButton className="w-full mb-4" onClick={toggleAddRoleModal}>Add Role</SuccessButton>
                        <UserRolesTable user={user} updateUser={setUser} />
                    </div>
                </Modal>
                <Modal title={"Add role for " + user.name}
                       description={"Here you can add a role to a user."}
                       isOpen={isAddRoleModalOpen}
                       closeModal={toggleAddRoleModal}>
                    <div className="w-full">
                        <SelectMenu
                            selectedItem={addRoleSelectedRole}
                            onSelectedChange={setAddRoleSelectedRole}
                            className="w-full"
                            label="Select Role"
                            items={availableRoles} />
                        <div className="flex mt-4">
                            <SuccessButton className="w-full mr-2" onClick={AddRole} disabled={isAddingRole}>Add Role</SuccessButton>
                            <CommonButton className="ml-2 w-full" onClick={toggleAddRoleModal} disabled={isAddingRole}>Cancel</CommonButton>
                        </div>
                    </div>
                </Modal>
            </div>
        </InternalLayout>
    )
}