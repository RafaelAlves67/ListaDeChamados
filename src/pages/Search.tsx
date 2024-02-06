import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getData } from '../Hooks/useFetch';
import { IChamados } from '../types/type';
import styles from '../pages/Search.module.css'
import Modal from '../components/Modal';

const Search = () => {
    const [chamados, setChamados] = useState<IChamados[]>([]);
    const { name } = useParams<string>();
    const [newName, setName] = useState("")
    const [newChamados, setNewChamados] = useState<IChamados[]>([])


    const [renderDesc, setRenderDesc] = useState<boolean>(false)
    const [modal, setModal] = useState<boolean>(false)
    
    // Chamados
    const [id, setId] = useState<string | number>("");
    const [gravidade, setGravidade] = useState<string>("");
    const [desc, setDesc] = useState<string>("");
    const [tipo, setTipo] = useState<string>("");

    const handleDesc = async (desc: string) => {
        setRenderDesc(true);
        setDesc(desc)
    };

    

    const closeDesc = (): void => {
        setRenderDesc(false)
    };

        const removeChamado = async (id: string | number) => {

            const res = await fetch(`http://localhost:3000/chamados/${id}`,
                {
                    method: "DELETE",
                    headers: {"content-type": "aplication/json"}
                }
            )

            try{
                if(res.ok){
                    setNewChamados((prevChamados) => prevChamados.filter((chamados) => {return chamados.id !== id}))
                }
            }catch(error){
                console.log("O erro é: " + error)
            }
        }

        const alteraChamado = (id:number | string, name:string, tipo:string, gravidade:string, desc:string ) => {
            
            setName(name)
            setId(id)
            setTipo(tipo)
            setDesc(desc)
            setGravidade(gravidade)
            setModal(true)
            console.log(name,id,tipo,desc,gravidade)
        }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getData(); // Chama a função para buscar os dados
                setChamados(data); // Define o estado chamados com os dados obtidos
                console.log(name)
                const nameClear = name?.split('=')[1]; // Extrai apenas o valor 'Matheus' de 'name=Matheus'
                console.log(nameClear)
                const filteredChamados = chamados.filter(chamado => chamado.name === nameClear);
                setNewChamados(filteredChamados);
                
                
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            }
        };

        fetchData(); 
    }, []); 

    console.log(newChamados)

    return (
        <div className={styles.container}>

        <h1>Resultados encontrados: </h1>

        <table className={styles.table}>
        <thead className={styles.thead}>
            <tr>
                <th>Id</th>
                <th>Nome do usuário</th>
                <th>Tipo do chamado</th>
                <th>Gravidade</th>
                <th>Descrição</th>
            </tr>
        </thead>
        {newChamados.length > 0 && newChamados.map((chamado) => (
            <tbody key={chamado.id} className={styles.tbody}>
                <tr>
                    <td>#{chamado.id}</td>
                    <td>{chamado.name}</td>
                    <td>{chamado.tipo}</td>
                    <td>{chamado.gravidade}</td>
                    <td><button className="btn btn-info desc" onClick={() => handleDesc(chamado.desc)}>Ver</button></td>
                    <td className={styles.buttons}>
                        <button id={styles.remove} onClick={() => removeChamado(chamado.id)} className="btn btn-danger"><i className="bi bi-x-circle"></i></button>
                        <button id={styles.update} onClick={() => alteraChamado(chamado.id, chamado.name, chamado.tipo, chamado.gravidade, chamado.desc)}className="btn btn-warning"><i className="bi bi-pencil-square"></i></button>
                    </td>
                </tr>
            </tbody>
        ))}
    </table>

    {/* {renderDesc && <div className={styles.descChamado}>
                    <h4>Descrição do chamado: </h4>
                    <div className={styles.campoDesc}>
                        <p>{desc}</p>

                    <div className={styles.divButton}>
                        <button type="button" onClick={closeDesc} className="btn btn-danger">Cancelar</button>
                    </div>
                </div>
            </div>}

            {modal && <Modal SetChamados={setChamados} SetModal={setModal} name={newName} setName={setName} setTipo={setTipo} tipo={tipo} setDesc={setDesc} desc={desc} setGravidade={setGravidade} gravidade={gravidade} id={id}/>} */}
            
    </div>
    )
};

export default Search;
