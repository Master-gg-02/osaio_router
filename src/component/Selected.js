// maxHeight={280}
import { SafeAreaView, View, StyleSheet, Text, Switch, Image, ScrollView, KeyboardAvoidingView, TouchableOpacity, Modal } from 'react-native';


const SelectDropDown = data.map((item) => (
    <RenderItem
        item={item}
        key={item.value}
    />
))
const RenderItem = ({ item }) => {
    return (
        // <View >
        <TouchableOpacity
            style={styles.item}
            onPress={() => {
                // setShowSelect(true)
                console.log(item)
                setDropdown(item.value)
                setShowSelect(false)
                setSelecedValue(item.label)
            }}
        >
            <Text style={{ color: '#414245', fontWeight: '700', ...styles.textItem }}>{item.label}</Text>
            <SecletHook value={item.value}></SecletHook>
        </TouchableOpacity>
        // </View>
    );
};
const app = () => {
    const [showSelect, setShowSelect] = useState(false);
    return (
        <View>
            <TouchableOpacity
                style={styles.selectUpContainer}
                onPress={() => {
                    setShowSelect(!showSelect)

                }}
            >
                <Text style={{ color: '#414245', fontWeight: '700', ...styles.textItem }}>{selecedValue}</Text>
                <Image style={styles.icon} source={require('../assets/images/ic_options_down_on_off.png')} />
            </TouchableOpacity>
            {
                showSelect ? <View
                >
                    {
                        SelectDropDown

                    }

                </View> : null
            }
            <View style={styles.selectDwonContainer}> </View>

        </View>
    )
}
const styles = StyleSheet.create({
    selectUpContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: responseSize * 10,
        paddingHorizontal: responseSize * 20,
        width: responseSize * 345,
        height: responseSize * 50,
        borderRadius: responseSize * 10,
        backgroundColor: '#F8F8F8',
    },
    selectDwonContainer: {
        zIndex: 999,
        backgroundColor: '#fff',
        position: 'absolute',
        top: responseSize * 60,
        width: responseSize * 345,
        marginTop: responseSize * 10,
        borderRadius: responseSize * 10,
        borderColor: 'rgba(65, 66, 69, 0.05)',
        borderWidth: responseSize * 1,
        shadowColor: '#E9EDF3',
        shadowOffset: {
            width: responseSize * 0,
            height: responseSize * 15,
        },
        shadowOpacity: 0.8,
        shadowRadius: responseSize * 8,
    },
})


export default app;
