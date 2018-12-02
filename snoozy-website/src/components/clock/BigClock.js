import React from 'react';

class BigClock extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            time: new Date().toLocaleTimeString()
        };
    }
    
    tick = () => {
        this.setState({ time: new Date().toLocaleTimeString() });
    } 
    
    componentDidMount = () => {
        this.interval = setInterval(() => {
            this.tick();
        }, 1000)
    }
    
    componentWillUnmount = () => {
        clearInterval(this.interval);
    }
    
    render = () => {
        return (
            <div className='BigClock'>
                <h1>{ this.state.time }</h1>
            </div>
        )
    }
}

export default BigClock;