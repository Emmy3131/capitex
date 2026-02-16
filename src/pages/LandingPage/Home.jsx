import Hero from "./Hero";
import Trust from "./Trust";
import HowItWorks from "./HowItWorks";
import FeaturesAndSecurity from "./FeaturesAndSecurity";
import Testimony from "./Testimony";
import FinalCTA from "./FinalCTA";



const Home = () => {
  return(
    <div className="overFloating-hidden">
      <Hero />
      <Trust /> 
      <HowItWorks />
      <FeaturesAndSecurity />
      <Testimony />
      <FinalCTA /> 
      
      
    </div>
  )
};

export default Home;