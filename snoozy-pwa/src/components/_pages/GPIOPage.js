import React from 'react';
import axios from 'axios';

class GPIOPage extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            ledIsOn: false,
        };
    }

    lightLed = () => {
        if (this.state.ledIsOn)
        {
            axios.post('http://192.168.1.4:8080/light-on', { active: this.state.ledIsOn })
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            })
        }

        if (!this.state.ledIsOn)
        {
            axios.post('http://192.168.1.4:8080/light-off', { active: this.state.ledIsOn })
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            })
        }
    }

    toggleLight = () => {
        this.setState({ ledIsOn: !this.state.ledIsOn });
    }
    
    render = () => {
        { this.lightLed() }
        return (
            <div className='GPIOPage'>
                <h1>GPIO</h1>
                <button onClick={ this.toggleLight } style={{ borderWidth: 1, borderColor: 'darkgrey', outline: 'none' }}>
                    { 
                        this.state.ledIsOn ?
                        'Turn Off' :
                        'Turn On'
                    }
                </button>
            </div>
        )
    }
}

export default GPIOPage;