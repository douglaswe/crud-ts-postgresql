import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { baseURL } from '../types';

export default function RecuperarSenha() {
  const [username, setUsername] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState('');
  const [link, setLink] = useState(''); 

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');
    setMensagem('');
    setLink('');

    try {
      const res = await axios.post(`${baseURL}/auth/solicitar-recuperacao`, { username });

      if (res.data.link) {
        setLink(res.data.link); 
      }

      setMensagem('Se o e-mail existir, um link de recuperação foi enviado.');
    } catch (err: any) {
      if (err.response?.status === 404) {
        setErro('Usuário não encontrado.');
      } else {
        setErro('Erro ao tentar enviar o e-mail.');
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-blue-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-xl font-bold mb-4 text-center">Recuperar Senha</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Seu e-mail"
            required
            className="border border-gray-300 p-2 rounded"
          />

          {mensagem && <p className="text-green-600 text-sm">{mensagem}</p>}
          {erro && <p className="text-red-600 text-sm">{erro}</p>}

          <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 cursor-pointer">
            Enviar link
          </button>

          <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50 transition-all cursor-pointer"
              >
              Voltar
            </button>
        </form>
        {link && (
          <div className="mt-4 text-base text-gray-600 break-words">
          <div className='font-bold'> Link gerado:</div> 
          <a href={link} className="text-blue-600 items-center justify-center ">{link}</a>
          </div>
        )}
      </div>
    </div>
  );
}
