import { Routes, Route } from 'react-router-dom';

import Navigation from './components/navigation/Navigation.jsx';
import Home from './components/home/Home.jsx';
import Login from './components/login/Login.jsx';
import Register from './components/register/Register.jsx';
import Footer from './components/footer/Footer.jsx';
import PrivateRoute from './components/auth/PrivateRoute.jsx';
import CreateSong from './components/createSong/CreateSong.jsx';
import CommunityList from './components/communityList/CommunityList.jsx';
import SongDetails from './components/songDetails/SongDetails.jsx';
import EditSong from './components/editSong/EditSong.jsx';

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        {/* Free for all Routes */}

        <Route path="/" element={<Home />} />
        <Route path="/users/login" element={<Login />} />
        <Route path="/users/register" element={<Register />} />
        <Route path="/community/all" element={<CommunityList />} />
        <Route path="/songs/:songId" element={<SongDetails />} />
        {/* Protected Routes */}

        <Route
          path="/songs/add-song"
          element={<PrivateRoute element={<CreateSong />} />}
        />
        <Route
          path="/songs/edit/:songId"
          element={<PrivateRoute element={<EditSong />} />}
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
