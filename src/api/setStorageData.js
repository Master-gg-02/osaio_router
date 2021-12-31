import AsyncStorage from '@react-native-async-storage/async-storage';
// 
export const setStorageData = async (moduleObject, key, value) => {
  try {
    
    //此方法对moduleObject的对象进行存取数值的时候，注意顺序，并且不能有任何的空值和特殊字符 eg：null '' ' ' ,0, [] {}
    let moduleKey = Object.values(moduleObject).reduce((a, n) => {
      return a + '_' + n
    })+'_'+key
    console.log(moduleKey, '存缓存')
    await AsyncStorage.setItem(moduleKey.toString(), value);
    return 'ok'
  } catch (error) {
    // Error saving data
  }
};



