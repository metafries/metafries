import React, {Component} from 'react';
import EventList from './events/EventList.jsx'
import DashBoard from './controlpanel/DashBoard.jsx'

class App extends Component {
    render() {
        return (
            <div className='row'>
                <DashBoard/>
                <EventList/>
            </div>
        )
    }
}

export default App;