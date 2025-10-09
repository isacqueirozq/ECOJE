import AsyncStorage from "@react-native-async-storage/async-storage";

export async function saveData(key: string, value: any) {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.error("Erro ao salvar:", e);
  }
}

export async function loadData(key: string) {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error("Erro ao carregar:", e);
    return null;
  }
}

export async function appendData(key: string, newItem: any) {
  const existing = (await loadData(key)) || [];
  existing.push(newItem);
  await saveData(key, existing);
}
