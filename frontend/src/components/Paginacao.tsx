type Props = {
  pagina: number;
  total: number;
  livrosCarregados: number;
  onAnterior: () => void;
  onProximo: () => void;
};

export function Paginacao({ pagina, total, onAnterior,livrosCarregados, onProximo }: Props) {
  const desativarAnterior = pagina === 1 || livrosCarregados === 0;
  const desativarProximo = pagina === total || livrosCarregados === 0;
  return (
    <div className="flex justify-center mt-6 gap-4">
      <button 
      onClick={onAnterior} 
      disabled={desativarAnterior} 
      className="px-4 py-2 bg-gray-200 rounded cursor-pointer disabled:cursor-not-allowed"
      >
        Anterior
        </button>
      <span>Página {pagina} de {total}</span>
      
      <button 
      onClick={onProximo} 
      disabled={desativarProximo} 
      className="px-4 py-2 bg-gray-200 rounded cursor-pointer disabled:cursor-not-allowed">Próxima</button>
    </div>
  );
}

