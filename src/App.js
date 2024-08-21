import React, { useState, useEffect } from "react";
import "./App.css";
import icon from "./icon.png";
import github from "./github.png";

export default function App() {
  const [numeroAtual, setNumeroAtual] = useState(null);
  const [numeroAnterior, setNumeroAnterior] = useState(null);
  const [pontos, setPontos] = useState(0);
  const [tempoRestante, setTempoRestante] = useState(300); //5 minutos.
  const [velocidade, setVelociadade] = useState(3000); // Velociadade Inicial.
  const [iniciar, setIniciar] = useState(false);
  const [sobre, setSobre] = useState(false);
  const [emoji, setEmoji] = useState(null);

  //Cronometro.
  useEffect(() => {
    if (!iniciar) return;
    const timer = setInterval(() => {
      setTempoRestante((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          alert(
            "Teste finalizado."
            // `Tempo esgotado! Sua pontuação é: ${score}`
          );
          setIniciar(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [iniciar]);

  // Geração de números.
  useEffect(() => {
    if (!iniciar) return;

    const intervalo = setInterval(() => {
      const numeroGerado = gerarNumeroAleatorio();
      setNumeroAnterior(numeroAtual);
      setNumeroAtual(numeroGerado);
      falarNumero(numeroGerado);
    }, velocidade);

    return () => clearInterval(intervalo);
  }, [iniciar, numeroAtual, velocidade]);

  const somarClick = (value) => {
    if (value === numeroAtual + numeroAnterior) {
      setPontos(pontos + 1);
      setVelociadade((prev) => Math.max(3000, prev - 100)); //Incrementar velocidade.
      setEmoji("Correto 😄");
    } else {
      setVelociadade((prev) => Math.min(4000, prev + 100)); //Desacelerar teste.
      setEmoji("Errado 😨");
    }
    setTimeout(() => setEmoji(""), 1000);
  };

  const gerarNumeroAleatorio = () => {
    return Math.floor(Math.random() * 9) + 1;
  };

  //Falar numeros pelo Voice Synth.
  const falarNumero = (number) => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(number);
    utterance.lang = "pt-BR"; //Linguagem.
    synth.speak(utterance);
  };

  const iniciarTeste = () => {
    setIniciar(true);
    setVelociadade(3000);
    setTempoRestante(300);
    setPontos(0);
    setNumeroAtual(null);
    setNumeroAnterior(null);
  };

  return (
    <div className="App">
      <div className="header">
        {/* <img src={icon} className="icon" /> */}
        <h1 className="title">
          Teste Pasat - Paced Auditory Serial Addition Task
        </h1>
      </div>
      {iniciar === true ? (
        <div className="container">
          <p className="timer">Tempo restante: {tempoRestante} segundos</p>
          <div className="scoreBox">
            <p className="scoreTitle">Pontuação: </p>
            <p className="score">{pontos}</p>
          </div>
          <p className="emoji">{emoji}</p>
          <div className="button-grid">
            <div className="p1">
              <button onClick={() => somarClick(1)} className="button">
                1
              </button>
              <button onClick={() => somarClick(2)} className="button">
                2
              </button>
            </div>
            <div>
              <button onClick={() => somarClick(3)} className="button">
                3
              </button>
              <button onClick={() => somarClick(4)} className="button">
                4
              </button>
              <button onClick={() => somarClick(5)} className="button">
                5
              </button>
              <button onClick={() => somarClick(6)} className="button">
                6
              </button>
            </div>
            <div>
              <button onClick={() => somarClick(7)} className="button">
                7
              </button>
              <button onClick={() => somarClick(8)} className="button">
                8
              </button>
              <button onClick={() => somarClick(9)} className="button">
                9
              </button>
              <button onClick={() => somarClick(10)} className="button">
                10
              </button>
              <button onClick={() => somarClick(11)} className="button">
                11
              </button>
              <button onClick={() => somarClick(12)} className="button">
                12
              </button>
            </div>
            <div>
              <button onClick={() => somarClick(13)} className="button">
                13
              </button>
              <button onClick={() => somarClick(14)} className="button">
                14
              </button>
              <button onClick={() => somarClick(15)} className="button">
                15
              </button>
              <button onClick={() => somarClick(16)} className="button">
                16
              </button>
            </div>
            <div>
              <button onClick={() => somarClick(17)} className="button">
                17
              </button>
              <button onClick={() => somarClick(18)} className="button">
                18
              </button>
            </div>
          </div>
          <p className="numbers">
            Número atual: <b>{numeroAtual}</b> Número anterior:{" "}
            <b>{numeroAnterior}</b>
          </p>
        </div>
      ) : (
        <div className="container">
          <button className="iniciar" onClick={iniciarTeste}>
            Iniciar Teste
          </button>
        </div>
      )}
      <div className="info">
        <div className="center">
          <button className="sobre" onClick={() => setSobre(true)}>
            Sobre o Teste
          </button>
        </div>
        {sobre === true ? (
          <>
            <p>
              Este aplicativo React é uma implementação do PASAT (Paced Auditory
              Serial Addition Task), um teste utilizado para medir a capacidade
              de processamento cognitivo sob pressão.
            </p>
            <h3>Duração do Teste</h3>
            <p>
              Ao clicar no botão "Iniciar Teste", o cronômetro começa a contagem
              regressiva de 5 minutos (300 segundos).
            </p>
            <p>A velocidade inicial de geração de números é de 2 segundos.</p>
            <h3>Geração e Exibição de Números</h3>
            <p>
              A cada intervalo de tempo (definido pela velocidade), um número
              aleatório entre 1 e 9 é gerado e anunciado utilizando o
              sintetizador de voz do navegador.
            </p>
            <h3>Interação do Usuário</h3>
            <p>
              O usuário deve clicar no botão que representa a soma do número
              atual e do número anterior.
            </p>
            <p>Se a soma estiver correta, a pontuação é incrementada em 1.</p>
            <h3>Finalização</h3>
            <p>
              Ao término do tempo, o teste para automaticamente e o botão
              "Iniciar Teste" reaparece para permitir uma nova tentativa.
            </p>
          </>
        ) : (
          <></>
        )}
      </div>
      <div className="footer">
        <div className="footerBox">
          <p>
            Desenvolvido para fins de pesquisa científica aplicada ao trabalho:
          </p>
          <a
            href="https://periodicos.unievangelica.edu.br/index.php/educacaoemsaude/article/view/7485"
            target="_blank"
          >
            <h3>
              O efeito do estresse agudo sobre os parâmetros cardiovasculares em
              estudantes universitários
            </h3>
          </a>
        </div>
        <div className="footerBox">
          <h3>Alunos:</h3>
          <p>Giovana Vaz</p>
          <p>Maria Eduarda Santos</p>
          <p>João Vitor Mendes</p>
          <p>Marcos Barbosa</p>
          <p>Leonardo de Paula</p>
          <p>Viviane Soares</p>
        </div>
        <div className="footerBox">
          <h3>Desenvolvido por:</h3>
          <p>
            <b>Matheus N. Saito</b> | Curso de Engenharia de Sotware, UniEvangélica
          </p>
          <p>Orientado por Profa. Me. <b>Natasha Sophie Pereira</b></p>
          <div className="gitButton">
            <a href="https://github.com/Mr-S41to/pasat" target="_blank">
              <img className="github" src={github} alt="Github" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
