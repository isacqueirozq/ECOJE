import React from "react";
import { View } from "react-native";
import { Input } from "@/app/components/Input";
import { Select } from "@/app/components/Select";

export function FormProfessores({ formData, onChange }: any) {
  return (
    <View>
      <Input label="Nome Completo" value={formData.nome || ""} onChangeText={(v) => onChange("nome", v)} required />
      <Input label="CPF" value={formData.cpf || ""} onChangeText={(v) => onChange("cpf", v)} required />
      <Input label="E-mail" value={formData.email || ""} keyboardType="email-address" onChangeText={(v) => onChange("email", v)} />
      <Input label="Telefone" value={formData.telefone || ""} onChangeText={(v) => onChange("telefone", v)} />
      <Select
        label="Área de Atuação"
        value={formData.area || ""}
        onValueChange={(v) => onChange("area", v)}
        options={[
          { value: "matematica", label: "Matemática" },
          { value: "portugues", label: "Português" },
          { value: "ciencias", label: "Ciências" },
          { value: "historia", label: "História" },
        ]}
      />
    </View>
  );
}
