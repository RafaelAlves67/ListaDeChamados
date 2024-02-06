import React, { useState } from 'react';
import styles from "./Home.module.css";
import { IChamados, TipoId } from '../types/type';
import { validate } from '../types/type';
import { IError } from '../types/type';


const Home = () => {
  const [name, setName] = useState<string>("");
  const [gravidade, setGravidade] = useState<string>("Leve");
  const [desc, setDesc] = useState<string>("");
  const [tipo, setTipo] = useState<string>("")

  const [erro, setErro] = useState<IError | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setErro(null)

    const chamados: IError = {
      name,
      desc,
      tipo,
      gravidade
    };

    const validateErros = validate(chamados)

    console.log(validateErros, chamados)
    

    if(Object.keys(validateErros).length > 0){
      setErro(validateErros)
      return;
    }

    try {
       fetch('http://localhost:3000/chamados', {
        method: "POST",
        headers: {"content-type": "aplication/json"},
        body: JSON.stringify(chamados) 
        
      });

      setDesc("")
      setName("")
      setGravidade("")
      setTipo("")
    } catch (error) {
      console.error('Erro ao criar chamado:', error);
    }
  };

  return (
    <div>
      <h3 className='text-center mt-5'>Criar chamado</h3>
      <div>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.label_usuario}>
            <label>Nome do usuário: </label>
            <input type="text" placeholder='Informe seu nome' value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          {erro && <p id={styles.texto_erro} className='text-danger'>{erro.name}</p>}

          <div className={styles.label_chamado}>
            <label>Descreva o chamado: </label>
            <textarea className={styles.textarea} value={desc} onChange={(e) => setDesc(e.target.value)} />
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

          <button type="submit" className="btn btn-primary">Criar chamado</button>
        </form>
      </div>
    </div>
  );
};

export default Home;
