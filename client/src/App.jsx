import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Landing, Error, LoginRegister, ProtectedRoute } from './pages';
import {
  SharedLayout,
  Home,
  Workout,
  AllWorkouts,
  CreateMeso,
  Profile,
  AllMesocycles,
} from './pages/dashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Home />} />
          <Route path='workout' element={<Workout />} />
          <Route path='all-workouts' element={<AllWorkouts />} />
          <Route path='all-mesocycles' element={<AllMesocycles />} />
          {/* CUSTOM EXERCISES ROUTE? */}
          <Route path='create-meso' element={<CreateMeso />} />
          <Route path='profile' element={<Profile />} />
        </Route>
        <Route path='landing' element={<Landing />} />
        <Route path='login' element={<LoginRegister />} />
        <Route path='*' element={<Error />} />
      </Routes>
      <ToastContainer
        position={window.innerWidth < 992 ? 'bottom-center' : 'top-center'}
        autoClose='2500'
        pauseOnFocusLoss={false} /* theme='dark' */
      />
    </BrowserRouter>
  );
}

export default App;
