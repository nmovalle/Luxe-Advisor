import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Input, Icon, Button } from "react-native-elements";
import Loading from "../Loading";
import { validateEmail } from "../../utils/validations";
import { size, isEmpty } from "lodash";
import * as firebase from "firebase";
import { useNavigation } from "@react-navigation/native";

export default function RegisterForm(props) {
    const { toastRef } = props;
    const [showPassword, setShowPassword] = useState(false);
    const [showRepeatPassword, setShowRepeatPassword] = useState(false);
    const [formData, setFormData] = useState(defaultFormValue());
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    const onSubmit = () => {
        if(
            isEmpty(formData.email) || 
            isEmpty(formData.password) || 
            isEmpty(formData.repeatPassword)) return toastRef.current.show("Todos los campos obligatorios.");
        if (!validateEmail(formData.email)) return toastRef.current.show("Correo inválido.");
        if (formData.password != formData.repeatPassword) return toastRef.current.show("Las contraseñas no coinciden.");
        if (size(formData.password) < 6) return toastRef.current.show("La contraseña debe contener al menos 6 caracteres.")

        setLoading(true);
        firebase
            .auth()
            .createUserWithEmailAndPassword(formData.email, formData.password)
            .then(() => {
                setLoading(false);
                navigation.navigate("account");
            })
            .catch(() => {
                setLoading(false);
                toastRef.current.show("El email ya está en uso.");
            });


        // const credentials = firebase.auth.FacebookAuthProvider.credential("");
        // firebase
        // .auth().signInWithCredential(credentials)
        // .then(() => {})
        // .catch(() => {})
    }

    const onChange = (e, type) => {
        setFormData({...formData, [type]: e.nativeEvent.text});
    }

    return(
        <View style={styles.formContainer}>
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
            <Input 
                placeholder="Repetir Contraseña"
                containerStyle={styles.inputForm}
                password={true}
                secureTextEntry={!showRepeatPassword}
                onChange={e => onChange(e, "repeatPassword")}
                rightIcon={
                    <Icon 
                        type="material-community"
                        name={showRepeatPassword ? "eye-off-outline" : "eye-outline"}
                        iconStyle={styles.iconRight}
                        onPress={() => setShowRepeatPassword(!showRepeatPassword)}
                    />
                }
            />
            <Button 
                title="Unirse"
                style={styles.btnContainerRegister}
                buttonStyle={styles.btnRegister}
                onPress={onSubmit}
            />
            <Loading isVisible={loading} text="Creando cuenta" />
        </View>
    );
}

function defaultFormValue() {
    return {
        email: "",
        password: "",
        repeatPassword: ""
    }
}

const styles = StyleSheet.create({
    formContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30,
    },
    inputForm: {
        width: "100%",
        marginTop: 20,
    },
    btnContainerRegister: {
        marginTop: 20,
        minWidth: "95%"
    },
    btnRegister: {
        backgroundColor: "#00a680",
    },
    iconRight: {
        color: "#c1c1c1",
    },
  });