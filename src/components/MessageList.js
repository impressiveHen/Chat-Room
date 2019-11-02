import React, { useLayoutEffect, useRef, useState, useEffect } from 'react'
import Message from './Message'

function MessageList(props) {
    const [shouldScrollToBottom, setShouldScrollToBottom] = useState(false);
    let fragmentRef = useRef();
    const { messages } = props;

    useEffect(() => {
        let node = fragmentRef.current;
        // if just a bit above the bottom of scroll, set state to true
        // avoid scrolling on top messages and income message makes you go to bottom
        setShouldScrollToBottom(node.scrollTop + node.clientHeight + 200 >= node.scrollHeight);
    });

    useLayoutEffect(() => {
        let node = fragmentRef.current;
        if (shouldScrollToBottom) {
            node.scrollTop = node.scrollHeight;
        }
    }, [messages, shouldScrollToBottom]);

    if (!props.currentRoomId) {
        return (
            <div ref={fragmentRef} className="message-list">
                <div className="join-room">
                    &larr; Join a room!
                </div>
            </div>
        );
    }

    return (
        <div ref={fragmentRef} className="message-list">
            {messages.map((message, index) => {
                return (
                    <Message
                        key={index}
                        userName={message.senderId}
                        text={message.parts[0].payload.content}
                    />
                )
            })}
        </div>
    );
}

export default MessageList

// class MessageList extends React.Component {

//     render() {
//         return (
//             <div className="message-list">
//                 {this.props.messages.map((message, index) => {
//                     return (
//                         <Message
//                             key={index}
//                             userName={message.senderId}
//                             text={message.parts[0].payload.content}
//                         />
//                     )
//                 })}
//             </div>
//         )
//     }
// }

// export default MessageList
