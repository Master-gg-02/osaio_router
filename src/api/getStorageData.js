import AsyncStorage from '@react-native-async-storage/async-storage';
export const getStorageData = async (moduleObject, key) => {
    try {
        let moduleKey = Object.values(moduleObject).reduce((a, n) => {
            return a + '_' + n
        }) + '_' + key
        console.log(moduleKey, '获取缓存')
        const value = await AsyncStorage.getItem(moduleKey);
        if (value !== null) {
            // We have data!!
            return value
            console.log(value);
        } else {
            return null
        }

    } catch (error) {
        console.error(error)
    }
};
export const getSingleStorageData = async (key) => {
    try {
       
        console.log(key, '获取缓存')
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
            // We have data!!
            return value
        } else {
            return null
        }

    } catch (error) {
        console.error(error)
    }
};



