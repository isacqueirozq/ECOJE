import React, { useState, useEffect } from "react";
import { Eletiva } from "@/entities/Eletiva";
import EletivaCard from "./EletivaCard";
import { Skeleton } from "@/components/ui/skeleton";

export default function EletivaSelector({ value, onChange }) {
  const [eletivas, setEletivas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEletivas();
  }, []);

  const loadEletivas = async () => {
    try {
      const data = await Eletiva.filter({ ativa: true }, 'nome');
      setEletivas(data);
    } catch (error) {
      console.error("Erro ao carregar eletivas:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array(6).fill(0).map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="aspect-video w-full rounded-lg" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">
        Escolha sua eletiva: {eletivas.length} disponíveis
      </h3>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {eletivas.map((eletiva) => (
          <EletivaCard
            key={eletiva.id}
            eletiva={eletiva}
            isSelected={value === eletiva.id}
            onClick={() => onChange(eletiva)}
          />
        ))}
      </div>
    </div>
  );
}