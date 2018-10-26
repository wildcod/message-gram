const uris = {
    signupUrl : '/auth/signup',
    loginUrl : '/auth/login',
    getAllActiveUser : '/all-active-users',
    clearAuth : '/clear-auth',
    getUserChat : '/get-user-chat'
}


 const apiPathBuilder = (routeName,params) => {
    const apiVersionAndNamepace = 'api/v1'
    const baseRoute = uris[routeName]
    const Params = params? `/${params}` : ''

    const uri = apiVersionAndNamepace + baseRoute + Params
    console.log(uri)
    return uri
}

export default apiPathBuilder;