import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Alert, Button, ImageBackground, TouchableOpacity, Pressable, TextInput} from 'react-native';
import { useState,useEffect } from 'react';

export default function App() {
    const [vicc,setVicc]=useState("")
    const [adatok,setAdatok]=useState([])
    const [szoveg,setSzoveg]=useState("")

    const tomb=[
      {
        "szoveg":"Hogy hívják az internetes kísértetet? Pont huuúú",
        "tipus":"favicc"
      },
      {
        "szoveg":"Hogyan avatják fel a pezsgő gyárat? – Hozzá vágnak egy hajót",
        "tipus":"favicc"
      },
      {
        "szoveg":"Szomszéd, használhatnám a fűnyíróját?– Persze, csak ne vigye ki a kertemből…",
        "tipus":"favicc"
      },
      {
        "szoveg":"Hallod?! Ti hogyan szoktátok kezelni a konfliktusokat? – Pofon egyszerűen.",
        "tipus":"favicc"
      },
      {
        "szoveg":" Mi a falusi abortusz? Lelövik a gólyát. ",
        "tipus":"fárasztó vicc"
      }
    ]

    const sorsol=()=>{
      let veletlen=Math.floor(Math.random()*tomb.length)
      //alert(veletlen)
      //Alert.alert(tomb[veletlen].szoveg)
      setVicc(tomb[veletlen].szoveg)
    }

    const letoltes=async ()=>{
        let x=await fetch("https://api.chucknorris.io/jokes/random")
        let y=await x.json()
        setAdatok(y)
    }

    useEffect(()=>{
      sorsol()
      letoltes()
    },[])

    function gombNyomas(){
      Alert.alert("Üdvözlet","Hello "+szoveg+" !!!")
    }
  return (
      <ImageBackground source={require("./hatter.jpg")} style={styles.hatterKep}>
       <View  style={[ styles.container,   {flexDirection: 'column',   }, ]}>
            <View style={{flex: 2}} >
                  <TouchableOpacity style={styles.button} onPress={()=>sorsol()}>
                      <Text style={{fontSize:15,fontWeight:'bold'}}>Új vicc</Text>
                  </TouchableOpacity>
                  <Text style={{fontSize:20, color:"white",marginTop:10}}>{vicc}</Text>
              </View>
            <View style={{flex: 2}} >
                  
                  <Pressable style={styles.button} onPress={()=>letoltes()}>
                    <Text>Új Chuck Norris poén</Text>
                  </Pressable>   
                  <Text style={styles.kek}>{adatok.value}</Text>

                 
              </View>
              <View style={{flex: 1}} >
              <TextInput
                    style={styles.input}
                    onChangeText={setSzoveg}
                    placeholder='Neved'
                    value={szoveg}
                  />
                <TouchableOpacity style={styles.button} onPress={gombNyomas}>
                      <Text style={{fontSize:15,fontWeight:'bold'}}>Üdvözlet</Text>
                </TouchableOpacity>               
              </View>
      </View>
      </ImageBackground>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color:"white",
    marginTop:60,
    justifyContent: 'center',
    padding:20

  },
  kek:{
    color:"#a0c2f2",
    fontSize:20,
    marginTop:10
  },
  hatterKep:{
    resizeMode:"cover",
    justifyContent:"center",
    flex:1,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    marginLeft:50,
    marginRight:50,
    borderRadius:10
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor:"#abdbe3",
    borderRadius:5
  },
});
