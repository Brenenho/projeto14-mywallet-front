import axios from "axios"
import { useEffect } from "react"
import styled from "styled-components"
import { useParams } from "react-router-dom"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function TransactionsPage() {

  if (!localStorage.getItem("token")) {
    navigate("/")
    return
  }


  const navigate = useNavigate()
  const parametros = useParams()
  console.log(parametros)
  const [valor, setValor] = useState("")
  const [descricao, setDescricao] = useState("")

function criarTransacao(event) {
  event.preventDefault()
  const body = {
    valor,
    descricao
  }
  axios.post(`${import.meta.env.VITE_API_URL}/nova-transacao/${parametros.tipo}`, body, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  }).then((res) => {
    navigate("/home")
    console.log(res)
  }).catch((err) => {
    console.log(err)
  })
}


  return (
    <TransactionsContainer>
      <h1>Nova TRANSAÇÃO</h1>
      <form onSubmit={criarTransacao}>
        <input placeholder="Valor" type="number"

          value={valor} onChange={(e) => setValor(e.target.value)}
        />
        <input placeholder="Descrição" type="text" 
        
        value={descricao} onChange={(e) => setDescricao(e.target.value)}

        />
        <button onClick={() => {}}>Salvar TRANSAÇÃO</button>
      </form>
    </TransactionsContainer>
  )
}

const TransactionsContainer = styled.main`
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  h1 {
    align-self: flex-start;
    margin-bottom: 40px;
  }
`
