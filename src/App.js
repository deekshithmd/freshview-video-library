import "./App.css";
import { Routes, Route } from "react-router-dom";
import {
  Navigation,
  Footer,
  ExploreVideo,
  Liked,
  PlayList,
  WatchLater,
  History,
  SingleVideo,
  Home,
  RequiresAuth,
  Login,
  Signup,
  Error,
  PlaylistVideos,
  Profile
} from "./components";
import {useTheme} from "./contexts"
function App() {
  const {theme}=useTheme()
  return (
    <div className={`App ${theme}`}>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<ExploreVideo />} />
        <Route
          path="/liked"
          element={
            <RequiresAuth>
              <Liked />
            </RequiresAuth>
          }
        />
        <Route
          path="/history"
          element={
            <RequiresAuth>
              <History />
            </RequiresAuth>
          }
        />
        <Route
          path="/playlist"
          element={
            <RequiresAuth>
              <PlayList />
            </RequiresAuth>
          }
        />
        <Route
          path="/watchlater"
          element={
            <RequiresAuth>
              <WatchLater />
            </RequiresAuth>
          }
        />
        <Route path="/singlevideo/:videoId" element={<SingleVideo />} />
        <Route path="/playlistvideos/:playId" element={<PlaylistVideos/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile/>}/>
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
