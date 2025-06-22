type Props = {
  pagina: number;
  total: number;
  onAnterior: () => void;
  onProximo: () => void;
};

export function Paginacao({ pagina, total, onAnterior, onProximo }: Props) {
  return (
    <div className="flex justify-center mt-6 gap-4">
      <button onClick={onAnterior} disabled={pagina === 1} className="px-4 py-2 bg-gray-200 rounded cursor-pointer disabled:cursor-not-allowed">Anterior</button>
      <span>Página {pagina} de {total}</span>
      <button onClick={onProximo} disabled={pagina === total} className="px-4 py-2 bg-gray-200 rounded cursor-pointer disabled:cursor-not-allowed">Próxima</button>
    </div>
  );
}

