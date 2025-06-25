// import { useState } from "react";
// import axios from "axios";
// import { useSearchParams } from "react-router-dom";

// export default function RedefinirSenha() {
//   const [novaSenha, setNovaSenha] = useState("");
//   const [mensagem, setMensagem] = useState("");
//   const [params] = useSearchParams();
//   const token = params.get("token");

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("http://localhost:3000/auth/alterar-senha", { token, novaSenha });
//       setMensagem(res.data.message);
//     } catch (err: any) {
//       setMensagem(err.response?.data?.message || "Erro ao redefinir senha.");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center">
//       <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow w-full max-w-sm">
//         <h2 className="text-xl font-bold mb-4">Redefinir Senha</h2>
//         <input
//           type="password"
//           placeholder="Nova senha"
//           value={novaSenha}
//           onChange={(e) => setNovaSenha(e.target.value)}
//           className="w-full border p-2 mb-4 rounded"
//           required
//         />
//         <button type="submit" className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600">
//           Redefinir senha
//         </button>
//         {mensagem && <p className="mt-4 text-center">{mensagem}</p>}
//       </form>
//     </div>
//   );
// }
// pages/RedefinirSenha.tsx
import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function RedefinirSenha() {
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [erro, setErro] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [searchParams] = useSearchParams();
  
  const token = searchParams.get('token');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');
    setMensagem('');

    if (!token) {
      setErro('Token inválido');
      return;
    }

    if (novaSenha !== confirmarSenha) {
      setErro('As senhas não coincidem');
      return;
    }

    try {
      await axios.patch('http://localhost:3000/auth/redefinir-senha', {
        token,
        novaSenha,
      });

      setMensagem('Senha redefinida com sucesso!');
      setTimeout(() => navigate('/'), 3000);
    } catch (err: any) {
      setErro('Token inválido ou expirado');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-blue-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-xl font-bold mb-4 text-center">Nova Senha</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="password"
            placeholder="Nova senha"
            value={novaSenha}
            onChange={(e) => setNovaSenha(e.target.value)}
            className="border border-gray-300 p-2 rounded"
            required
          />
          <input
            type="password"
            placeholder="Confirmar nova senha"
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
            className="border border-gray-300 p-2 rounded"
            required
          />

          {erro && <p className="text-red-600 text-sm">{erro}</p>}
          {mensagem && <p className="text-green-600 text-sm">{mensagem}</p>}
         
          <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 cursor-pointer">
            Redefinir senha
          </button>

          <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50 transition-all cursor-pointer"
              >
              Voltar
            </button>
        </form>
      </div>
    </div>
  );
}
