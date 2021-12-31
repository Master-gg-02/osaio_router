import React from 'react';
import { StyleSheet, TextInput, View ,Text} from 'react-native';
import global from '../utils/global';
let responseSize=global.responseSize
import PasswordInput from '../component/PasswordInput'
import UserInput from '../component/UserInput'




const App   = (props) => {
    return (
        <View>
            <View style={styles.inputBox}>
                <Text style={styles.title}>用户名</Text>
                {/* <TextInput
                    style={styles.input}
                    value={props.userName}
                    onChange={props.onUserNameChange}
                /> */}
                <UserInput
                    defaultValue={props.userName}
                    onChange={props.onUserNameChange}
                />

            </View>
            <View style={styles.inputBox}>
                <Text style={styles.title}>密码</Text>
                <PasswordInput
                    defaultValue={props.password}
                    onChange={props.onPasswordChange}
                />
            </View>
        </View>

    )
}
const styles = StyleSheet.create({
    input: {
        backgroundColor: '#F8F8F8',
        width: responseSize * 345,
        height: responseSize * 44,
        borderRadius: responseSize * 10,
        color: '#414245',
        marginBottom: responseSize * 10,
        paddingLeft:responseSize*20,
    },
    inputBox: {
        // paddingHorizontal:20,
    },
    title: {
        marginLeft:responseSize*10,
        marginTop: responseSize * 10,
        marginBottom: responseSize * 5,
        fontSize: responseSize * 15,
        color: '#555555',
        fontWeight: '700',
        lineHeight: responseSize * 21,
    },
});
export default App;
