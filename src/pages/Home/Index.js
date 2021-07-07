import React, { useEffect,useState } from 'react';
import moment from  'moment';

import {BotaoAcao, Container, ConteudoTitulo, Titulo, ButtomSuccess, ConteudoAnteriorProximo, ButtomPrimary, Table, TextDanger, TextSuccess, TextWarning, AlertDanger, AlertSuccess  } from '../../styles/custom_adm';

import api from '../../config/configApi';

export const Home = () =>{

    const [ data, setData ]= useState([]);
    const [saldo, setSaldo] = useState("");
    const [valorPago, setValorPago] = useState("");
    const [valorRecebido, setValorRecebido] = useState("");

    const [status, setStatus ] = useState({
        type: ' ', 
        mensagem: ' '
    })

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
           ano = dataView.ano -1;
           mes = 12;
           setDataView({
               ano,
               mes
           })
           listarExtrato(mes, ano);
       }else{
           ano = dataView.ano;
           mes = dataView.mes -1;
        setDataView({
            ano,
            mes
        })
        listarExtrato(mes, ano);
       }
    }

    const listarExtrato = async (mes, ano)=>{

        if((mes === undefined) && ( ano === undefined)){
            let dataAtual = new Date();
            ano = dataAtual.getFullYear();
            mes = dataAtual.getMonth() + 1;
        }

        await api.get(`/listar/${mes}/${ano}`)
            .then((response)=>{
                console.log(response)
                setData(response.data.lancamentos);
                setSaldo(response.data.saldo);
                setValorPago(response.data.valorPagamento)
                setValorRecebido(response.data.valorReceitas)
            }).catch((err)=>{
                if(err.response){
                    setStatus({
                        type: 'erro',
                        mensagem: err.response.data.mensagem
                    })
                }else{
                    setStatus({
                        type: 'erro',
                        mensagem: 'Erro: Tente mais tarde!'
                    })
                }
                console.log(err.response)
            });
    }

    //verifica as chamadas para esta função
    useEffect(()=>{
        listarExtrato();
    }, []);

    const proximo = async ()=>{
        if(dataView.mes === 12 ){
            ano = dataView.ano + 1;
            mes = 1;
            setDataView({
                ano,
                mes
            })
            listarExtrato(mes, ano);
        }else{
            ano =  dataView.ano;
            mes = dataView.mes + 1;
            setDataView({
                ano,
                mes
            })
            listarExtrato(mes, ano);
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
            {status.type === 'erro'? <AlertDanger> {status.mensagem} </AlertDanger> : ' '}
            {status.type === 'success'? <AlertSuccess> {status.mensagem} </AlertSuccess> : ' '}
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
                        <th>Data</th>
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
                            <td>   {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(item.valor)}</td>
                            <td>{moment(item.dataPagamento).format('DD/MM/YYYY')}</td>
                            <td>{item.tipo === 1 ? <TextDanger>Despesa</TextDanger> : <TextSuccess >Receita</TextSuccess >}</td>
                            <td>
                                {item.situacao === 1 ?  <TextSuccess >Pagamento realizado </TextSuccess > : " "}
                                {item.situacao === 2 ?  <TextDanger> Pagamento pendente </TextDanger> : " "}
                                {item.situacao === 3 ?  <TextWarning> Pagamento pendente </TextWarning> : " "}
                            </td>
                        </tr>
                        )
                    })}
                </tbody>
                <tfoot>
                    <tr>
                        <td> Saldo</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>
                            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(saldo)}
                        </td>
                    </tr>
                    <tr>
                        <td> Valor Pago</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(valorPago)}
                        </td>
                    </tr>
                    <tr>
                        <td> Valor Recebido</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(valorRecebido)}
                        </td>
                    </tr>
                </tfoot>
            </Table>
            </Container>
    );
};


