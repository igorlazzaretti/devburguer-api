
function authMiddleware(request,response, next) {
    console.log(request.headers);

    return next();
}
export default authMiddleware;