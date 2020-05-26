import React, { useState } from 'react';
import api from '../../services/api';
import Notify from '../../alerts/toast'
const notify = new Notify();

export default function Login ({ history }) {
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const token = localStorage.getItem('token');

    if(token) history.push('/dashboard');

    async function handleSubmit(event){
        event.preventDefault();
        const response = await api.post('/login', {
        username,
        password
        }).catch(function(error){
        if(error.response) return error.response;  
        });
        if(response.status !== 200) return notify.error(response.data.error); //INSERIR ALERTA DE SENHA ERRADO E RETORNAR PARA INICIAL 
        const { token } = response.data;
        localStorage.setItem('token', token);
        history.push('/dashboard');
    };

    return (
        <div className="contentLogin">
            <p>
                Bem vindo ao portal de gerenciamento dos alunos da instituição
            </p>
            <form onSubmit={handleSubmit}>
                <label htmlFor="login">Login:</label>
                <input 
                    type="login" 
                    id="login" 
                    placeholder="Seu login" 
                    value={username}
                    onChange={event => setUsername(event.target.value)}
                />
                <label htmlFor="password">Senha:</label>
                <input 
                    type="password" 
                    id="password" 
                    placeholder="Sua senha"
                    value={password}
                    onChange={event => setPassword(event.target.value)}
                />
                <button type="submit" className="btn">Acessar</button>
            </form>
        </div>
      )
}