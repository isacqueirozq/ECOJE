import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

function Form() {
  const [nome, setNome] = useState("");
  const [turma, setTurma] = useState("");
  const [eletivas, setEletivas] = useState([]);
  const [selectedEletiva, setSelectedEletiva] = useState("");
  const [vagas, setVagas] = useState({});

  useEffect(() => {  
    async function checkAuth(){ const { data:{ session }} = await supabase.auth.getSession(); if(!session) window.location.href='/login'; }
    checkAuth();
    async function loadEletivas() {
      const { data } = await supabase.from("eletivas").select();
      setEletivas(data);
      const v = {};
      data.forEach((e) => (v[e.id] = e.vagas));
      setVagas(v);
    }
    loadEletivas();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    const { data: count } = await supabase
      .from("inscricoes")
      .select("*", { count: "exact", head: true })
      .eq("eletiva_id", selectedEletiva);

    if (count >= vagas[selectedEletiva]) {
      alert("Vagas esgotadas para esta eletiva.");
      return;
    }
    await supabase.from("inscricoes").insert({ nome, turma, eletiva_id: selectedEletiva });
    alert("Inscrição realizada com sucesso!");
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-4 text-white">
      <h1 className="text-3xl font-bold mb-4">Inscrição de Eletivas</h1>
      <form className="bg-white/20 p-6 rounded-2xl shadow-lg backdrop-filter backdrop-blur-md" onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            className="w-full p-2 rounded"
            placeholder="Nome completo"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <input
            className="w-full p-2 rounded"
            placeholder="Turma"
            value={turma}
            onChange={(e) => setTurma(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <select
            className="w-full p-2 rounded"
            value={selectedEletiva}
            onChange={(e) => setSelectedEletiva(e.target.value)}
            required
          >
            <option value="">Selecione uma eletiva</option>
            {eletivas.map((el) => (
              <option key={el.id} value={el.id}>
                {el.nome} (vagas restantes: {vagas[el.id]})
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="bg-white text-purple-600 font-bold py-2 px-4 rounded-2xl">Inscrever-se</button>
      </form>
      <Link className="mt-4 underline" to="/admin">Ir para Administração</Link>
    </div>
  );
}

function Admin() {
  const [inscricoes, setInscricoes] = useState([]);

  useEffect(() => {
    async function loadData() {
      const { data } = await supabase.from("inscricoes").select("*");
      setInscricoes(data);
    }
    loadData();
  }, []);

  function exportCSV() {
    const rows = ["nome,turma,eletiva_id", ...inscricoes.map((r) => `${r.nome},${r.turma},${r.eletiva_id}`)];
    const blob = new Blob([rows.join("\n")], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "inscricoes.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Administração</h1>
      <button onClick={exportCSV} className="mb-4 bg-purple-600 text-white py-2 px-4 rounded">Exportar CSV</button>
      <ul>
        {inscricoes.map((r) => (
          <li key={r.id}>{r.nome} - {r.turma} - {r.eletiva_id}</li>
        ))}
      </ul>
      <Link className="underline" to="/">Voltar</Link>
    </div>
  );
}

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert("Credenciais inválidas");
    else window.location.href = "/admin";
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-4 text-white">
      <div className="text-center mb-4 text-2xl font-bold">Painel de Administração</div>
      <form onSubmit={handleLogin} className="bg-white/20 p-6 rounded-2xl">
        <h1 className="text-xl mb-4">Login do Administrador</h1>
        <input className="mb-2 p-2 w-full" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input className="mb-4 p-2 w-full" type="password" placeholder="Senha" onChange={(e) => setPassword(e.target.value)} />
        <button className="bg-white text-purple-600 py-2 px-4 rounded-2xl">Entrar</button>
      </form>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
} 