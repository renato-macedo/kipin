import AsyncStorage from '@react-native-community/async-storage';

export async function storeData(key: string, data: string): Promise<boolean> {
  console.log('saving', data);
  try {
    await AsyncStorage.setItem(key, data);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
export async function getData(key: string): Promise<string> {
  console.log('getting');
  try {
    const value = await AsyncStorage.getItem(key);
    console.log({value});
    if (value !== null) {
      return value;
    }
    return '';
  } catch (error) {
    console.log(error);
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
