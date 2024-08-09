import React from 'react'
import Carousel from '../../components/ui/Carousel';
import Campaigns from '../../components/Campaigns';
import MenuWrapper from '../../components/menu/MenuWrapper'
import About from '../../components/About'
import Reservation from '../../components/Reservation';
import Customers from '../../components/customers/Customers'
import Footer from '../../components/layout/Footer';

const Home = ( ) => {
    
    return (
        <React.Fragment >
            <Carousel />
            <Campaigns />
            <MenuWrapper />
            <About />
            <Reservation />
            <Customers />
        </React.Fragment>
    )
}

export default Home