import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import './styles.css';
import Notify from '../../alerts/toast';
import Modal from 'react-modal';
const notify = new Notify();

Modal.setAppElement('#root')
export default function Dashboard({ history }){
    const [students, setStudents] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    useEffect(() => {
        async function loadStudents() {
            const token = localStorage.getItem('token');
            
            const response = await api.get('/students/list',{
                headers: { authorization: token }
            }).catch(function(error) {
                if(error) return error.response;
            });
            if(response.status === 403) {
                notify.error(response.data.error)
                
                return history.push('/');
            }
            if(response.status === 204) {
                response.data = {
                    ra: "",
                    nome: "",
                    cpf: ""
                }
                return notify.warn('Nenhum usuário cadastrado')
            }
            setStudents(response.data);
        }
        
        loadStudents();

    }, [history]);

    async function handleDelete (ra) {

        const token = localStorage.getItem('token');

        const response = await api.post(`/students/delete/${ra}`, {}, {
            headers: { authorization: token }
        }).catch(function(error){
            if(error) return error.response;
        });
        if(response.status !== 200) return notify.error(response.data.error);
        await notify.success(response.data.message);
        history.go(0); 
        
    }
    function handleLogOut(){
        const token = localStorage.getItem('token');
        if(token) {
            localStorage.removeItem('token');
            notify.success("Logout Com sucesso");
            return history.push('/');
        }
    }

    return (

        <div className="contentDashboard">
            <div className="optLogout">
                <button className="logout" onClick={() => handleLogOut()}>Logout</button>
            </div>
            <div className="opt">
                <Link to='/new'><button className="btnRegister">Cadastrar</button></Link>
            </div>
            <table className="students-table">
                <tbody>
                <tr>
                    <th>RA</th>
                    <th>Nome</th>
                    <th>CPF</th>
                    <th>Ações</th>
                </tr>
                {students.map(student => (
                    <tr key={student.ra}>
                        <td>{student.ra}</td>
                        <td>{student.nome}</td>
                        <td>{student.cpf}</td>
                        <td>
                            <button className="actions"><Link className="actionsLink" style={{ textDecoration: 'none' }} to={`/student/${student.ra}`}>[Editar]</Link></button>
                            <button className="actions" onClick={() => setModalIsOpen(true)}>[Excluir]</button>
                            <Modal 
                                isOpen={modalIsOpen} 
                                onRequestClose={() => setModalIsOpen(false)}
                                style={
                                   {overlay: {}, content: { top: '35%', left: '50%', right: 'auto', bottom: 'auto', marginRight: '-50%', width: '60%', transform: 'translate(-40%, -10%)'}}}
                                       >
                                <div className="modal">
                                    <h3>Excluir usuário</h3>
                                    <p>Você deseja excluir permanentemente o cadastro do aluno {student.nome} do sistema?</p>
                                    <button className="btnRegister" onClick={() => handleDelete(student.ra)}>Confirmar</button>
                                    <div className="divider"/>
                                    <button className="btnCancel" onClick={() => setModalIsOpen(false)}>Cancelar</button>
                                </div>
                            </Modal>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>    
        </div>
    )
}