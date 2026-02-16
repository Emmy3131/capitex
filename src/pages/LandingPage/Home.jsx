import Hero from "./Hero";
import Trust from "./Trust";
import HowItWorks from "./HowItWorks";
import FeaturesAndSecurity from "./FeaturesAndSecurity";
import Testimony from "./Testimony";
import FinalCTA from "./FinalCTA";
import TradingViewWidget from "./TradingViewWidget";


const Home = () => {
  return(
    <div className="overFloating-hidden">
      <Hero />
      <Trust /> 
      <HowItWorks />
      <FeaturesAndSecurity />
      {/* <TradingViewWidget />
      <Testimony />
      <FinalCTA />  */}
      
      
    </div>
  )
};

export default Home;