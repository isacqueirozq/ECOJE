import React, { useState, useEffect } from "react";
import { Eletiva } from "@/entities/Eletiva";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings, Plus, Edit, Trash2, Save, X } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Switch } from "@/components/ui/switch";

export default function AdminPage() {
  const [eletivas, setEletivas] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingEletiva, setEditingEletiva] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [formData, setFormData] = useState({
    nome: "",
    descricao: "",
    imagem_url: "",
    vagas: 30,
    ativa: true
  });

  useEffect(() => {
    loadEletivas();
  }, []);

  const loadEletivas = async () => {
    try {
      const data = await Eletiva.list('-created_date');
      setEletivas(data);
    } catch (error) {
      console.error("Erro ao carregar eletivas:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      nome: "",
      descricao: "",
      imagem_url: "",
      vagas: 30,
      ativa: true
    });
    setEditingEletiva(null);
    setShowForm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (editingEletiva) {
        await Eletiva.update(editingEletiva.id, formData);
        setSuccess("Eletiva atualizada com sucesso!");
      } else {
        await Eletiva.create(formData);
        setSuccess("Eletiva criada com sucesso!");
      }
      
      resetForm();
      loadEletivas();
    } catch (error) {
      console.error("Erro ao salvar eletiva:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (eletiva) => {
    setFormData({
      nome: eletiva.nome,
      descricao: eletiva.descricao,
      imagem_url: eletiva.imagem_url || "",
      vagas: eletiva.vagas || 30,
      ativa: eletiva.ativa
    });
    setEditingEletiva(eletiva);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir esta eletiva?")) {
      try {
        await Eletiva.delete(id);
        setSuccess("Eletiva excluída com sucesso!");
        loadEletivas();
      } catch (error) {
        console.error("Erro ao excluir eletiva:", error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Settings className="w-8 h-8 text-purple-600" />
              <h1 className="text-3xl font-bold text-gray-900">Painel Administrativo</h1>
            </div>
            <p className="text-gray-600">Gerencie as eletivas disponíveis</p>
          </div>
          
          <Button 
            onClick={() => setShowForm(!showForm)}
            className="bg-purple-600 hover:bg-purple-700"
          >
            <Plus className="w-5 h-5 mr-2" />
            Nova Eletiva
          </Button>
        </div>

        {success && (
          <Alert className="mb-6 bg-green-50 text-green-800 border-green-200">
            <AlertDescription>{success}</AlertDescription>
          </Alert>
        )}

        {showForm && (
          <Card className="mb-8 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
              <CardTitle className="flex items-center gap-2">
                {editingEletiva ? <Edit className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                {editingEletiva ? "Editar Eletiva" : "Nova Eletiva"}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="nome" className="font-semibold">Nome da Eletiva *</Label>
                    <Input
                      id="nome"
                      value={formData.nome}
                      onChange={(e) => setFormData(prev => ({...prev, nome: e.target.value}))}
                      placeholder="Ex: Programação para Iniciantes"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="vagas" className="font-semibold">Número de Vagas</Label>
                    <Input
                      id="vagas"
                      type="number"
                      value={formData.vagas}
                      onChange={(e) => setFormData(prev => ({...prev, vagas: parseInt(e.target.value)}))}
                      min="1"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="descricao" className="font-semibold">Descrição *</Label>
                  <Textarea
                    id="descricao"
                    value={formData.descricao}
                    onChange={(e) => setFormData(prev => ({...prev, descricao: e.target.value}))}
                    placeholder="Descreva o que os alunos aprenderão nesta eletiva..."
                    rows={4}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="imagem" className="font-semibold">URL da Imagem</Label>
                  <Input
                    id="imagem"
                    value={formData.imagem_url}
                    onChange={(e) => setFormData(prev => ({...prev, imagem_url: e.target.value}))}
                    placeholder="https://..."
                  />
                </div>

                <div className="flex items-center space-x-3">
                  <Switch
                    checked={formData.ativa}
                    onCheckedChange={(checked) => setFormData(prev => ({...prev, ativa: checked}))}
                  />
                  <Label className="font-semibold">Eletiva ativa para inscrições</Label>
                </div>

                <div className="flex gap-3">
                  <Button
                    type="submit"
                    disabled={loading}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {loading ? "Salvando..." : "Salvar"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={resetForm}
                  >
                    <X className="w-4 h-4 mr-2" />
                    Cancelar
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {eletivas.map((eletiva) => (
            <Card key={eletiva.id} className="shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="aspect-video w-full overflow-hidden rounded-t-lg">
                <img 
                  src={eletiva.imagem_url || 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=250&fit=crop'}
                  alt={eletiva.nome}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-lg truncate">{eletiva.nome}</h3>
                  <div className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    eletiva.ativa ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {eletiva.ativa ? 'Ativa' : 'Inativa'}
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {eletiva.descricao}
                </p>
                
                <p className="text-sm text-gray-500 mb-4">
                  Vagas: {eletiva.vagas || 30}
                </p>
                
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(eletiva)}
                    className="flex-1"
                  >
                    <Edit className="w-4 h-4 mr-1" />
                    Editar
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDelete(eletiva.id)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}