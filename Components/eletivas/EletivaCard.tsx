import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users } from "lucide-react";

export default function EletivaCard({ eletiva, isSelected, onClick }) {
  return (
    <Card 
      className={`cursor-pointer transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 ${
        isSelected 
          ? 'ring-2 ring-purple-500 bg-purple-50 shadow-lg' 
          : 'hover:shadow-md'
      }`}
      onClick={onClick}
    >
      <CardContent className="p-0">
        <div className="aspect-video w-full overflow-hidden rounded-t-lg">
          <img 
            src={eletiva.imagem_url || 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=250&fit=crop'}
            alt={eletiva.nome}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold text-lg text-gray-900 truncate">
              {eletiva.nome}
            </h3>
            <Badge variant="secondary" className="bg-green-100 text-green-700 flex items-center gap-1">
              <Users className="w-3 h-3" />
              {eletiva.vagas || 30}
            </Badge>
          </div>
          <p className="text-gray-600 text-sm line-clamp-2">
            {eletiva.descricao}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}