import React, { Component } from 'react'
import { connect } from 'react-redux'
import Select from 'react-select'
import Loader from '../layout/Loader.jsx'
import EventList from '../events/EventList.jsx'
import { SearchBar } from '../search/SearchBar.jsx'
import { SEARCH_EVENT } from '../events/eventConstants.jsx'
import { 
    totalRecommended, recommendedEvents,
    totalSubscriptions, subscribedEvents,
    getTotalOfContinent, getEventsByContinent,
    getTotalHosting, getHostingEvents,
    getTotalGoing, getGoingEvents,
    getTotalAttended, getAttendedEvents,
    getTotalLiked, getLikedEvents,
    getTotalSaved, getSavedEvents,
} from '../events/eventActions.jsx'

const mapState = (state) => ({
    fba: state.firebase.auth,
    events: state.events,
    loading: state.async.loading,
  })
  
const actions = {
  totalRecommended, recommendedEvents,
  totalSubscriptions, subscribedEvents,
  getTotalOfContinent, getEventsByContinent,
  getTotalHosting, getHostingEvents,
  getTotalGoing, getGoingEvents,
  getTotalAttended, getAttendedEvents,
  getTotalLiked, getLikedEvents,
  getTotalSaved, getSavedEvents,
}  

class EventSearch extends Component {
    state = {
        selectedStatus: this.props.statusOpts[0],
        loader: false,
        initialize: true,
        loadedEvents: [],
        opts: 0,
    }    
    initEventList = async () => {
        const { type, profileId } = this.props
        const { selectedStatus } = this.state
        let next = null
        switch (type) {
            case 'Recommended':
                this.setState({
                    opts: await this.props.totalRecommended()
                })
                next = await this.props.recommendedEvents()                
                break
            case 'Asia':
                this.setState({
                    opts: await this.props.getTotalOfContinent(selectedStatus, 'AS')
                })
                next = await this.props.getEventsByContinent(selectedStatus, 'AS')
                break          
            case 'Africa':
                this.setState({
                    opts: await this.props.getTotalOfContinent(selectedStatus, 'AF')
                })
                next = await this.props.getEventsByContinent(selectedStatus, 'AF')
                break        
            case 'Europe':
                this.setState({
                    opts: await this.props.getTotalOfContinent(selectedStatus, 'EU')
                })
                next = await this.props.getEventsByContinent(selectedStatus, 'EU')
                break                  
            case 'NorthAmerica':
                this.setState({
                    opts: await this.props.getTotalOfContinent(selectedStatus, 'NA')
                })
                next = await this.props.getEventsByContinent(selectedStatus, 'NA')
                break                  
            case 'SouthAmerica':
                this.setState({
                    opts: await this.props.getTotalOfContinent(selectedStatus, 'SA')
                })
                next = await this.props.getEventsByContinent(selectedStatus, 'SA')
                break                              
            case 'Oceania':
                this.setState({
                    opts: await this.props.getTotalOfContinent(selectedStatus, 'OC')
                })
                next = await this.props.getEventsByContinent(selectedStatus, 'OC')
                break                                          
            case 'Antarctica':
                this.setState({
                    opts: await this.props.getTotalOfContinent(selectedStatus, 'AN')
                })
                next = await this.props.getEventsByContinent(selectedStatus, 'AN')
                break      
            case 'Hosting':
                this.setState({
                    opts: await this.props.getTotalHosting(selectedStatus, profileId)
                })
                next = await this.props.getHostingEvents(selectedStatus, profileId)
                break    
            case 'Going':
                this.setState({
                    opts: await this.props.getTotalGoing(selectedStatus, profileId)
                })
                next = await this.props.getGoingEvents(selectedStatus, profileId)
                break                
            case 'Attended':
                this.setState({
                    opts: await this.props.getTotalAttended(profileId)
                })
                next = await this.props.getAttendedEvents(profileId)
                break       
            case 'Liked':
                this.setState({
                    opts: await this.props.getTotalLiked(selectedStatus, profileId)
                })
                next = await this.props.getLikedEvents(selectedStatus, profileId)
                break                            
            case 'Saved':
                this.setState({
                    opts: await this.props.getTotalSaved(selectedStatus, profileId)
                })
                next = await this.props.getSavedEvents(selectedStatus, profileId)
                break                                        
            default:
                this.setState({
                    opts: await this.props.totalSubscriptions(selectedStatus)
                })
                next = await this.props.subscribedEvents(selectedStatus)                
        }
        if (next && next.docs && next.docs.length >= 1) {      
            this.setState({
                loader: true,
                initialize: false,
            })
        }    
    }
    componentDidMount() {
        this.initEventList()
    }     
    static getDerivedStateFromProps(nextProps, prevState) {
        const nextEvents = prevState.initialize ? [] : nextProps.events 
        const prevEvents = prevState.loadedEvents
        if (nextEvents[nextEvents.length-1] !== prevEvents[prevEvents.length-1]) {
            return {
                loadedEvents: [...prevEvents, ...nextEvents]        
            }     
        }
        // Return null to indicate no change to state.
        return null
    }       
    loadMoreEvents = async() => {
        const {profileId, type, events} = this.props
        const {selectedStatus} = this.state        
        let lastEvent = events && events[events.length-1]
        let next = null
        switch (type) {
            case 'Recommended':
                next = await this.props.recommendedEvents(lastEvent)
                break
            case 'Asia':
                next = await this.props.getEventsByContinent(selectedStatus, 'AS', lastEvent)
                break
            case 'Africa':
                next = await this.props.getEventsByContinent(selectedStatus, 'AF', lastEvent)
                break                
            case 'Europe':
                next = await this.props.getEventsByContinent(selectedStatus, 'EU', lastEvent)
                break                                
            case 'NorthAmerica':
                next = await this.props.getEventsByContinent(selectedStatus, 'NA', lastEvent)
                break    
            case 'SouthAmerica':
                next = await this.props.getEventsByContinent(selectedStatus, 'SA', lastEvent)
                break                
            case 'Oceania':
                next = await this.props.getEventsByContinent(selectedStatus, 'OC', lastEvent)
                break                            
            case 'Antarctica':
                next = await this.props.getEventsByContinent(selectedStatus, 'AN', lastEvent)
                break                                            
            case 'Hosting':
                next = await this.props.getHostingEvents(selectedStatus, profileId, lastEvent)
                break
            case 'Going':
                next = await this.props.getGoingEvents(selectedStatus, profileId, lastEvent)
                break                
            case 'Attended':
                next = await this.props.getAttendedEvents(profileId, lastEvent)
                break                            
            case 'Liked':
                next = await this.props.getLikedEvents(selectedStatus, profileId, lastEvent)
                break                            
            case 'Saved':
                next = await this.props.getSavedEvents(selectedStatus, profileId, lastEvent)
                break                                        
            default:
                next = await this.props.subscribedEvents(selectedStatus, lastEvent)
        }
        if (next && next.docs && next.docs.length <= 1) {
            this.setState({
                loader: false
            })
        }
    }    
    handleStatusChange = async(selectedStatus) => {
        await this.setState({
            selectedStatus,
            loader: false,
            initialize: true,
            loadedEvents: [],              
        })
        this.initEventList()        
    }    
    render() {
        const {isGeo, statusOpts, type, fba, loading} = this.props    
        const {selectedStatus, opts, initialize, loadedEvents, loader} = this.state
        return (
            <div>
                <SearchBar placeholder={SEARCH_EVENT}/>
                <Select
                    className='w-auto mb-3 mx-3'
                    isSearchable={false}
                    value={selectedStatus}
                    options={statusOpts}                    
                    onChange={this.handleStatusChange}                    
                    theme={(theme) => ({
                        ...theme,
                        borderRadius: 0,
                        colors: {
                        ...theme.colors,
                        primary25: '#f5f5f5',
                        primary50: '#f5f5f5',
                        primary: '#303aa5',
                        },
                    })}
                />
                <EventList 
                    isGeo={isGeo}
                    type={type}
                    loadMoreEvents={this.loadMoreEvents}
                    loader={loader}
                    loading={loading}
                    status={selectedStatus.value}                    
                    opts={opts}
                    events={loadedEvents} 
                    fba={fba}
                    initialize={initialize}
                />   
                {loading && !initialize && opts !== loadedEvents.length && <Loader/>}
            </div>
        )
    }
}

export default connect(mapState, actions)(EventSearch)