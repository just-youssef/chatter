import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar, Private, NotFound } from './components';
import { Home, Login, Profile, Register, Verification, VerificationConfirm } from './pages';

const App = () => {
  return (
    <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/verification/:id" element={<Verification />} />
      <Route path="/verification-confirm/:id/:token" element={<VerificationConfirm />} />
      <Route element={<Private />}>
        <Route path="/profile" element={<Profile />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Router>
  )
}

export default App