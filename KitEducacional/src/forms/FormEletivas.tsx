import React from 'react';
import { View } from 'react-native';
import { Input } from '../components/Input';
import { Select } from '../components/Select';

export function FormEletivas({ formData, onChange }: any){
  return (
    <View>
      <Input label="Nome da Eletiva" value={formData.nomeEletiva || ''} onChangeText={(v)=>onChange('nomeEletiva', v)} />
      <Input label="Descrição" value={formData.descricao || ''} onChangeText={(v)=>onChange('descricao', v)} />
      <Select label="Professor Responsável" value={formData.professor || ''} onValueChange={(v)=>onChange('professor', v)} options={[
        {value:'prof1',label:'Prof. João Silva'},
        {value:'prof2',label:'Profa. Maria Santos'},
        {value:'prof3',label:'Prof. Carlos Souza'},
      ]} />
      <Input label="Carga Horária" value={formData.cargaHoraria || ''} keyboardType="numeric" onChangeText={(v)=>onChange('cargaHoraria', v)} />
      <Input label="Vagas Disponíveis" value={formData.vagas || ''} keyboardType="numeric" onChangeText={(v)=>onChange('vagas', v)} />
      <Select label="Período" value={formData.periodo || ''} onValueChange={(v)=>onChange('periodo', v)} options={[
        {value:'matutino',label:'Matutino'},
        {value:'vespertino',label:'Vespertino'},
        {value:'noturno',label:'Noturno'},
      ]} />
    </View>
  );
}
