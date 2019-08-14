import React, { Component } from 'react'
import { connect } from 'react-redux'
import { isEmpty, firebaseConnect, withFirestore } from 'react-redux-firebase'
import { compose } from 'redux'
import { setToMain } from './eventActions.jsx'
import EventDetailHeader from './EventDetailHeader.jsx'
import EventDetailInfo from './EventDetailInfo.jsx'
import EventDetailChat from './EventDetailChat.jsx'
import EventDetailSidebar from './EventDetailSidebar.jsx'
import Footer from '../nav/Footer.jsx'
import { addEventComment, goingToggleOn, goingToggleOff } from '../useracct/userActions.jsx'
import { createDataTree, objToArray } from '../../app/common/util/shapers.js'
import Loader from '../layout/Loader.jsx'

const mapState = (state, ownProps) => {
  const eventId = ownProps.match.params.id
  const {events} = state.firestore.ordered
  let event = {}
  if (eventId && events && events.length > 0) {
    event = events.find(e => e.id === eventId)
  }
  return {
    processing: state.async.processing,  
    requesting: state.firestore.status.requesting,
    eventChat: 
      !isEmpty(state.firebase.data.event_chat) &&
      objToArray(state.firebase.data.event_chat[ownProps.match.params.id]),
    err: state.async.err,
    fba: state.firebase.auth,
    event
  }
}

const actions = {
  setToMain,
  addEventComment,
  goingToggleOn,
  goingToggleOff,
}

class EventDetailPage extends Component {
  state = {
    initialize: true,
    eventNotFoundMsg: '',
  }
  async componentDidMount() {
    const {firestore, match} = this.props
    await firestore.setListener(`events/${match.params.id}`)
    this.setState({
      initialize: false,
    })
  }
  async componentWillUnmount() {
    const {firestore, match} = this.props
    await firestore.unsetListener(`events/${match.params.id}`)
  }
  render() {
    const {processing, eventChat, err, setToMain, addEventComment, goingToggleOn, goingToggleOff, fba, event} = this.props
    const authenticated = fba.isLoaded && !fba.isEmpty
    const convertedAttendees = event && event.attendees && objToArray(event.attendees)
    const isHost = event && fba.uid === event.hostUid
    const isGoing = convertedAttendees && convertedAttendees.some(a => a.id === fba.uid)
    const {eventNotFoundMsg} = this.state
    const chatTree = !isEmpty(eventChat) && createDataTree(eventChat.reverse())
    const loadingEvent = this.props.requesting[`events/${this.props.match.params.id}`] 
    if (this.state.initialize || loadingEvent) return <Loader/>
    return (
      <div>
        <div className='row'>
          <div className='col-lg-2'></div>
          {
            eventNotFoundMsg.length > 0 &&
            <h6 className='input-err-msg p-2 container-fluid mx-3'>
              <i class="fas fa-exclamation-circle mr-2 my-1"></i>
              <span className='my-1'>{eventNotFoundMsg}</span>
              <i class="fas fa-minus mx-2 my-1"></i>
              <a href="/create" className='badge badge-pill badge-dark my-1 py-0'>create a new one.</a>
            </h6>
          }
          {
            eventNotFoundMsg.length === 0 &&
            <div className='col-lg-5 px-0'>
              <EventDetailHeader 
                processing={processing}
                setToMain={setToMain}
                goingToggleOn={goingToggleOn} 
                goingToggleOff={goingToggleOff}
                isGoing={isGoing} 
                isHost={isHost} 
                fba={fba} 
                event={event || {}}
              />
              <EventDetailInfo event={event || {}}/>
            </div>
          }
          {
            eventNotFoundMsg.length === 0 &&
            <div className='col-lg-3 px-0'>
              <EventDetailSidebar currentUser={fba} hostUid={(event && event.hostUid) || {}} attendees={convertedAttendees}/>
              <EventDetailChat fba={fba} eventChat={chatTree} authenticated={authenticated} err={err} eventId={event && event.id} addEventComment={addEventComment}/>
            </div>
          }
          <div className='col-lg-2'></div>
        </div>
        <Footer/>
      </div>
    )
  }
}

export default compose(
  withFirestore,
  connect(mapState, actions),
  firebaseConnect((props) => ([`event_chat/${props.match.params.id}`])),
)(EventDetailPage)
