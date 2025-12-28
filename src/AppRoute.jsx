import React from 'react'
import Header from './components/Header.jsx'
import { BrowserRouter, Router, Route } from 'react-router-dom'
import Hero from './pages/Hero.jsx'
import Trust from './pages/Trust.jsx'
import HowItWorks from './pages/HowItWorks.jsx'
import InvestmentPlans from './pages/InvestmentPlans.jsx'
import Testimony from './pages/Testimony.jsx'
import FAQs from './pages/FAQs.jsx'
import FinalCTA from './pages/FinalCTA.jsx'
import Footer from './pages/Footer.jsx'
import FeaturesAndSecurity from './pages/FeaturesAndSecurity.jsx'

const AppRoute = () => {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Hero />
        <Trust />
        <HowItWorks />
        <InvestmentPlans />
        <FeaturesAndSecurity />
        <Testimony />
        <FAQs />
        <FinalCTA />
        <Footer />
      </BrowserRouter>
    </div>
  )
}
export default AppRoute