import React, {Component} from 'react';
import EventList from './events/EventList.jsx'
import cuid from 'cuid'
import SearchEvent from './controlpanel/SearchEvent.jsx'
import CreateEvent from './controlpanel/CreateEvent.jsx'
import InstantMsg from './controlpanel/InstantMsg.jsx'


const sampledata = [
  {
    id: '1',
    title: 'Trip to Tower of London',
    startDate: '2018-03-27T11:00:00+00:00',
    category: 'culture',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.',
    location: 'London, UK',
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
    startDate: '2018-03-28T14:00:00+00:00',
    category: 'drinks',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.',
    location: 'London, UK',
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
  state = {
    events: sampledata
  }
  handleCreateEvent = (newEvent) => {
   newEvent.id = cuid();
   newEvent.hostedBy = newEvent.id;
   newEvent.attendees = [
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
   const updatedEvents = [...this.state.events, newEvent];
   this.setState({
     events: updatedEvents
   });
  }
  render() {
        return (
          <div className='row'>
            <div className='col-lg-4 mb-3'>
              <div class="input-group mb-3">
                <input type="text" class="form-control ml-3 border-dark rounded-0" placeholder="Sup?"/>
                <div class="input-group-append mr-3"><button class="btn btn-outline-dark rounded-0" type="button"><i class="fas fa-search"></i></button></div>
              </div>
              <div class="accordion mx-3" id="dashboard">
                <SearchEvent/>
                <CreateEvent handleCreateEvent={this.handleCreateEvent}/>
                <InstantMsg/>
              </div>
            </div>
            <EventList events={this.state.events} />
            </div>
        )
  }
}

export default App;