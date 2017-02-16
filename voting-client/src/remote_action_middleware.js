/**
 * Created by justicui on 2/16/17.
 */
export default socket => store => next => action => {
    if (action.meta && action.meta.remote) {
        socket.emit('action', action);
    }
    return next(action);
}