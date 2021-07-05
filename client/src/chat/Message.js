import React from 'react';

export class Message extends React.Component {

    render() {
        return (
            <div id="outlined-basic" variant="outlined" className='message-item'>
                <div><b>{this.props.senderName}</b></div>
                <span>{this.props.text}</span>
            </div>
        )
    }
}
