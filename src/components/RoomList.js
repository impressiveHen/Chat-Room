import React from 'react'

class RoomList extends React.Component {
    render() {
        // sort modifies array, so copy array as to not messed up props
        // sort rooms such that rooms i.e [joinableRooms, joinedRooms] are always in same order
        const orderedRooms = [...this.props.rooms].sort((room1, room2) => room1.name > room2.name);
        return (
            <div className="rooms-list">
                <ul>
                    <h3 style={{color: '#191970', fontWeight: 100}}>MY ROOMS:</h3>
                    {orderedRooms.map(room => {
                        const isActive = room.id === this.props.currentRoomId ? "active" : " ";
                        return (
                            <li key={room.id} className={"room " + isActive} >
                                <a
                                    href="#"
                                    // onClick={this.props.subscribeToRoom(room.id)} -> if write like
                                    // this it will be called immediately on component render not on
                                    // onClick event
                                    onClick={() => this.props.subscribeToRoom(room.id)}
                                >
                                    # {room.name}
                                </a>
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    }
}

export default RoomList