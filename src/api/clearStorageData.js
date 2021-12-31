import AsyncStorage from '@react-native-async-storage/async-storage';
// 
export const clearStorageData = async (moduleObject, key, value) => {
  try {
    
    //此方法对moduleObject的对象进行存取数值的时候，注意顺序，并且不能有任何的空值和特殊字符 eg：null '' ' ' ,0, [] {}
    let moduleKey = Object.values(moduleObject).reduce((a, n) => {
      return a + '_' + n
    })+'_'+key
    console.log(moduleKey,'缓存清除')
    await AsyncStorage.removeItem(moduleKey, value);
    return 'ok'
  } catch (error) {
    // Error saving data
  }
};



