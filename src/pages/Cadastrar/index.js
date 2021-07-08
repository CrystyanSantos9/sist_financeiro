import React, { useState } from 'react';

import api from '../../config/configApi';

export const Cadastrar = () => {

    const [lancamento, setLancamento ] = useState({
        nome: '',
        valor:'',
        tipo:'',
        situacao:'',
        dataPagamento:'',
    })

    const [status, setStatus ] = useState({
        type: '',
        mensagem: ''
    });

    const [ valorLancTarget, setvalorLancTarget ] = useState('');

    const valorInput = async e=> setLancamento({...lancamento , [ e.target.name ]: e.target.value });

    const valorLancamento = async e =>{
        var valorLancamentoInput = e.target.value; 
        console.log(valorLancamentoInput);

        //só aceita digitos - números 
        valorLancamentoInput = valorLancamentoInput.replace(/\D/g, "");
        //para pegar o valor antes da casa decimal = $1
        //para pegar o valor após a casa decimal = $2
        //incluir a virgula $1,$2
        valorLancamentoInput = valorLancamentoInput.replace(/(\d)(\d{2})$/, "$1,$2");
        //Para cada 3 números consecutivos = milhar seguidos de mais número D
        //separá-los B com um ponto "."
        valorLancamentoInput = valorLancamentoInput.replace(/(?=(\d{3})+(\D))\B/g, ".");

        console.log(valorLancamentoInput);
        setvalorLancTarget(valorLancamentoInput);

        var valorSalvar = await valorLancamentoInput.replace(".", "");
        valorSalvar = await valorSalvar.replace(",", ".")
        setLancamento({...lancamento, valor: valorSalvar});

    }

    const cadLancamento = async e=>{
        e.preventDefault();
        console.log(lancamento)
      const  headers = {
          'Content-Type': 'application/json'
      }
        await api.post("/cadastrar", lancamento, {headers})
        .then((response)=>{
            console.log(response)
            setStatus({
                type: 'success', 
                mensagem: response.data.mensagem
            })
        }).catch((err)=>{
            console.log(err.response)
            //se existir err.response é pq a api respondeu
            if(err.response){
                setStatus({
                    type: 'error', 
                    mensagem: err.response.data.mensagem
                });
            }else{
                //Api não respondeu, reposta estática
                setStatus({
                    type: 'success', 
                    mensagem: 'Erro: Tente mais tarde'
                });
            }
        })
    }

    return(
        <div>
            <h1>Cadastrar</h1>
            { status.type === 'error' ? <p> {status.mensagem} </p>: " " }
            { status.type === 'success' ? <p> {status.mensagem} </p>: " " }
            <form onSubmit={ cadLancamento}>
                <label> Nome: </label>
                <input type="text" name="nome" placeholder="Nome do lançamento" onChange={valorInput} /><br /><br />
                <label> Valor: </label>
                <input type="text" name="valor" placeholder="Valor do lançamento" value={valorLancTarget} onChange={valorLancamento} /><br /><br />
                <label> Tipo: </label>
                    <select name="tipo"  onChange={valorInput}>
                        <option value="">Selecione</option>
                        <option value="1">Pagamento</option>
                        <option value="2">Recebido</option>
                    </select><br /><br />
                <label> Situação: </label>
                    <select name="situacao"  onChange={valorInput}>
                        <option value="">Selecione</option>
                        <option value="1">Pago</option>
                        <option value="2">Pendente</option>
                        <option value="3">Recebido</option>
                    </select><br /><br />

                <label> Data do pagamento: </label>
                <input type="date" name="dataPagamento"  onChange={valorInput} /><br /><br />

                <button type="submit">Cadastrar</button>
            </form>
        </div>
    )
}