import React from 'react';
import Axios from "axios";
import { Channel } from './Channel';

let newChannel = ''

const channelAdd = async () => {
    Axios.post("http://localhost:3001/channelAdd", {
        username: newChannel
    })
};

export class ChannelList extends React.Component {

    handleClick = id => {
        this.props.onSelectChannel(id);
    }

    constructor(props) {
        super(props);
        this.state = {value: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        newChannel = this.state.value;
        event.preventDefault();
    }

    render() {

        let list = <div className="no-content-message">There is no channels to show</div>;
        if (this.props.channels && this.props.channels.map) {
            list = this.props.channels.map(c => <Channel key={c.id} id={c.id} name={c.name} participants={c.participants} onClick={this.handleClick} />);
        }
        return (
            <div className='channel-list'>
                <form onSubmit={this.handleSubmit} onClick={channelAdd}>
                    <label>
                        <input type="text" value={this.state.value} onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
                {list}
            </div>);
    }

}

/*
constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
}

handleChange(event) {
    this.setState({value: event.target.value});
}

handleSubmit(event) {
    newChannel = this.state.value;
    event.preventDefault();
}
*/

/*
<form onSubmit={this.handleSubmit} onClick={channelAdd}>
    <label>
        <input type="text" value={this.state.value} onChange={this.handleChange} />
    </label>
    <input type="submit" value="Submit" />
</form>
*/
