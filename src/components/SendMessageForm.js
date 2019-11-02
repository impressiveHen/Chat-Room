import React from 'react'

class SendMessageForm extends React.Component {
    constructor() {
        super();
        this.state = {
            message: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (event) => {
        // console.log(event.target.value);
        this.setState({
            message: event.target.value
        })
    }

    handleSubmit = (event) => {
        // preventDefault() method tells the user agent that if the event does not get explicitly 
        // handled, its default action should not be taken as it normally would be. 
        event.preventDefault();
        // console.log(this.state.message);
        this.props.sendSimpleMessage(this.state.message);
        // clear message after sending -> value
        this.setState({
            message: ''
        });
    }

    render() {
        return (
            <form
                className="send-message-form"
                onSubmit={this.handleSubmit}
            >
                <input
                    disabled={this.props.disabled}
                    onChange={this.handleChange}
                    placeholder="Type message and press ENTER to send"
                    type="text"
                    value={this.state.message}
                />
            </form>
        )
    }
}

export default SendMessageForm