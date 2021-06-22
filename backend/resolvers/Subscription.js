const Subscription = {
    subscribeLobby: {
        subscribe(parent, args, context, info){
            const {roomType} = args;
            const {pubSub} = context;
            return pubSub.asyncIterator(roomType);
        }
    }
}

export default Subscription;