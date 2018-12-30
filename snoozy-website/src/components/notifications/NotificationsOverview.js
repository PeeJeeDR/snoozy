import React from 'react';
import { db } from '../../firebase/firebase';
import Notification from './Notification';

class NotificationsOverview extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            notifications: [],
            apiLoaded: false,
        };
    }
    
    componentWillMount = () => {
        db.collection('notifications').onSnapshot(docs => {
            this.setState({ notifications: [] })
            docs.forEach(doc => {
                this.setState({ notifications: [...this.state.notifications, doc.data()] });
            })
        });
    }

    renderNotifications = () => {
        return this.state.notifications.map((notification, i) => (
            <Notification key={ i } notification={ notification }/>
        ))
    }
    
    render = () => {
        return (
            <div className={ `NotificationsOverview ${ this.props.active ? 'show' : '' }`}>
                { this.renderNotifications() }
            </div>
        )
    }
}

export default NotificationsOverview;