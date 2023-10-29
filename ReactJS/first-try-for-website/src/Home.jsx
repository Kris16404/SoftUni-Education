import Navbar from './components/Navbar.jsx';
import SliderSection from './components/SliderSection.jsx';
import ServiceSection from './components/ServiceSection.jsx';

function App() {
  return (
    <>
      <div className="hero_area">
        <Navbar />
        <SliderSection />
      </div>
      <ServiceSection />
    </>
  );
}

export default App;
