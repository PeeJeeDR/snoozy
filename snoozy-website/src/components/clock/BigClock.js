import React from 'react';

class BigClock extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            time: new Date()
        };
    }
    
    tick = () => {
        this.setState({ time: new Date() });
    } 
    
    componentDidMount = () => {
        this.interval = setInterval(() => {
            this.tick();
        }, 1000)
    }
    
    componentWillUnmount = () => {
        clearInterval(this.interval);
    }

    returnHours = () => {
        if (this.state.time.getHours() >= 0 && this.state.time.getHours() < 10)
        {
            return `0${ this.state.time.getHours() }`
        }
        else 
        {
            return this.state.time.getHours();
        }
    }

    returnMinutes = () => {
        if (this.state.time.getMinutes() >= 0 && this.state.time.getMinutes() < 10)
        {
            return `0${ this.state.time.getMinutes() }`
        }
        else 
        {
            return this.state.time.getMinutes();
        }
    }

    returnSeconds = () => {
        if (this.state.time.getSeconds() >= 0 && this.state.time.getSeconds() < 10)
        {
            return `0${ this.state.time.getSeconds() }`
        }
        else 
        {
            return this.state.time.getSeconds();
        }
    }
    
    render = () => {
        return (
            <div className='BigClock'>
                <h1>{ `${ this.returnHours() }:${ this.returnMinutes() }:${ this.returnSeconds() }` }</h1>
            </div>
        )
    }
}

export default BigClock;