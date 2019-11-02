import React, { useState } from 'react'

function NewRoomForm(props) {
    const [newRoomName, setNewRoomName] = useState("");
    let handleChange = (event) => {
        setNewRoomName(event.target.value);
    }

    let handleSubmit = (event) => {
        event.preventDefault();
        props.createNewRoom(newRoomName);
        setNewRoomName("");
    }

    return (
        <div onSubmit={handleSubmit} className="new-room-form">
            <form>
                <input
                    onChange={handleChange}
                    type="text"
                    placeholder="Enter new room name"
                    required 
                    value={newRoomName}
                />
                <button id="create-room-btn" type="submit">+</button>
            </form>
        </div>
    );
}

export default NewRoomForm

// class NewRoomForm extends React.Component {
//     render() {
//         return (
//             <div className="new-room-form">
//                 <form>
//                     <input
//                         onChange={handleChange}
//                         type="text"
//                         placeholder="NewRoomForm"
//                         required />
//                     <button id="create-room-btn" type="submit">+</button>
//                 </form>
//             </div>
//         )
//     }
// }

// export default NewRoomForm