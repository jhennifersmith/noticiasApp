import React, { useState, useEffect } from "react";
import { View, Text, Button, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { FIRESTORE_DB } from "../firebaseConfig";
import { addDoc, collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";

const Lista = ({ navigation }: any) => {
  const [noticia, setNoticia] = useState("");
  const [noticias, setNoticias] = useState<any[]>([]);

  useEffect(() => {
    const NoticiasRef = collection(FIRESTORE_DB, "Noticias");
    const subscriber = onSnapshot(NoticiasRef, {
      next: (snapshot) => {
        const noticias: any[] = [];
        snapshot.docs.forEach((doc) => {
            noticias.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setNoticias(noticias);
      },
    });
    return () => subscriber();
  }, []);

  const ExcluirElemento = async (id: any) => {
    try {
        const colecao = collection(FIRESTORE_DB, "Noticias");
        const elemento = doc(colecao, id);
        await deleteDoc(elemento);
        alert("Elemento excluido com sucesso!")
    } catch (erro) {
      alert("Falha ao excluir!" + erro);
    }
  };

  return (
    <View>
      <View style={styles.container}>
        {noticias.map((noticia) => (
          <>
          <View style={styles.noticia}>
            <View style={styles.box}>
                <Text style={styles.label}>Título</Text>
                <Text style={styles.titulo} key={noticia.id}> {noticia.title} </Text>
            </View>
            <View style={styles.box}>
                <Text style={styles.label}>Descrição</Text>
                <Text style={styles.descricao} key={noticia.id}> {noticia.descricao} </Text>
            </View>
            <View style={styles.box}>
                <Text style={styles.label}>Data da postagem</Text>
                <Text style={styles.data} key={noticia.id}> {noticia.currentDate} </Text>
            </View>
            <TouchableOpacity
              style={styles.btnExcluir}
              onPress={() => ExcluirElemento(noticia.id)}
            >Excluir</TouchableOpacity>
          </View>
          </>
        ))}
      </View>
    </View>
  );
};
export default Lista;

const styles = StyleSheet.create({
    container: {
        flex: 2,
        alignItems: "center",
        backgroundColor: "#FFF"
    },
    box: {
        backgroundColor: "#DAF",
        margin: 5,
        padding: 5,
        width: 300,
        borderRadius: 5,
    },
    noticia: {
        textAlign: "center",
        justifyContent: "center",
    },
    label:{
        fontWeight: "bold",
        fontSize:18,
        padding: 3,
        margin: 5,
        color:"#000"
    },
    titulo:{
        fontSize:16,
        padding: 3,
        margin: 5,
        color:"#000"
    },
    descricao:{
        fontSize:16,
        padding: 3,
        margin: 5,
        color:"#000"
    },
    data:{
        fontSize:16,
        padding: 3,
        margin: 5,
        color:"#000"
    },
    btnExcluir:{
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
})