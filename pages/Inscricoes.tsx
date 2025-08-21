import React, { useState, useEffect } from "react";
import { Inscricao } from "@/entities/Inscricao";
import { Eletiva } from "@/entities/Eletiva";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, Search, Filter } from "lucide-react";
import { format } from "date-fns";

export default function InscricoesPage() {
  const [inscricoes, setInscricoes] = useState([]);
  const [eletivas, setEletivas] = useState([]);
  const [filteredInscricoes, setFilteredInscricoes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTurma, setSelectedTurma] = useState("all");
  const [selectedEletiva, setSelectedEletiva] = useState("all");
  const [loading, setLoading] = useState(true);

  const turmas = ["6º ano", "7º ano", "8º ano", "9º ano"];

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    filterInscricoes();
  }, [inscricoes, searchTerm, selectedTurma, selectedEletiva]);

  const loadData = async () => {
    try {
      const [inscricoesData, eletivasData] = await Promise.all([
        Inscricao.list('-created_date'),
        Eletiva.list()
      ]);
      setInscricoes(inscricoesData);
      setEletivas(eletivasData);
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterInscricoes = () => {
    let filtered = inscricoes;

    if (searchTerm) {
      filtered = filtered.filter(inscricao =>
        inscricao.nome_aluno.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedTurma !== "all") {
      filtered = filtered.filter(inscricao => inscricao.turma === selectedTurma);
    }

    if (selectedEletiva !== "all") {
      filtered = filtered.filter(inscricao => inscricao.eletiva_id === selectedEletiva);
    }

    setFilteredInscricoes(filtered);
  };

  const getEletivaNome = (eletivaId) => {
    const eletiva = eletivas.find(e => e.id === eletivaId);
    return eletiva ? eletiva.nome : "Eletiva não encontrada";
  };

  const getStatistics = () => {
    const totalInscricoes = inscricoes.length;
    const inscricoesPorTurma = turmas.map(turma => ({
      turma,
      count: inscricoes.filter(i => i.turma === turma).length
    }));
    const inscricoesPorEletiva = eletivas.map(eletiva => ({
      nome: eletiva.nome,
      count: inscricoes.filter(i => i.eletiva_id === eletiva.id).length
    })).sort((a, b) => b.count - a.count);

    return { totalInscricoes, inscricoesPorTurma, inscricoesPorEletiva };
  };

  const stats = getStatistics();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/3 mb-4"></div>
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              {Array(3).fill(0).map((_, i) => (
                <div key={i} className="h-24 bg-gray-300 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Users className="w-8 h-8 text-blue-600" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Inscrições Realizadas</h1>
            <p className="text-gray-600">Visualize e gerencie todas as inscrições</p>
          </div>
        </div>

        {/* Estatísticas */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card className="shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Total de Inscrições</p>
                  <p className="text-3xl font-bold text-blue-600">{stats.totalInscricoes}</p>
                </div>
                <Users className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          {stats.inscricoesPorTurma.map((item) => (
            <Card key={item.turma} className="shadow-lg">
              <CardContent className="p-6">
                <div>
                  <p className="text-sm font-medium text-gray-500">{item.turma}</p>
                  <p className="text-2xl font-bold text-purple-600">{item.count}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filtros */}
        <Card className="shadow-lg mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Filtros
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                <Input
                  placeholder="Buscar por nome do aluno..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select value={selectedTurma} onValueChange={setSelectedTurma}>
                <SelectTrigger>
                  <SelectValue placeholder="Todas as turmas" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as turmas</SelectItem>
                  {turmas.map((turma) => (
                    <SelectItem key={turma} value={turma}>{turma}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedEletiva} onValueChange={setSelectedEletiva}>
                <SelectTrigger>
                  <SelectValue placeholder="Todas as eletivas" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as eletivas</SelectItem>
                  {eletivas.map((eletiva) => (
                    <SelectItem key={eletiva.id} value={eletiva.id}>
                      {eletiva.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Lista de Inscrições */}
        <div className="grid gap-4">
          {filteredInscricoes.map((inscricao) => (
            <Card key={inscricao.id} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                      {inscricao.nome_aluno}
                    </h3>
                    <p className="text-gray-600 mb-2">
                      <strong>Eletiva:</strong> {inscricao.eletiva_nome || getEletivaNome(inscricao.eletiva_id)}
                    </p>
                    <p className="text-sm text-gray-500">
                      Inscrito em: {format(new Date(inscricao.created_date), "dd/MM/yyyy 'às' HH:mm")}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 mt-4 md:mt-0">
                    <Badge className="bg-blue-100 text-blue-700">
                      {inscricao.turma}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {filteredInscricoes.length === 0 && (
            <Card className="shadow-lg">
              <CardContent className="p-8 text-center">
                <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Nenhuma inscrição encontrada
                </h3>
                <p className="text-gray-500">
                  Tente ajustar os filtros ou aguarde novas inscrições.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}