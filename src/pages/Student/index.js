import React, { useState, useEffect } from 'react';
import './styles.css';
import { Link, useParams } from 'react-router-dom';
import api from '../../services/api';
import Notify from '../../alerts/toast'
const notify = new Notify();

export default function Student({ history }){
    const [student, setStudent] = useState([]);
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [cpf, setCpf] = useState();

    const { ra_id } = useParams();
    const token = localStorage.getItem('token');
   
    useEffect(() => {
        async function loadStudent(){
            const token = localStorage.getItem('token');
            const response = await api.get(`/students/${ra_id}`,{
                headers: { authorization: token }
            }).catch(function(error){
                if(error) return error.response;
            });
            if(response.status !== 200){
                notify.error(response.data.error);
                return history.push('/')
            }
            setStudent(response.data);
        }
        loadStudent();

    }, [history, ra_id])

    async function handleSubmit(event){
        event.preventDefault();
        let std_name = name;
        let std_email = email;
        let std_cpf = cpf;
        if(!std_name) std_name = student.nome;
        if(!std_email) std_email = student.email;
        if(!std_cpf) std_cpf = student.cpf;

        if(std_cpf.length < 11){
            return notify.warn('O campo CPF deve possuir pelo menos 11 caracteres.')
        }

        const data = {
            name: std_name,
            email: std_email,
            cpf: std_cpf,
            ra: ra_id
        }
        
        const response = await api.post(`/students/update/`, data, {
            headers: { authorization: token }        
        }).catch(function(error){
            if(error) return error.response;
        });
        if(response.status !== 200) return notify.error(response.data.error);
        notify.success(response.data.message)
        console.log(data)
        history.push('/dashboard');
        
    }

    return (
        <div className="contentStudent">
            <form onSubmit={handleSubmit}>
                <label>RA:</label>
                <input 
                    placeholder={student.ra} 
                    type="ra"
                    id="ra"
                    defaultValue={student.ra}
                    disabled
                />
                <label>Nome:</label>
                <input 
                    placeholder={student.nome} 
                    type="name"
                    id="name"
                    defaultValue={name}
                    onChange={event => setName(event.target.value)}
                />
                <label>Email</label>
                <input 
                    placeholder={student.email}
                    pattern='(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))'
                    type="email"
                    id="email"
                    defaultValue={email}
                    onChange={event => setEmail(event.target.value)}
                />
                <label>CPF:</label>
                <input 
                    placeholder={student.cpf} 
                    pattern="([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})"
                    type="cpf"
                    id="cpf"
                    defaultValue={cpf}
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