import React, { Component } from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
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
import { getTotalOfContinent } from '../events/eventActions.jsx'

const mapState = (state) => ({
    totalCountsLoading: state.async.loading,       
    fbp: state.firebase.profile, 
    fba: state.firebase.auth, 
})

const actions = {
    getTotalOfContinent,
}
class Dashboard extends Component {    
    state = {
        totalAsiaEvents: 0,
        totalAfricaEvents: 0,
        totalEuropeEvents: 0,
        totalNorthAmericaEvents: 0,
        totalSouthAmericaEvents: 0,
        totalOceaniaEvents: 0,
        totalAntarcticaEvents: 0,
    }
    async componentDidMount() {
        this.setState({
            totalAsiaEvents: await this.props.getTotalOfContinent('AS'),
            totalAfricaEvents: await this.props.getTotalOfContinent('AF'),
            totalEuropeEvents: await this.props.getTotalOfContinent('EU'),
            totalNorthAmericaEvents: await this.props.getTotalOfContinent('NA'),
            totalSouthAmericaEvents: await this.props.getTotalOfContinent('SA'),
            totalOceaniaEvents: await this.props.getTotalOfContinent('OC'),
            totalAntarcticaEvents: await this.props.getTotalOfContinent('AN'),
        })
    }
    render() {
        const { totalCountsLoading, fbp, fba } = this.props
        const { 
            totalAsiaEvents, 
            totalAfricaEvents, 
            totalEuropeEvents,
            totalNorthAmericaEvents,
            totalSouthAmericaEvents,
            totalOceaniaEvents,
            totalAntarcticaEvents,
        } = this.state
        return (
            <div>
                <div className='row'>
                    <div className='col-lg-2'></div>
                    <div className='col-lg-3 px-3'>
                        <Menu
                            loading={totalCountsLoading}
                            totalAsiaEvents={totalAsiaEvents}
                            totalAfricaEvents={totalAfricaEvents}
                            totalEuropeEvents={totalEuropeEvents}
                            totalNorthAmericaEvents={totalNorthAmericaEvents}
                            totalSouthAmericaEvents={totalSouthAmericaEvents}
                            totalOceaniaEvents={totalOceaniaEvents}
                            totalAntarcticaEvents={totalAntarcticaEvents}
                            fba={fba} 
                            fbp={fbp}
                        />
                    </div>    
                    <div className='col-lg-5 px-0'>
                        <Switch>
                            <Redirect 
                                exact from={`/trending`} to={`/trending/europe`}
                            />
                            <Route
                                path={`/trending/asia`}
                                render={() => <Asia type='Asia'/>}
                            />
                            <Route
                                path={`/trending/africa`}
                                render={() => <Africa type='Africa'/>}
                            />
                            <Route
                                path={`/trending/europe`}
                                render={() => <Europe type='Europe'/>}
                            />
                            <Route
                                path={`/trending/northamerica`}
                                render={() => <NorthAmerica type='North America'/>}
                            />
                            <Route
                                path={`/trending/southamerica`}
                                render={() => <SouthAmerica type='South America'/>}
                            />
                            <Route
                                path={`/trending/oceania`}
                                render={() => <Oceania type='Oceania'/>}
                            />
                            <Route
                                path={`/trending/antarctica`}
                                render={() => <Antarctica type='Antartica'/>}
                            />
                        </Switch>                    
                    </div>
                    <div className='col-lg-2'></div>
                </div>
                <Footer/>      
            </div>
        )
    }
}

export default connect(mapState, actions)(
    firestoreConnect([{ collection: 'events' }])(Dashboard)
)
