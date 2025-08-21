import React, { useState } from "react";
import { Inscricao } from "@/entities/Inscricao";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, GraduationCap, Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import EletivaSelector from "../components/eletivas/EletivaSelector";

const turmas = ["6º ano", "7º ano", "8º ano", "9º ano"];

export default function InscricaoPage() {
  const [formData, setFormData] = useState({
    nome_aluno: "",
    turma: "",
    eletiva_id: "",
    eletiva_nome: ""
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.nome_aluno || !formData.turma || !formData.eletiva_id) {
      setError("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    setLoading(true);
    setError("");
    
    try {
      await Inscricao.create(formData);
      setSuccess(true);
      setFormData({
        nome_aluno: "",
        turma: "", 
        eletiva_id: "",
        eletiva_nome: ""
      });
    } catch (error) {
      setError("Erro ao realizar inscrição. Tente novamente.");
      console.error("Erro na inscrição:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEletivaSelect = (eletiva) => {
    setFormData(prev => ({
      ...prev,
      eletiva_id: eletiva.id,
      eletiva_nome: eletiva.nome
    }));
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50 p-4 flex items-center justify-center">
        <Card className="max-w-md w-full shadow-xl">
          <CardContent className="text-center p-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Inscrição realizada!
            </h2>
            <p className="text-gray-600 mb-6">
              Sua inscrição na eletiva <strong>{formData.eletiva_nome}</strong> foi confirmada.
            </p>
            <Button 
              onClick={() => setSuccess(false)}
              className="bg-purple-600 hover:bg-purple-700"
            >
              Nova Inscrição
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Inscrição em Eletivas
          </h1>
          <p className="text-lg text-gray-600">
            Escolha sua eletiva favorita e faça sua inscrição
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <Card className="shadow-lg border-0">
            <CardHeader className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-t-lg">
              <CardTitle className="text-xl">Dados do Aluno</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="nome" className="text-sm font-semibold">Nome Completo *</Label>
                  <Input
                    id="nome"
                    value={formData.nome_aluno}
                    onChange={(e) => setFormData(prev => ({...prev, nome_aluno: e.target.value}))}
                    placeholder="Digite seu nome completo"
                    className="h-12 text-lg"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-semibold">Turma *</Label>
                  <Select 
                    value={formData.turma} 
                    onValueChange={(value) => setFormData(prev => ({...prev, turma: value}))}
                  >
                    <SelectTrigger className="h-12 text-lg">
                      <SelectValue placeholder="Selecione sua turma" />
                    </SelectTrigger>
                    <SelectContent>
                      {turmas.map((turma) => (
                        <SelectItem key={turma} value={turma}>
                          {turma}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0">
            <CardHeader className="bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-t-lg">
              <CardTitle className="text-xl">Escolha da Eletiva *</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <EletivaSelector
                value={formData.eletiva_id}
                onChange={handleEletivaSelect}
              />
            </CardContent>
          </Card>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="text-center">
            <Button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-12 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Realizando inscrição...
                </>
              ) : (
                "Confirmar Inscrição"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}