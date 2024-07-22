import React, { useState, useEffect } from "react";

export default function Fase1() {
  const [numeroAtual, setNumeroAtual] = useState(null);
  const [numeroAnterior, setNumeroAnterior] = useState(null);
  const [pontos, setPontos] = useState(0);
  const [tempoRestante, setTempoRestante] = useState(600); // 10 minutos em segundos.
  const [velocidade, setVelocidade] = useState(3000); // Inicia em três segundos.

  useEffect(() => {
    const timer = setInterval(() => {
      setTempoRestante((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (tempoRestante <= 0) {
      alert(`Tempo esgotado! Sua pontuação é: ${pontos}`);
      setTempoRestante(600);
      setPontos(0);
    }
  }, [tempoRestante]);

  // Atualizar números automaticamente a cada intervalo de tempo.
  useEffect(() => {
    const intervalo = setInterval(() => {
      atualizarNumeros();
    }, velocidade);

    return () => clearInterval(intervalo);
  }, [numeroAtual, velocidade]);

  const atualizarNumeros = () => {
    const numeroNovo = gerarNumeroAleatorio();
    setNumeroAnterior(numeroAtual);
    setNumeroAtual(numeroNovo);
    falarNumeros(numeroNovo);
  };

  // Funções de apoio.
  const gerarNumeroAleatorio = () => {
    return Math.floor(Math.random() * 9) + 1;
  };

  const falarNumeros = (number) => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(number);
    utterance.lang = "pt-BR";
    synth.speak(utterance);
  };

  const somarClick = (value) => {
    if (numeroAnterior === null) {
      // Primeiro clique para iniciar teste.
      setNumeroAnterior(numeroAtual);
    } else {
      if (value === numeroAtual + numeroAnterior) {
        setPontos(pontos + 1);
        setVelocidade((prev) => Math.max(500, prev - 100)); // Aumentar velocidade, mínimo de 500 milissegundos.
      } else {
        setVelocidade((prev) => prev + 100); // Diminuir velocidade.
      }
    }
    // Atualizar numeros e falar o próximo número.
    atualizarNumeros();
  };

  return (
    <div className="App">
      <h1>Pasat Fase 1</h1>
      <p>Tempo restante: {tempoRestante} segundos</p>
      <p>Pontuação: {pontos}</p>
      <div className="button-grid">
        <button onClick={() => somarClick(1)}>1</button>
        <button onClick={() => somarClick(2)}>2</button>
        <button onClick={() => somarClick(3)}>3</button>
        <button onClick={() => somarClick(4)}>4</button>
        <button onClick={() => somarClick(5)}>5</button>
        <button onClick={() => somarClick(6)}>6</button>
        <button onClick={() => somarClick(7)}>7</button>
        <button onClick={() => somarClick(8)}>8</button>
        <button onClick={() => somarClick(9)}>9</button>
        <button onClick={() => somarClick(10)}>10</button>
        <button onClick={() => somarClick(11)}>11</button>
        <button onClick={() => somarClick(12)}>12</button>
        <button onClick={() => somarClick(13)}>13</button>
        <button onClick={() => somarClick(14)}>14</button>
        <button onClick={() => somarClick(15)}>15</button>
        <button onClick={() => somarClick(16)}>16</button>
        <button onClick={() => somarClick(17)}>17</button>
        <button onClick={() => somarClick(18)}>18</button>
      </div>
      <p>
        Número atual: {numeroAtual}, Número anterior: {numeroAnterior}
      </p>
    </div>
  );
}
