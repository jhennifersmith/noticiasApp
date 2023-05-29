import React, { useState, useEffect } from "react";
import { View, Text, Button, TextInput, TouchableOpacity, StyleSheet, Pressable } from "react-native";
import { FIRESTORE_DB } from "../firebaseConfig";
import moment from 'moment';


import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    onSnapshot,
  } from "firebase/firestore";
  
  const CadastroNoticia = ({ navigation }: any) => {
    const [noticia, setNoticia] = useState("");
    const [descricaoNoticia, setDescricaoNoticia] = useState("");
    const currentDate = moment().format('YYYY-MM-DD');
    const [noticias, setNoticias] = useState<any[]>([]);

    const addNoticia = async () => {
      const doc = addDoc(collection(FIRESTORE_DB, "Noticias"), {
        title: noticia,
        descricao: descricaoNoticia,
        currentDate : new Date().toISOString().slice(0, 10)
      });
      setNoticia("");   
      setDescricaoNoticia("");
    };

    return (
        <View style ={styles.container}>
        <Text style={styles.label}>Título da notícia: </Text>
        <TextInput
          placeholder=""
          onChangeText={(t: string) => setNoticia(t)}
          value={noticia}
          style={styles.inputTitulo}
        />
        <Text style={styles.label}>Descreva a notícia: </Text>
        <TextInput
          placeholder=""
          onChangeText={(t: string) => setDescricaoNoticia(t)}
          value={descricaoNoticia}
          style={styles.inputDescricao}
          multiline={true}
        />
        <TouchableOpacity
          onPress={() => addNoticia()}
          disabled={noticia === ""}
          style={styles.btnAdd}
        > Enviar </TouchableOpacity>
        <TouchableOpacity style={styles.btnListar} onPress={() => navigation.navigate("Lista")} > Ver notícias </TouchableOpacity>
      </View>
    );
  }
  export default CadastroNoticia;

  const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#FFF"
    },
    label:{
        fontSize:18,
        padding: 3,
        margin: 5,
        color:"#000"
    },
    inputTitulo:{
        margin: 5,
        height: 40,
        width: 300,
        padding: 20,
        fontSize: 16,
        color: '#000',
        backgroundColor: '#DAF',
        marginVertical: 10,
        borderRadius: 5
    },
    inputDescricao:{
        margin: 5,
        height: 200,
        width: 300,
        padding: 20,
        fontSize: 16,
        color: '#000',
        backgroundColor: '#DAF',
        marginVertical: 10,
        borderRadius: 5
    },
    btnAdd:{
        margin: 5,
        width: 300,
        height: 40,
        backgroundColor: "#DAF",
        padding: 5,
        textAlign: "center",
        justifyContent: "center",
        borderRadius: 5
    },
    btnListar:{
        margin: 5,
        width: 300,
        height: 40,
        backgroundColor: "#000",
        padding: 5,
        textAlign: "center",
        justifyContent: "center",
        color: "#fff",
        borderRadius: 5
    }
});