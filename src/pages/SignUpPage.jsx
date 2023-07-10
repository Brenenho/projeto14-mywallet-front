import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import MyWalletLogo from "../components/MyWalletLogo"
import { useState } from "react"
import axios from "axios"


export default function SignUpPage() {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirm] = useState("")
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()


  function signUp(e) {
    e.preventDefault()

    setLoading(true)

    if (password !== confirmPassword) {
      alert("As senhas não conferem")
      return
    }

    if (password.length < 3) {
      alert("A senha deve ter no mínimo 3 caracteres")
      return
    }
    

    axios.post(`${import.meta.env.VITE_API_URL}/cadastro` , {
      nome: name, email, senha: password
    }).then((res) => {
      alert("Cadastro realizado com sucesso!")
      setLoading(false)
      navigate("/")
    }).catch((err) => {
      if (err.response.status === 409) {
        alert("Email já cadastrado")
      }

      if (err.response.status === 422) {
        alert("Dados inválidos")
      }
      setLoading(false)


      console.log(err)
    }
      )}

  return (
    <SingUpContainer>
      <form onSubmit={signUp}>
        <MyWalletLogo />
        <input placeholder="Nome" type="text" required value={name} onChange={(e) => setName(e.target.value)}  />
        <input placeholder="E-mail" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        <input placeholder="Senha" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
        <input placeholder="Confirme a senha" type="password" 
        required value={confirmPassword} onChange={(e) => setConfirm(e.target.value)}
        />
        <button>Cadastrar</button>
      </form>

      <Link>
        Já tem uma conta? Entre agora!
      </Link>
    </SingUpContainer>
  )
}

const SingUpContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
