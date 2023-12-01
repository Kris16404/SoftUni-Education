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
import NotFound from './components/notFound/NotFound.jsx';
import RedirectTo404 from './components/auth/RedirectTo404.jsx';
import UserInfo from './components/userInfo/UserInfo.jsx';

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
        <Route path="/404" element={<NotFound />} />

        {/* Protected Routes */}
        <Route
          path="/songs/add-song"
          element={<PrivateRoute element={<CreateSong />} />}
        />
        <Route
          path="/songs/edit/:songId"
          element={<PrivateRoute element={<EditSong />} />}
        />
        <Route
          path="/users/me"
          element={<PrivateRoute element={<UserInfo />} />}
        />
        {/* Not found page */}
        <Route path="/*" element={<RedirectTo404 />}></Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
