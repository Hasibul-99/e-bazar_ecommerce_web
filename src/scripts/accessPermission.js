export const canAccess = (type) => {
    const myProfile = window.localStorage.getItem("profile") ? JSON.parse(window.localStorage.getItem("profile")) : {};

    let rolesPermissions = myProfile?.roles?.length && myProfile?.roles[0].permissions ? myProfile?.roles[0].permissions : [];
        let permissions = [...rolesPermissions];
        let findIndex = permissions.findIndex(e => e.name === type);
        
        return findIndex === -1 ? false : true;
};