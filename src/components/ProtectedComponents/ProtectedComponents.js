

const ProtectedComponents = (ComponentOnLoggedin, ComponentOnLoggedout) => {
    return ({ loggedIn ,className}) => {
        if (!loggedIn)
            return <ComponentOnLoggedout className={className} />
        else
            return <ComponentOnLoggedin className={className}/>
    }
}

export default ProtectedComponents;