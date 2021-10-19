export async function EnsureUserHasPermission(user, permissionName) {
    const permissions = [];

    const supportedRoles = [
        "show_users",
        "modify_roles"
    ];

    console.log(user);

    user.roles.forEach(role => {
        for (let permissionKey in role) {
            if (supportedRoles.includes(permissionKey) && role[permissionKey] === "1") {
                permissions.push(permissionKey);
            }
        }
    })

    let hasPermission = false;

    if (permissions.includes(permissionName)) {
        hasPermission = true;
    }

    console.log(permissionName);

    return {
        permissions,
        hasPermission
    }
}