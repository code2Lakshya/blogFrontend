

const ProtectedComponents = (ComponentOnLoggedin, ComponentOnLoggedout) => {
    return ({ loggedIn }) => {
        if (!loggedIn)
            return <ComponentOnLoggedout />
        else
            return <ComponentOnLoggedin />
    }
}

export default ProtectedComponents;