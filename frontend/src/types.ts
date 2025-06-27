export type Livro = {
  id: number;
  titulo: string;
  autor: string;
};

export const baseURL = import.meta.env.VITE_API_URL;