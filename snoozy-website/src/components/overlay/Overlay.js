import React from 'react';

class Overlay extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            active: false
        };

        this.counter        = 0
        this.timeActive     = 8
    }
    
    componentDidMount = () => {
		this.secondInterval 	= setInterval(() => {
            if (this.state.active)
            {
                this.counter++
                this.props.onOverlayStateChange(this.state.active)
            }

            if (this.counter === this.timeActive)
            {
                this.counter    = 0
                this.setState({ active: false })
                this.props.onOverlayStateChange(this.state.active)
            }
        }, 1000);
	} 

	componentWillUnmount = () => {
		clearInterval(this.secondInterval)
	}
    
    render = () => {
        return (
            <div 
                className={ `Overlay ${ this.state.active ? '' : 'dark' }` }
                onClick={ () => this.setState({ active: true }) }
            >
                
            </div>
        )
    }
}

export default Overlay;