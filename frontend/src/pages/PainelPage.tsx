import { useEffect, useState } from 'react';
import axios from 'axios';
import { LivroForm } from '../components/LivroForm';
import { LivroTabela } from '../components/LivroTabela';
import { EditarModal } from '../components/EditarModal';
import { DeletarModal } from '../components/DeletarModal';
import { Paginacao } from '../components/Paginacao';
import { TabsNavegacao } from '../components/TabsNavegacao';
import type { Livro } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { TrocarSenhaLogado } from '../components/TrocarSenhaLogado';

export default function PainelPage() {
  const [livros, setLivros] = useState<Livro[]>([]);
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  const [pagina, setPagina] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);

  const [livroSelecionado, setLivroSelecionado] = useState<Livro | null>(null);
  const [modalExcluir, setModalExcluir] = useState<Livro | null>(null);

  const [tab, setTab] = useState<'livros' | 'config'>('livros');

  const { user, token, logout } = useAuth();
  const navigate = useNavigate();

  const porPagina = 4;

  async function carregarLivros() {
    setCarregando(true);
    try {
      const { data } = await axios.get(`http://localhost:3000/livros?page=${pagina}&limit=${porPagina}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLivros(data.data);
      setTotalPaginas(data.totalPages);
    } catch (error) {
      setErro('Erro ao carregar livros.');
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregarLivros();
  }, [pagina]);

  async function criarLivro(e: React.FormEvent) {
    e.preventDefault();

    if (!titulo || !autor) {
      setErro('Preencha todos os campos');
      return;
    }

    try {
      await axios.post('http://localhost:3000/livros', { titulo, autor }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTitulo('');
      setAutor('');
      setErro('');
      carregarLivros();
    } catch (error) {
      setErro('Erro ao salvar');
    }
  }

  async function salvarEdicao() {
    if (livroSelecionado) {
      try {
        await axios.put(`http://localhost:3000/livros/${livroSelecionado.id}`, {
          titulo: livroSelecionado.titulo,
          autor: livroSelecionado.autor,
        }, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setLivroSelecionado(null);
        carregarLivros();
      } catch (error) {
        setErro('Erro ao atualizar');
      }
    }
  }

  async function confirmarExclusao() {
    if (modalExcluir) {
      try {
        await axios.delete(`http://localhost:3000/livros/${modalExcluir.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setModalExcluir(null);
        carregarLivros();
      } catch (error) {
        setErro('Erro ao excluir');
      }
    }
  }
  
  const handleLogout = () => { logout(); navigate('/'); };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">
          Bem-vindo, {user?.nome} ({user?.tipo === '0' ? 'Administrador' : 'Usuário'}) - Acessos: {user?.quantAcesso}
          
        </h1>

        <div className="flex gap-2">
          {user?.tipo === '0' && (
            <button
              onClick={() => navigate('/admin/cadastrar-usuario')}
              className="border border-blue-600 text-blue-600 rounded hover:bg-blue-100 transition-all cursor-pointer px-4 py-2"
            >
              Cadastrar Usuário
            </button>
          )}
          <button
            className="border border-red-600 text-red-600 rounded hover:bg-red-100 transition-all cursor-pointer px-4 py-2"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
      <TabsNavegacao tab={tab} setTab={setTab} />

      {tab === 'livros' && (
        <>
          <LivroForm
            titulo={titulo}
            autor={autor}
            erro={erro}
            onTituloChange={setTitulo}
            onAutorChange={setAutor}
            onSalvar={criarLivro}
          />

          <LivroTabela
            livros={livros}
            carregando={carregando}
            onEditar={setLivroSelecionado}
            onExcluir={setModalExcluir}
          />

          <Paginacao
            pagina={pagina}
            total={totalPaginas}
            livrosCarregados={livros.length}
            onAnterior={() => setPagina(pagina - 1)}
            onProximo={() => setPagina(pagina + 1)}
          />

          {livroSelecionado && (
            <EditarModal
              livro={livroSelecionado}
              onClose={() => setLivroSelecionado(null)}
              onChange={(campo, valor) =>
                setLivroSelecionado(prev =>
                  prev ? { ...prev, [campo]: valor } : prev
                )
              }
              onSalvar={salvarEdicao}
            />
          )}

          {modalExcluir && (
            <DeletarModal
              livro={modalExcluir}
              onClose={() => setModalExcluir(null)}
              onConfirmar={confirmarExclusao}
            />
          )}
        </>
      )}

      {tab === 'config' && (
        <TrocarSenhaLogado />
      )}
    </div>
  );
}
