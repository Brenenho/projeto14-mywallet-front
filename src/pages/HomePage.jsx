import styled from "styled-components";
import { BiExit } from "react-icons/bi";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const [transactions, setTransactions] = useState([]);
  const [user, setUser] = useState("");
  const [id, setId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    axios
      .get(`${import.meta.env.VITE_API_URL}/extrato`, config)
      .then((res) => {
        setTransactions(res.data.operacoes);
        console.log(res.data.operacoes);
        setUser(res.data.nome);
        setId(res.data.id);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function logout() {
    axios
      .delete(
        `${import.meta.env.VITE_API_URL}/logout/${localStorage.getItem("token")}`
      )
      .then((res) => {
        localStorage.clear();
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <HomeContainer>
      <Header>
        <h1>{`Olá, ${user}!`}</h1>
        <BiExit onClick={logout} cursor={"pointer"} />
      </Header>

      <TransactionsContainer>
        <ul>
          {transactions.map((transaction) => {
            return (
              <ListItemContainer>
                <div>
                  <span>{transaction.data}</span>
                  <strong>{transaction.descricao}</strong>
                </div>
                <Value color={transaction.tipo}>
                  {transaction.valor.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </Value>
              </ListItemContainer>
            );
          })}
        </ul>

        <article>
          <strong>Saldo</strong>
          <Value
            color={
              transactions.reduce((acc, curr) => {
                if (curr.tipo === "positivo") {
                  return acc + curr.valor;
                } else {
                  return acc - curr.valor;
                }
              }, 0) > 0
                ? "positivo"
                : "negativo"
            }
          >
            {transactions
              .reduce((acc, curr) => {
                if (curr.tipo === "positivo") {
                  return acc + curr.valor;
                } else {
                  return acc - curr.valor;
                }
              }, 0)
              .toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
          </Value>
        </article>
      </TransactionsContainer>

      <ButtonsContainer>
        <button onClick={() => navigate("/nova-transacao/positivo")}>
          <AiOutlinePlusCircle />

          <p>
            Nova <br /> entrada
          </p>
        </button>

        <button onClick={() => navigate("/nova-transacao/negativo")}>
          <AiOutlineMinusCircle />
          <p>
            Nova <br />
            saída
          </p>
        </button>
      </ButtonsContainer>
    </HomeContainer>
  );
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
`;
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px 5px 2px;
  margin-bottom: 15px;
  font-size: 26px;
  color: white;
`;
const TransactionsContainer = styled.article`
  flex-grow: 1;
  background-color: #fff;
  color: #000;
  border-radius: 5px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  article {
    display: flex;
    justify-content: space-between;
    strong {
      font-weight: 700;
      text-transform: uppercase;
    }
  }
`;
const ButtonsContainer = styled.section`
  margin-top: 15px;
  margin-bottom: 0;
  display: flex;
  gap: 15px;

  button {
    width: 50%;
    height: 115px;
    font-size: 22px;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    p {
      font-size: 18px;
    }
  }
`;
const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === "positivo" ? "#03AC00" : "#C70000")};
`;
const ListItemContainer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  color: #000000;
  margin-right: 10px;
  div span {
    color: #c6c6c6;
    margin-right: 10px;
  }
`;
