import React from 'react';
import { View } from 'react-native';
import { Input } from '../components/Input';

export function FormAlunos({ formData, onChange }: any){
  return (
    <View>
      <Input label="Nome Completo" value={formData.nome || ''} onChangeText={(v)=>onChange('nome', v)} />
      <Input label="Data de Nascimento" value={formData.dataNasc || ''} placeholder="dd/mm/aaaa" onChangeText={(v)=>onChange('dataNasc', v)} />
      <Input label="Matrícula" value={formData.matricula || ''} onChangeText={(v)=>onChange('matricula', v)} />
      <Input label="E-mail" value={formData.email || ''} keyboardType="email-address" onChangeText={(v)=>onChange('email', v)} />
      <Input label="Responsável" value={formData.responsavel || ''} onChangeText={(v)=>onChange('responsavel', v)} />
      <Input label="Telefone do Responsável" value={formData.telefoneResp || ''} onChangeText={(v)=>onChange('telefoneResp', v)} />
    </View>
  );
}
