import { useEffect, useState, createContext } from 'react';
import styles from './Chamados.module.css';
import { IChamados } from '../types/type';
import Modal from '../components/Modal';
import { useNavigate } from 'react-router-dom';


type Props = {

}

const Chamados = ({ }: Props) => {
    const [chamado, setChamados] = useState<IChamados[]>([]);
    const [id, setId] = useState<string | number>("");
    const [name, setName] = useState<string>("");
    const [gravidade, setGravidade] = useState<string>("");
    const [desc, setDesc] = useState<string>("");
    const [tipo, setTipo] = useState<string>("");
    const [renderDesc, setRenderDesc] = useState<boolean>(false)
    const [modal, setModal] = useState<boolean>(false)
    const [notFound, setNotFound] = useState<boolean>(false)

    const [search, setSearch] = useState<string>("");
    const Navigate = useNavigate();

    // Context API
    

    useEffect(() => {
        const getChamados = async () => {
            try {
                const res = await fetch('http://localhost:3000/chamados');
                const data = await res.json();
                setChamados(data);
            } catch (error) {
                console.log("Erro: " + error);
            }
        };
        getChamados();
    }, []);

    useEffect(() => {
        console.log(chamado)
    },[chamado])

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
                    setChamados((prevChamados) => prevChamados.filter((chamados) => {return chamados.id !== id}))
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

        const handleSearch = () => {
            chamado.map((chamados) => {
                if(chamados.name === search){
                    Navigate(`/chamados/name=${search}`)
                }else{
                    Navigate("/NotFound-404")
                }
        })
        }



    return (
        <div className={styles.container}>
            <div className={styles.divContainer}>
            <div className={styles.div_pesquisa}>
                <input type="text" placeholder='Filtrar chamado' onChange={(e) => setSearch(e.target.value)}/>
                <button onClick={handleSearch}><i className="bi bi-search"></i></button>
            </div>

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
                    {chamado.length > 0 && chamado.map((chamados:IChamados) => (
                        <tbody key={chamados.id} className={styles.tbody}>
                            <tr>
                                <td>#{chamados.id}</td>
                                <td>{chamados.name}</td>
                                <td>{chamados.tipo}</td>
                                <td>{chamados.gravidade}</td>
                                <td><button className="btn btn-info desc" onClick={() => handleDesc(chamados.desc)}>Ver</button></td>
                                <td className={styles.buttons}>
                                    <button id={styles.remove} onClick={() => removeChamado(chamados.id)} className="btn btn-danger"><i className="bi bi-x-circle"></i></button>
                                    <button id={styles.update} onClick={() => alteraChamado(chamados.id, chamados.name, chamados.tipo, chamados.gravidade, chamados.desc)}className="btn btn-warning"><i className="bi bi-pencil-square"></i></button>
                                </td>
                            </tr>
                        </tbody>
                    ))}
                </table>

               {renderDesc && <div className={styles.descChamado}>
                    <h4>Descrição do chamado: </h4>
                    <div className={styles.campoDesc}>
                        <p>{desc}</p>

                    <div className={styles.divButton}>
                        <button type="button" onClick={closeDesc} className="btn btn-danger">Cancelar</button>
                    </div>
                </div>
            </div>}

            {modal && <Modal SetChamados={setChamados} SetModal={setModal} name={name} setName={setName} setTipo={setTipo} tipo={tipo} setDesc={setDesc} desc={desc} setGravidade={setGravidade} gravidade={gravidade} id={id}/>}
            
            </div>
        </div>

    );
}

export default Chamados;




