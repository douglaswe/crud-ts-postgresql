import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { PrivateRoute } from './routes/PrivateRoute';

import LoginPage from './pages/LoginPage';
import PainelPage from './pages/PainelPage';
import AdminCadastroUsuario from './pages/AdminCadastroUsuario';
import RedefinirSenha from './components/RedefinirSenha';
import RecuperarSenha from './components/RecuperarSenha';


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
          <Route path="recuperar-senha" element={<RecuperarSenha />} />
          <Route path="redefinir-senha" element={<RedefinirSenha />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
