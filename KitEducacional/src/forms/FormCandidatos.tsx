import React from 'react';
import { View } from 'react-native';
import { Input } from '../components/Input';
import { Select } from '../components/Select';

export function FormCandidatos({ formData, onChange }: any){
  return (
    <View>
      <Input label="Nome Completo" value={formData.nome || ''} onChangeText={(v)=>onChange('nome', v)} />
      <Input label="CPF" value={formData.cpf || ''} onChangeText={(v)=>onChange('cpf', v)} />
      <Input label="E-mail" value={formData.email || ''} keyboardType="email-address" onChangeText={(v)=>onChange('email', v)} />
      <Input label="Telefone" value={formData.telefone || ''} onChangeText={(v)=>onChange('telefone', v)} />
      <Select label="Cargo Pretendido" value={formData.cargo || ''} onValueChange={(v)=>onChange('cargo', v)} options={[
        {value:'professor',label:'Professor'},
        {value:'coordenador',label:'Coordenador'},
        {value:'diretor',label:'Diretor'},
        {value:'administrativo',label:'Administrativo'}
      ]} />
      <Input label="Formação" value={formData.formacao || ''} onChangeText={(v)=>onChange('formacao', v)} />
    </View>
  );
}
