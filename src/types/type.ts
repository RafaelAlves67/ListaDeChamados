export type TipoId = number | string;

export interface IChamados {
    id: TipoId
    name: string;
    desc: string;
    tipo: string;
    gravidade: string;
};

export interface IError {
  name: string;
  desc: string;
  tipo: string;
  gravidade: string;

}

type Error = {
  [key: string]: string
}



export const validate = (data: IError):Error => {

  const Erros:Error = {};

    if(!data.name){
        Erros['name'] = 'Preencha o campo de usuário.'
    }

    if(!data.desc){
      Erros['desc'] = 'Preencha a descrição do chamado.'
  }

  if(!data.tipo){
    Erros['tipo'] = 'Preencha o tipo do chamado.'
  }


  return Erros
    
}