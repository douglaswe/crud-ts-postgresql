import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function AdminCadastroUsuario() {
  const { token, isAdmin } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: '',
    password: '',
    nome: '',
    tipo: '1',
  });

  const [mensagem, setMensagem] = useState('');

  if (!isAdmin) {
    return <div className="p-4 text-red-500">Acesso restrito</div>;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(
        'http://localhost:3000/auth/register',
        form,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMensagem('Usuário cadastrado com sucesso!');
      setForm({ username: '', password: '', nome: '', tipo: '1' });
    } catch (err: any) {
      setMensagem(err.response?.data?.message || 'Erro ao cadastrar');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">Cadastrar Novo Usuário</h2>

        {mensagem && (
          <p className="mb-4 text-center text-sm text-blue-600 bg-blue-50 p-2 rounded">
            {mensagem}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Usuário"
            value={form.username}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Senha"
            value={form.password}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            name="nome"
            placeholder="Nome"
            value={form.nome}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <select
            name="tipo"
            value={form.tipo}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="1">Usuário Comum</option>
            <option value="0">Administrador</option>
          </select>


          <div className="flex justify-between gap-4 mt-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50 transition-all cursor-pointer"
            >
              Voltar
            </button>

            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors cursor-pointer"
            >
              Cadastrar
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}