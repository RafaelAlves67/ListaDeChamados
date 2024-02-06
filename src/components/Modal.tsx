import React, { SetStateAction } from 'react'
import styles from './modal.module.css'
import { useState } from 'react'
import { IChamados } from '../types/type'

// ERROR 
import { validate } from '../types/type';
import { IError } from '../types/type';


type Props = {
    name: string;
    id: number | string;
    desc: string;
    tipo: string;
    gravidade: string;

    
    SetModal: React.Dispatch<React.SetStateAction<boolean>>;
    SetChamados: React.Dispatch<React.SetStateAction<IChamados[]>>;
    setName: React.Dispatch<React.SetStateAction<string>>;
    setDesc: React.Dispatch<React.SetStateAction<string>>;
    setGravidade: React.Dispatch<React.SetStateAction<string>>;
    setTipo: React.Dispatch<React.SetStateAction<string>>;
}

const Modal = ({name, id, desc, tipo, gravidade, setDesc, setName, setGravidade, setTipo, SetModal, SetChamados}: Props) => {

  const [erro, setErro] = useState<IError | null>(null)

  // função para cancelar o edit de chamado
    const handleClose = () => {
        SetModal(false)
    }

    // função para editar chamado e fazer requisição de PUT
    const handleEdit = async (e: React.FormEvent) => {
      e.preventDefault()

      const validateChamados: IError = {
        name,
        desc,
        tipo,
        gravidade
      };
    
      const validateErros: IError = validate(validateChamados)
    
        if(Object.keys(validateErros).length > 0){
          setErro(validateErros)
          return;
        }
    
      const newChamado = {id, name, desc, tipo, gravidade}

      try{
        const res = await fetch(`http://localhost:3000/chamados/${id}`,
        {method: "PUT",
         headers: {
          'Content-type': 'application/json',
         },
         body: JSON.stringify(newChamado)
        }
        )
        
        setErro(null)
        SetModal(false)
        if(res.ok){
          SetChamados((prevChamados) => prevChamados.map((chamados) => (
            chamados.id === id ? ({...prevChamados, id ,name, desc, tipo, gravidade}) : chamados
          )))
          console.log("REQUISIÇÃO FEITA COM SUCESSO")
        }else{
          console.log("REQUISIÇÃO FALHOU")
        }
      }catch(error){
        console.log("ERROR" + error)
      }  
    }

  return (
    <div>
         <form className={styles.form}>
          <div className={styles.label_usuario}>
            <label>Nome do usuário: </label>
            <input type="text" placeholder='Informe seu nome' value={name} onChange={(e) => setName(e.target.value)}/>
          </div>
          {erro && <p id={styles.texto_erro} className='text-danger'>{erro.name}</p>}

          <div className={styles.label_chamado}>
            <label>Descreva o chamado: </label>
            <textarea className={styles.textarea} value={desc} onChange={(e) => setDesc(e.target.value)}/>
          </div>
          {erro && <p id={styles.texto_erro}  className='text-danger'>{erro.desc}</p>}

          <div className={styles.label_gravidade}>
            <label className={styles.title_chamado}>Gravidade do chamado:</label>
            <select name="select" className="text-left" value={gravidade} onChange={(e) => setGravidade(e.target.value)}>
              <option value="Leve">Leve</option>
              <option value="Média">Média</option>
              <option value="Grave">Grave</option>
            </select>
            
            <label htmlFor="">Tipo do chamado:</label>
            <input type="text" name=""  placeholder='Informe o tipo' value={tipo} onChange={(e) => setTipo(e.target.value)}/>
            {erro && <p className='text-danger'>{erro.tipo}</p>}
          </div>
        
          <div className={styles.div_buttons}>
            <button className="btn btn-primary" onClick={handleEdit}>Alterar chamado</button>
            <button className='btn btn-danger' onClick={handleClose}>Cancelar</button>
          </div>

        </form>
      </div>
  )
}

export default Modal