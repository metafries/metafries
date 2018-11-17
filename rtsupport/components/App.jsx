import React, {Component} from 'react';
import EventList from './events/EventList.jsx'
import DashBoard from './controlpanel/DashBoard.jsx'

const sampledata = [
  {
    id: '1',
    title: 'Trip to Tower of London',
    date: '2018-03-27T11:00:00+00:00',
    category: 'culture',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.',
    city: 'London, UK',
    venue: "Tower of London, St Katharine's & Wapping, London",
    hostedBy: 'Bob',
    hostPhotoURL: '',
    attendees: [
      {
        id: 'a',
        name: 'Bob',
        photoURL: ''
      },
      {
        id: 'b',
        name: 'Tom',
        photoURL: ''
      }
    ]
  },
  {
    id: '2',
    title: 'Trip to Punch and Judy Pub',
    date: '2018-03-28T14:00:00+00:00',
    category: 'drinks',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.',
    city: 'London, UK',
    venue: 'Punch & Judy, Henrietta Street, London, UK',
    hostedBy: 'Tom',
    hostPhotoURL: '',
    attendees: [
      {
        id: 'b',
        name: 'Tom',
        photoURL: ''
      },
      {
        id: 'a',
        name: 'Bob',
        photoURL: ''
      }
    ]
  }
]

class App extends Component {
    constructor(props) {
      super(props);

      this.state = {
        events: sampledata
      }
    }
    render() {
        return (
            <div className='row'>
                <DashBoard/>
                <EventList events={this.state.events} />
            </div>
        )
    }
}

export default App;