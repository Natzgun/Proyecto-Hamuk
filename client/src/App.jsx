import { Route, Routes } from 'react-router-dom';
import About from './routes/About';
import Contact from './routes/Contact';
import Experience from './routes/Experience';
import HomePage from './routes/Homepage';
import Navbar from './components/navbar/Navbar';
import AuthNavbar from './components/navbar/AuthNavDesk';
import NotFoundPage from './routes/NotFoundPage';
import RegisterPage from './routes/RegisterPage';
import LoginPage from './routes/LoginPage';
import { BrowserRouter } from 'react-router-dom';
import TaskFormPage from './routes/TaskFormPage';
import Profile from './routes/Profile';
import ProtectedRoute from './ProtectedRoute';
import TasksPage from './routes/TasksPage';
import { useAuth } from './context/AuthContext';

function App() {
  const { isAuthenticated } = useAuth();
  return (
    <>
      <BrowserRouter>
        {isAuthenticated ? <AuthNavbar /> : <Navbar />}
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path='/tasks' element={<TasksPage />} />
            <Route path='/add-task' element={<TaskFormPage />} />
            <Route path='/tasks/:id' element={<TaskFormPage />} />
            <Route path='/profile' element={<Profile />} />
          </Route>

          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/about' element={<About />} />
          <Route path='/Experience' element={<Experience />} />
          <Route path='/Contact' element={<Contact />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
