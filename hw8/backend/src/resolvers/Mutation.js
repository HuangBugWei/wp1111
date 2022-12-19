import ChatBoxModel from "../models/ChatBoxModel";
const makeName = (name, to) => { return [name, to].sort().join('_')}

const checkOutChatBox = async(name, to) => {
    const chatBoxName = makeName(name, to)
    let box = await ChatBoxModel.findOne({ name: chatBoxName })
    if (!box) {
        box = await new ChatBoxModel({ name: chatBoxName }).save();
    }
    return box
}

const Mutation = {
    // createChatBox: async(parent, { name1, name2 }, { ChatBoxModel } ) => {
    //     const name = [name1, name2].sort().join('_')
        
    //     let box = await ChatBoxModel.findOne({ name });
        
    //     if (!box){
    //         console.log("not found")
    //         box = await new ChatBoxModel({ name }).save();
    //     }
    //     return box;
    // },
    createChatBox: (parent, { name1, name2 } ) => {
        return checkOutChatBox(name1, name2);
    },
    // createMessage: async (parent, { name, to, body }, { ChatBoxModel, pubsub } ) => {
    //     // const chatBox = await checkOutChatBox(name, to);
    //     const chatBoxName = [name, to].sort().join('_')
    //     console.log(chatBoxName)
    //     let chatBox = await ChatBoxModel.findOne({ name: chatBoxName });
    //     console.log(chatBox)
    //     if (!chatBox){
    //         console.log("not found")
    //         chatBox = await new ChatBoxModel({ name: chatBoxName }).save();
    //     }
    //     const newMsg = { sender: name, body };
    //     console.log(newMsg)
    //     chatBox.messages.push(newMsg);
    //     await chatBox.save();
    //     console.log(chatBox.messages)

    //     // const chatBoxName = makeName(name, to);
    //     pubsub.publish(`chatBox ${chatBoxName}`, {
    //         message: newMsg,
    //     });

    //     return newMsg;
    // },
    createMessage: async (parent, { name, to, body }, { pubsub } ) => {
        const chatBox = await checkOutChatBox(name, to);
        const newMsg = { sender: name, body };
        chatBox.messages.push(newMsg);
        await chatBox.save();

        const chatBoxName = makeName(name, to);
        pubsub.publish(`chatBox ${chatBoxName}`, {
            message: newMsg,
        });
        return newMsg;
    },
};

export default Mutation;