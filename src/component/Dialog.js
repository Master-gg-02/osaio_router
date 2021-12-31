import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Overlay, Button } from 'react-native-elements';

import MaterialCommunityIcons from "react-native-vector-icons/MaterialIcons"

import global from '../utils/global';
let responseSize=global.responseSize


const App = (props) => {
    return (
        <Overlay
            overlayStyle={styles.showDialogContent}
            isVisible={props.isVisible}
            onBackdropPress={props.onBackdropPress}
        >
            <Text style={styles.dialogTitle}>{props.title}</Text>
            <Text style={styles.dialogContent}>
                {props.content}
            </Text>
            <View style={styles.dialogFooter}>
                <Button
                    buttonStyle={styles.dialogCancelButton}
                    titleStyle={styles.dialogCancelTitle}
                    containerStyle={styles.dialogCancelcontainer}
                    onPress={props.cancle}
                    title={props.cancleTitle}
                />
                <View style={styles.dialogFooterLine}></View>
                <Button
                    buttonStyle={styles.dialogSureButton}
                    titleStyle={styles.dialogSureTitle}
                    containerStyle={styles.dialogSurecontainer}
                    onPress={props.confirm}
                    title={props.confirmTitle}
                />
            </View>
        </Overlay>
    );
}
const styles = StyleSheet.create({
    showDialogContent: {
        paddingHorizontal:responseSize*15,
        width: responseSize*300,
        backgroundColor: '#fff',
        borderRadius: responseSize*15,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    dialogTitle: {
        marginTop: responseSize*15,
        textAlign: 'center',
        fontSize: responseSize*18,
        fontWeight: '700'
    },
    dialogContent: {
        marginVertical:responseSize*15,
        textAlign: 'center',
        fontWeight: '400',
        fontSize: responseSize*14,
        color:'#555555'
    },

    dialogFooter: {
        // paddingTop:responseSize*17,
        height: responseSize*50,
        borderTopColor: '#e2e2e2',
        borderTopWidth: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems:'center'
    },
    dialogCancelButton: {
        textAlign: 'center',
        fontSize: responseSize*16,
        fontWeight: '700',
        width: responseSize*150,
        height: responseSize*50,
        backgroundColor: '#fff',
    },
    dialogCancelcontainer: {
        marginTop:responseSize*17, 
        width: responseSize*150,
        height: responseSize*50,
        borderBottomLeftRadius: responseSize*15,
        // backgroundColor:'red',
    },
    dialogSureButton: {
        padding:0,
        textAlign: 'center',
        fontSize: responseSize*16,
        fontWeight: '700',
        color: '#414245',
        width: responseSize*149,
        height: responseSize*50,
        borderBottomRightRadius: responseSize*15,
        backgroundColor: '#fff'
    },
    dialogSurecontainer: {
        marginTop:responseSize*17,
        width: responseSize*149,
        height: responseSize*50,
        borderBottomRightRadius: responseSize*15,
    },
    dialogFooterLine: {
        marginTop: responseSize*10,
        alignItems: 'center',
        height: responseSize*30,
        width: 1,
        backgroundColor: '#E2E2E2'
    },
    dialogCancelTitle: {
        color: '#414245'
    },
    dialogSureTitle: {
        color: global.buttonColor
    },
});
export default App;
