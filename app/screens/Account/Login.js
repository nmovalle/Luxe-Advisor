import React, { useRef } from "react";
import { StyleSheet, View, ScrollView, Text, Image } from "react-native";
import { Divider } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import LoginForm from "../../components/Account/LoginForm";
import LoginFacebook from "../../components/Account/LoginFacebook";
import Toast from "react-native-easy-toast";

export default function Login() {
    const toastRef = useRef();

    return (
        <ScrollView>
            <Image 
                source={require("../../../assets/img/welcome.png")}
                resizeMode="contain"
                style={styles.logo}
            />
            <View style={styles.viewContainer} >
                <LoginForm toastRef={toastRef} />
                <CreateAccountComponent />
            </View>
            <Divider style={styles.divider} />
            <LoginFacebook toastRef={toastRef} />
            <Toast ref={toastRef} position="center" opacity={0.9} />
        </ScrollView>
    )
}

function CreateAccountComponent() {
    const navigation = useNavigation();

    return (
        <Text style={styles.textRegister}>
            ¿Aún no tienes una cuenta? {" "}
            <Text 
                style={styles.btnRegister}
                onPress={() => navigation.navigate("register")}
            >
                Regístrate
            </Text>
        </Text>
    )
}

const styles = StyleSheet.create({
    logo: {
        width: "100%",
        height: 150,
        marginTop: 20
    },
    viewContainer: {
        marginRight: 40,
        marginLeft: 40
    },
    textRegister: {
        marginTop: 15,
        marginLeft: 10,
        marginRight: 10,
    },
    btnRegister: {
            color: "#00a680",
            fontWeight: "bold"
    },
    divider: {
        backgroundColor: "#00a680",
        margin: 30
    }
});