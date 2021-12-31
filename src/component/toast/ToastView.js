import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Easing,
    Dimensions,
    Text,
    Animated
} from 'react-native';
import PropTypes from 'prop-types';
import Toast from "./index";

const { width, height } = Dimensions.get("window");
const viewHeight = 35;

class ToastView extends Component {
    static propTypes = {
        message: PropTypes.string,
        time: PropTypes.number
    };
    dismissHandler = null;
    moveAnim = new Animated.Value(height / 12);
    opacityAnim = new Animated.Value(0);

    constructor(props) {
        super(props);
        this.state = {
            message: props.message !== undefined ? props.message : '',
            time: props.time && props.time < 1500 ? Toast.SHORT : Toast.LONG,

        }
    }

    render() {
        return (
            <View style={styles.container} pointerEvents='none'>
                <Animated.View style={[styles.textContainer, { bottom: this.moveAnim, opacity: this.opacityAnim }]}><Text
                    style={styles.defaultText}>{this.state.message}</Text></Animated.View>
            </View>
        )
    }
    componentDidMount() {
        // this.timingDismiss()
        Animated.timing(
            this.moveAnim,
            {
                toValue: height / 8,
                duration: 80,
                easing: Easing.ease
            },
        ).start(this.timingDismiss);
        Animated.timing(
            this.opacityAnim,
            {
                toValue: 1,
                duration: 100,
                easing: Easing.linear
            },
        ).start();
    }

    componentWillUnmount() {
        clearTimeout(this.dismissHandler)
    }

    componentDidUpdate(nextProps) {
        this.setState({
            message: nextProps.message !== undefined ? nextProps.message : '',
            time: nextProps.time && nextProps.time < 1500 ? Toast.SHORT : Toast.LONG,
        })
        clearTimeout(this.dismissHandler)
        this.timingDismiss()
    }

    timingDismiss = () => {
        this.dismissHandler = setTimeout(() => {
            this.onDismiss()
        }, 1000)
    };

    onDismiss = () => {
        if (this.props.onDismiss) {
            this.props.onDismiss()
        }
    }
}

const styles = StyleSheet.create({
    textContainer: {
        backgroundColor: 'rgba(0,0,0,.6)',
        borderRadius: 8,
        padding: 10,
        bottom: height / 8,
        maxWidth: width / 2,
        alignSelf: "flex-end",
    },
    defaultText: {
        color: "#FFF",
        fontSize: 15,
    },
    container: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        flexDirection: "row",
        justifyContent: "center",
    }
});
export default ToastView