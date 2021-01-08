import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Input, Icon, Button } from "react-native-elements";
import Loading from "../Loading";
import { useNavigation } from "@react-navigation/native";
import { validateEmail } from "../../utils/validations";
import * as firebase from "firebase";
import { isEmpty } from "lodash";

export default function LoginForm(props) {
    const { toastRef } = props;
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState(defaultFormValue());
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    const onChange = (e, type) => {
        setFormData({...formData, [type]: e.nativeEvent.text});
    }

    const onSubmit = () => {
        
        if(
            isEmpty(formData.email) || isEmpty(formData.password)
        ) return toastRef.current.show("Todos los campos son obligatorios.");
        if(!validateEmail(formData.email)) return toastRef.current.show("Correo inválido");

        setLoading(true);
        firebase
        .auth()
        .signInWithEmailAndPassword(formData.email, formData.password)
        .then(() => {
            setLoading(false);
            navigation.navigate("account");
        })
        .catch(() => {
            setLoading(false);
            toastRef.current.show("El correo electrónico o contraseña son inválidos.");
        })
    }

    return(
        <View style={styles.formContainer} >
            <Input 
                placeholder="Correo electrónico" 
                containerStyle={styles.inputForm}
                onChange={e => onChange(e, "email")}
                rightIcon={
                    <Icon 
                        type="material-community"
                        name="at"
                        iconStyle={styles.iconRight}
                    />
                }
                />
            <Input 
                placeholder="Contraseña" 
                containerStyle={styles.inputForm} 
                password={true}
                secureTextEntry={!showPassword}
                onChange={e => onChange(e, "password")}
                rightIcon={
                    <Icon 
                        type="material-community"
                        name={showPassword ? "eye-off-outline" : "eye-outline"}
                        iconStyle={styles.iconRight}
                        onPress={() => setShowPassword(!showPassword)}
                    />
                }
                />
                <Button 
                    title="Iniciar Sesión"
                    containerStyle={styles.btnContainerLogin}
                    buttonStyle={styles.btnLogin}
                    onPress={onSubmit}
                />
                 <Loading isVisible={loading} text="Iniciando sesión" />
        </View>
    );
}

function defaultFormValue() {
    return {
        email: "",
        password: ""
    }
}

const styles = StyleSheet.create({
    formContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30
    },
    inputForm: {
        width: "100%",
        marginTop: 20
    },
    btnContainerLogin: {
        marginTop: 20,
        width: "95%"
    },
    btnLogin: {
        backgroundColor: "#00a680"
    },
    iconRight: {
        color: "#c1c1c1",
    },
});
