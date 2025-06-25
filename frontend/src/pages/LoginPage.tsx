import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [erro, setErro] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');

    try {
      const response = await axios.post('http://localhost:3000/auth/login', {
        username,
        password,
      });

      const { token, user } = response.data;


      login(token, user);
      navigate('/painel');
    } catch (error: any) {
      const msg = error.response?.data?.message;

      if (msg === 'Usuário bloqueado') {
        setErro('Usuário bloqueado...');
      } else if (msg === 'Senha incorreta') {
        setErro('Senha ou usuário incorreta...');
      } else if (msg === 'Usuário não encontrado') {
        setErro('Usuário não encontrado...');
      } else {
        setErro('Erro ao conectar com o servidor.');
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-200 to-blue-200">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          <input
            type="email"
            className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username (email)"
            required
          />

          <input
            type={showPassword ? 'text' : 'password'}
            className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha"
            required
          />

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
              />
              Mostrar senha
            </label>
          </div>

          {erro && <p className="text-red-600 mb-4 text-center">{erro}</p>}

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded cursor-pointer"
          >
            Entrar
          </button>
          <a
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 cursor-pointer"
            onClick={() => navigate('/recuperar-senha')}
          >
            Esqueceu a senha?
          </a>
        </form>
      </div>
    </div>
  );
}
