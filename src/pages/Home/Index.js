import React, { useEffect,useState } from 'react';

import {BotaoAcao, Container, ConteudoTitulo, Titulo, ButtomSuccess, ConteudoAnteriorProximo, ButtomPrimary, Table, TextDanger, TextSuccess  } from '../../styles/custom_adm';

export const Home = () =>{

    const [ data, setData ]= useState([]);

    let dataAtual = new Date();
    let ano = dataAtual.getFullYear();
    let mes = dataAtual.getMonth() + 1;
    // console.log(`Ano: ${ano} e mes ${mes}`)

    const [dataView, setDataView] = useState({
        ano, 
        mes
    })

    const anterior = async ()=>{
       if(dataView.mes === 1){
           setDataView({
               ano: dataView.ano -1, 
               mes: 12
           })
       }else{
        setDataView({
            ano: dataView.ano,
            mes: dataView.mes -1, 
        })
       }
    }

    const listarExtrato = async e=>{
        let  valores = [ 
            {
                "id": 3, 
                "nome": "Água", 
                "valor": 347,
                "tipo": 1 ,
                "situacao": 1
            },
            {
                "id": 2, 
                "nome": "Luz", 
                "valor": 189.77,
                "tipo": 1,
                "situacao": 1
            },
            {
                "id": 1, 
                "nome": "Salário", 
                "valor": 1500,
                "tipo": 2,
                "situacao": ""
            }
        ]
        setData(valores);
        console.log(data)
    }

    useEffect(()=>{
        listarExtrato();
    }, []);

    const proximo = async ()=>{
        if(dataView.mes === 12 ){
            setDataView({
                ano: dataView.ano + 1,
                mes: 1
            })
        }else{
            setDataView({
                ano: dataView.ano,
                mes: dataView.mes + 1
            })
        }
    }

    return(
        <Container>
            <ConteudoTitulo>
             <Titulo>Listar situação financeira</Titulo>
             <BotaoAcao>
                <ButtomSuccess >Cadastrar</ButtomSuccess >
             </BotaoAcao>
            </ConteudoTitulo>

            <ConteudoAnteriorProximo>
                <ButtomPrimary type="button" onClick={()=>anterior()}>Anterior</ButtomPrimary>
                <span>{`${dataView.mes}/${dataView.ano}`}</span>
                <ButtomPrimary type="button" onClick={()=>proximo()}>Próximo</ButtomPrimary>
            </ConteudoAnteriorProximo>
            
            <Table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nome</th>
                        <th>Valor</th>
                        <th>Tipo</th>
                        <th>Situação</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(item => {
                        return(
                            <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.nome}</td>
                            <td>{item.valor}</td>
                            <td>{item.tipo === 1 ? <TextDanger>Despesa</TextDanger> : <TextSuccess >Receita</TextSuccess >}</td>
                            <td>{item.situacao === 1 ? <span>Pagamento realizado</span> : <span>Pagamento pendente</span>}</td>
                        </tr>
                        )
                    })}
                </tbody>
                <tfoot>
                    <tr>
                        <td> Total</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>
                        581.17
                        </td>
                    </tr>
                </tfoot>
            </Table>
            </Container>
    );
};


