import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, RefreshControl } from 'react-native';
import { loadData, clearData } from '../../storage/storageService';

const types = ['professores','alunos','eletivas','candidatos','turmas'];

export default function ListagemScreen(){
  const [tipo, setTipo] = useState(types[0]);
  const [dados, setDados] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetch = async (t: string) => {
    const res = await loadData(t);
    setDados(res || []);
  };

  useEffect(()=>{
    fetch(tipo);
  },[tipo]);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetch(tipo);
    setRefreshing(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Listagem - {tipo}</Text>

      <FlatList
        data={dados}
        keyExtractor={(_,i)=>i.toString()}
        renderItem={({item})=>(
          <View style={styles.item}>
            <Text style={styles.name}>{item.nome || item.nomeEletiva || item.nomeTurma || item.nomeCandidato || 'Registro'}</Text>
            <Text style={styles.sub}>{item.email || item.professor || item.createdAt ? new Date(item.createdAt).toLocaleString() : ''}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={{textAlign:'center',marginTop:20}}>Nenhum registro encontrado.</Text>}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />

      <View style={styles.footer}>
        {types.map(t=>(
          <TouchableOpacity key={t} onPress={()=>setTipo(t)} style={[styles.typeBtn, tipo===t && styles.typeBtnActive]}>
            <Text style={[styles.typeText, tipo===t && styles.typeTextActive]}>{t}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={{marginTop:12,alignItems:'center'}}>
        <TouchableOpacity onPress={async ()=>{ await clearData(tipo); await fetch(tipo); }} style={styles.clearBtn}>
          <Text style={{color:'#fff'}}>Limpar {tipo}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{flex:1,padding:16,backgroundColor:'#f8fafc'},
  title:{fontSize:18,fontWeight:'700',marginBottom:12,color:'#0f172a'},
  item:{borderBottomWidth:1,borderColor:'#e2e8f0',paddingVertical:10},
  name:{fontSize:16,fontWeight:'600'},
  sub:{color:'#475569',marginTop:4},
  footer:{flexDirection:'row',justifyContent:'space-between',marginTop:12},
  typeBtn:{paddingVertical:8,paddingHorizontal:12,borderRadius:8,backgroundColor:'#fff',borderWidth:1,borderColor:'#e2e8f0'},
  typeBtnActive:{backgroundColor:'#4f46e5',borderColor:'#4f46e5'},
  typeText:{color:'#0f172a'},
  typeTextActive:{color:'#fff'},
  clearBtn:{backgroundColor:'#ef4444',paddingVertical:10,paddingHorizontal:20,borderRadius:10}
});
