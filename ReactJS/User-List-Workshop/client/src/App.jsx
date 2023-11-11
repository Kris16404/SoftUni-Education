import './styles.css';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import SearchBar from './components/SearchBar.jsx';
import Table from './components/Table.jsx';
import Pagination from './components/Pagination.jsx';

function App() {
  return (
    <>
      <Header />
      <main className="main">
        <section className="card users-container">
          <SearchBar />
          <Table />

          {/* New user button   */}
          <button className="btn-add btn">Add new user</button>

          <Pagination />
        </section>
      </main>
      <Footer />
    </>
  );
}

export default App;
