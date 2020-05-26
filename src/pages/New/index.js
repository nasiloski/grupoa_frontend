import React, { useState } from 'react';
import './styles.css';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import Notify from '../../alerts/toast'
const notify = new Notify();

export default function Student({ history }){

    const [ra, setRa] = useState();
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [cpf, setCpf] = useState();

    const token = localStorage.getItem('token');

    async function handleSubmit(event){
        event.preventDefault();

        if(!ra || ra.length === 0) return notify.warn('O campo RA não pode ser vazio');
        if(!name || name.length === 0) return notify.warn('O campo nome não pode ser vazio');
        if(!email || email.length === 0) return notify.warn('O campo email não pode ser vazio')
        if(!cpf || cpf.length < 11) return notify.warn('O campo CPF deve possuir pelo menos 11 caracteres.');

        const data = {
            name,
            email,
            cpf,
            ra
        }
        
        const response = await api.post(`/students/create/`, data, {
            headers: { authorization: token }        
        }).catch(function(error){
            if(error) return error.response;
        });
        if(response.status !== 200) return notify.error(response.data.error);
        notify.success(response.data.message)
    
        history.push('/dashboard');
        
    }

    return (
        <div className="contentStudent">
            <form onSubmit={handleSubmit}>
                <label>RA:</label>
                <input 
                    placeholder="Insira o RA com 6 dígitos"
                    pattern="^\d{6}$"
                    type="ra"
                    id="ra"
                    onChange={event => setRa(event.target.value)}
                />
                <label>Nome:</label>
                <input 
                    placeholder="Insira o nome do aluno" 
                    type="name"
                    id="name"
                    onChange={event => setName(event.target.value)}
                />
                <label>E-mail</label>
                <input 
                    placeholder="exemplo@exemplo.com"
                    pattern='(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))'
                    type="email"
                    id="email"
                    onChange={event => setEmail(event.target.value)}
                />
                <label>CPF:</label>
                <input 
                    placeholder="000000000-00" 
                    pattern="([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})"
                    type="cpf"
                    id="cpf"
                    onChange={event => setCpf(event.target.value)}
                />

                <div className="botoes">
                    <Link to="/dashboard"><button type="submit" className="btnCancel">Cancelar</button></Link>
                    <div className="divider"/>
                    <button type="submit" className="btnStudent">Salvar</button>
                </div>
            </form>

        </div>
    )
}