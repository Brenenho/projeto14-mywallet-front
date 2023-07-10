import styled from "styled-components"
import { Link } from "react-router-dom"
import MyWalletLogo from "../components/MyWalletLogo"
import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function SignInPage() {

  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [loading, setLoading] = useState(false)


  function signIn(e) {
    e.preventDefault()

    if (email.length == 0) {
      alert("O email não pode estar em branco")
      return
    }

    if (senha.length == 0) {
      alert("A senha não pode estar em branco")
      return
    }

    axios.post(`${import.meta.env.VITE_API_URL}/login`, {
      email, senha
    }).then((res) => {
      localStorage.setItem("token", res.data.token)
      navigate("/home")
      console.log(res)
    }).catch((err) => {

      if (err.response.status === 404) {
        alert("Email não cadastrado")
      }
      
      if (err.response.status === 401) {
        alert("Senha incorreta")
      }

      if (err.response.status === 422) {
        alert("Dados inválidos")
      }
      console.log(err)
    })
  }

  return (
    <SingInContainer>
      <form onSubmit={signIn}>
        <MyWalletLogo />
        <input placeholder="E-mail" type="email" 
         value={email} onChange={(e) => setEmail(e.target.value)}
        />
        <input placeholder="Senha" type="password" autocomplete="new-password"
        value={senha} 
        onChange={(e) => setSenha(e.target.value)} />
        <button>Entrar</button>
      </form>

      <Link to="/cadastro">
        Primeira vez? Cadastre-se!
      </Link>
    </SingInContainer>
  )
}

const SingInContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
