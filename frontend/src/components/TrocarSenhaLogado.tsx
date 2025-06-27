import { useState } from 'react'
import axios from 'axios'
import { baseURL } from '../types'

export function TrocarSenhaLogado() {
    const [senhaAtual, setSenhaAtual] = useState('')
    const [novaSenha, setNovaSenha] = useState('')
    const [confirmarSenha, setConfirmarSenha] = useState('')
    const [mensagem, setMensagem] = useState('')
    const [erro, setErro] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setMensagem('')
        setErro('')

        if (novaSenha !== confirmarSenha) {
            setErro('A nova senha e a confirmação devem ser iguais')
            return
        }

        try {
            const token = localStorage.getItem('token')
            await axios.patch(
                `${baseURL}/auth/alterar-senha`,
                { senhaAtual, novaSenha },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )

            setMensagem('Senha alterada com sucesso!')
            setSenhaAtual('')
            setNovaSenha('')
            setConfirmarSenha('')
        } catch (err: any) {
            const msg = err.response?.data?.message || 'Erro ao alterar a senha'
            setErro(msg)
        }
    }

    return (
        <div className="flex flex-col items-center pt-10 bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h1 className="text-2xl font-bold text-center mb-6">Alterar Senha</h1>

                {mensagem && <p className="text-green-600 mb-4 text-center">{mensagem}</p>}
                {erro && <p className="text-red-600 mb-4 text-center">{erro}</p>}

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                        id="senhaAtual"
                        type="password"
                        value={senhaAtual}
                        onChange={e => setSenhaAtual(e.target.value)}
                        className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder='Digite a senha atual'
                        required
                    />
                    <input
                        id="novaSenha"
                        type="password"
                        value={novaSenha}
                        onChange={e => setNovaSenha(e.target.value)}
                        className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder='Digite a nova senha'
                        required
                    />
                    <input
                        id="confirmarSenha"
                        type="password"
                        value={confirmarSenha}
                        onChange={e => setConfirmarSenha(e.target.value)}
                        className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder='Confirme a senha'
                        required
                    />
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded mt-3 cursor-pointer"
                    >
                        Alterar Senha
                    </button>
                </form>
            </div>
        </div>
    )
}