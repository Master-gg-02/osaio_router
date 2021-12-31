import React ,{useState}from 'react';
import { StyleSheet, View,Text ,TouchableWithoutFeedback} from 'react-native';
import Checked from '../component/Checked'

import global from '../utils/global';
let responseSize=global.responseSize

const App = (props) => {
    const [modalVisible, setModalVisible] = useState(false);
    return (
        <View style={styles.conduct}>
            <Checked
                onPress={() => {
                    setModalVisible(!modalVisible)
                }}
                visible={modalVisible}>
                </Checked>
            <Text style={styles.agreeStatement}>
                I have read and agree to
                <TouchableWithoutFeedback>
                    <Text style={styles.licnese}>
                        the End User Licnese Agreement
                    </Text>
                </TouchableWithoutFeedback>
                and
                <TouchableWithoutFeedback>
                    <Text style={styles.statement}>
                        the Statement About GNCC Wi-Fi Router and Privacy.
                    </Text>
                </TouchableWithoutFeedback>
            </Text>
        </View>)
}
const styles = StyleSheet.create({
    conduct: {
        paddingHorizontal: responseSize*8,
        flexDirection: 'row'
    },
    agreeStatement: {
        marginLeft: responseSize*8,
        marginBottom: responseSize*10,
        fontSize: responseSize*12,
        color: '#414245',
    },
    licnese: {
        color: global.buttonColor
    },
    statement: {
        color: global.buttonColor
    },
});
export default App;
