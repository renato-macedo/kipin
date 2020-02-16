import AsyncStorage from '@react-native-community/async-storage';

export async function storeData(key: string, data: string): Promise<boolean> {
  try {
    await AsyncStorage.setItem(key, data);
    return true;
  } catch (error) {
    return false;
  }
}
export async function getData(key: string): Promise<string> {
  try {
    const value = await AsyncStorage.getItem(key);

    if (value !== null) {
      return value;
    }
    return '';
  } catch (error) {
    return '';
  }
}
export async function removeItem(key: string) {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (error) {
    return false;
  }
}
