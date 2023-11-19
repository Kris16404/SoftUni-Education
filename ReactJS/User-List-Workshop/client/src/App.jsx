import './styles.css';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Table from './components/Table.jsx';

function App() {
  return (
    <>
      <Header />
      <main className="main">
        <section className="card users-container">
          <Table />
        </section>
      </main>
      <Footer />
    </>
  );
}

export default App;
