import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { PrivateRoute } from './routes/PrivateRoute';

import LoginPage from './pages/LoginPage';
import PainelPage from './pages/PainelPage';
import AdminCadastroUsuario from './pages/AdminCadastroUsuario';


export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes >
          <Route path="/" element={<LoginPage />} />
          <Route
            path='/painel'
            element={
              <PrivateRoute>
                <PainelPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/cadastrar-usuario"
            element={
              <PrivateRoute>
                <AdminCadastroUsuario />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
