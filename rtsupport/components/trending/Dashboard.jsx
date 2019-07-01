import React from 'react'
import { connect } from 'react-redux'
import { firestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import { Route, Switch, Redirect } from 'react-router-dom'
import Footer from '../nav/Footer.jsx'
import Menu from './Menu.jsx'
import Asia from './Asia.jsx'
import Africa from './Africa.jsx'
import Europe from './Europe.jsx'
import NorthAmerica from './NorthAmerica.jsx'
import SouthAmerica from './SouthAmerica.jsx'
import Oceania from './Oceania.jsx'
import Antarctica from './Antarctica.jsx'

const mapState = (state) => ({
    fbp: state.firebase.profile, 
    fba: state.firebase.auth, 
    events: state.firestore.ordered.events,
})

const Dashboard = ({fbp, fba, events}) => {
    const loading = !isLoaded(events) || isEmpty(events)    
    return (
        <div>
            <div className='row'>
                <div className='col-lg-2'></div>
                <div className='col-lg-3 px-3'>
                    <Menu fba={fba} fbp={fbp}/>
                </div>    
                <div className='col-lg-5 px-0'>
                    <Switch>
                        <Redirect 
                            exact from={`/trending`} to={`/trending/asia`}
                        />
                        <Route
                            path={`/trending/asia`}
                            render={() => <Asia type='Asia' loading={loading} fba={fba} events={events}/>}
                        />
                        <Route
                            path={`/trending/africa`}
                            render={() => <Africa type='Africa' loading={loading} fba={fba} events={events}/>}
                        />
                        <Route
                            path={`/trending/europe`}
                            render={() => <Europe type='Europe' loading={loading} fba={fba} events={events}/>}
                        />
                        <Route
                            path={`/trending/northamerica`}
                            render={() => <NorthAmerica type='North America' loading={loading} fba={fba} events={events}/>}
                        />
                        <Route
                            path={`/trending/southamerica`}
                            render={() => <SouthAmerica type='South America' loading={loading} fba={fba} events={events}/>}
                        />
                        <Route
                            path={`/trending/oceania`}
                            render={() => <Oceania type='Oceania' loading={loading} fba={fba} events={events}/>}
                        />
                        <Route
                            path={`/trending/antarctica`}
                            render={() => <Antarctica type='Antartica' loading={loading} fba={fba} events={events}/>}
                        />
                    </Switch>                    
                </div>
                <div className='col-lg-2'></div>
            </div>
            <Footer/>      
        </div>
    )
}

export default connect(mapState, null)(
    firestoreConnect([{ collection: 'events' }])(Dashboard)
)
