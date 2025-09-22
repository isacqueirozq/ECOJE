import React, { useState } from "react";

export default function App() {
  const [matricula, setMatricula] = useState("");

  const handleConsulta = async () => {
    if (!matricula) {
      alert("Informe a matrícula.");
      return;
    }
    try {
      const response = await fetch(
        `https://script.google.com/macros/s/AKfycbxCFs4jokx_Q_JbIEoWzzGMoFNM6OieAgg_GFYSHvQe7OwjkAi5NZKMguSkOxEczslBMw/exec?matricula=${matricula}`
      );
      const data = await response.json();
      if (data.error) {
        alert(data.error);
      } else {
        alert(`Nome: ${data.nome}\nTurma: ${data.turma}`);
      }
    } catch (error) {
      alert("Erro ao consultar. Tente novamente.");
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Bem-vindo!</h1>
      <p style={styles.subtitle}>Informe seu Número de Matrícula</p>
      <input
        style={styles.input}
        placeholder="Número de Matrícula"
        type="number"
        value={matricula}
        onChange={(e) => setMatricula(e.target.value)}
      />
      <button style={styles.button} onClick={handleConsulta}>
        Consultar
      </button>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#f5f6fa",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    marginBottom: 24,
  },
  input: {
    width: "100%",
    maxWidth: 320,
    height: 48,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: "0 16px",
    fontSize: 18,
    border: "1px solid #ddd",
    marginBottom: 20,
    boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
    outline: "none",
  },
  button: {
    width: "100%",
    maxWidth: 320,
    height: 48,
    backgroundColor: "#4f8cff",
    borderRadius: 12,
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 1,
    border: "none",
    cursor: "pointer",
    boxShadow: "0 2px 6px rgba(79,140,255,0.2)",
  },
};
