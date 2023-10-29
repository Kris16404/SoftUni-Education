import Navbar from './components/Navbar.jsx';
import SliderSection from './components/SliderSection.jsx';
import ServiceSection from './components/ServiceSection.jsx';
import AboutSection from './components/AboutSection.jsx';

function App() {
  return (
    <>
      <div className="hero_area">
        <Navbar />
        <SliderSection />
      </div>
      <ServiceSection />
      <AboutSection />
    </>
  );
}

export default App;
