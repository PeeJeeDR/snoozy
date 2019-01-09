import React from 'react';
import { db } from '../../firebase/firebase';
import Header from '../Header/Header';
import Sectionheading from '../Titles/Sectionheading';
import SideNavigation from '../SidebarNavigation/SideNavigation';
import SelectSongSection from '../Sections/SelectSongSection';
import posed from 'react-pose';
import LedColors from '../Sections/LedColors';

const OK    = posed.div({
    hidden: { 
        width: 0,
        height: 0,
    },
    visible: { 
        width: '10rem',
        height: '10rem',
        delayChildren: 200,
        staggerChildren: 10,
        transition: {
            width: {
                type: 'spring',
                stiffness: 1000, 
                damping: 15
            },
            height: {
                type: 'spring',
                stiffness: 1000, 
                damping: 15
            }
        }
    }
});

const Child     = posed.p({
    hidden: {
        opacity: 0,
    },
    visible: {
        opacity: 1,
    }
});

const snoozyRef     = db.collection('snoozy').doc('settings');

class SnoozySettings extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            isVisible: false,
            defaultSelectedSong: localStorage.getItem('SelectedSong'),
        };
    }

    componentWillMount = () => {
        console.log(localStorage.getItem('SelectedSong'));
    }

    playOkAnimation = () => {
        this.setState({ isVisible: true });

        setTimeout(() => {
            this.setState({ isVisible: false })
        }, 1000)
    }

    onSoundSelect = (song) => {
        console.log('from sound', song);

        snoozyRef.update({
            song
        });

        localStorage.setItem('SelectedSong', song);

        this.playOkAnimation();
    }

    onColorSelect = () => {
        this.playOkAnimation();
    }

    render = () => {
        return (
            <div className='SnoozySettings'>
                <OK className='ok' pose={ this.state.isVisible ? 'visible' : 'hidden' }>
                    <Child><i className="fas fa-check"></i></Child>
                </OK>

                <Header />
                <SideNavigation />
                <Sectionheading>Snoozy instellingen</Sectionheading>

                <div className="page_wrapper">
                    <div className="content_wrapper">
                        <SelectSongSection 
                            onClick={ this.onSoundSelect } 
                            defaultSong={ localStorage.getItem('SelectedSong') }
                        />

                        <LedColors 
                            onClick={ this.onColorSelect }
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default SnoozySettings;