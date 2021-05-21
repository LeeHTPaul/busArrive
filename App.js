import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, ActivityIndicator } from 'react-native';

export default function App() {

  const [loading, setLoading] = useState(true);

  const busStop = "55031";
  const BUSSTOP_URL =  `https://arrivelah2.busrouter.sg/?id=${busStop}`;
  //console.log(BUSSTOP_URL);
  


  //BUSSTOP_URL = "https://arrivelah2.busrouter.sg/?id=55031";

  const [arrival, setArrival] = useState("");
  const [minutes, setMinutes] = useState("");
  const [minutes2, setMinutes2] = useState("");

  function loadBusStopData() {
    setLoading(true);

    fetch(BUSSTOP_URL)
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        //console.log("logging ...", responseData);
        const myBus = responseData.services.filter( 
          (item) => item.no === "854"
        )[0];
        console.log("My bus :", new Date(myBus.next.time).getHours());
        console.log(myBus);
        var nextTime = `${new Date(myBus.next.time).getHours()}:${new Date(myBus.next.time).getMinutes()}:${new Date(myBus.next.time).getSeconds()}`
        setArrival(nextTime);
        var minutes = Math.floor(myBus.next.duration_ms/60000);
        var minutes2 = Math.floor(myBus.next2.duration_ms/60000);
        
        setMinutes(minutes>1 ? minutes : 0);
        setMinutes2(minutes2>1 ? minutes2 : 0);
        //setArrival(Date(myBus.next.time).toLocaleTimeString("en-SG"));
        setLoading(false);
      });
  }

  let count = 1;
  useEffect(() => {
    const interval = setInterval(loadBusStopData, 5000);
    console.log("count=", count++);
    // return the function to run when unmounting
    return()=> clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text} >Bus Arrival Time : </Text>
      <Text style={styles.arrivalTime}>
        {loading ? <ActivityIndicator size="large" /> : arrival}
      </Text>
      <Text style={styles.arrivalTime}>
        {minutes} minutes
      </Text>
      <Text style={styles.arrivalTime}>
        {minutes2} minutes
      </Text>
      <TouchableOpacity onPress={() => loadBusStopData()} style={styles.button}>
      <Text style={styles.buttonText}>Refresh</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  text: {
    color: "blue",
    fontWeight: "bold",
    fontSize: 30,
    padding: 10,
    margin: 10,

  },

  arrivalTime: {
    color: "yellow",
    fontWeight: "bold",
    fontSize: 30,
    padding: 10,
    margin: 10,
    backgroundColor: "brown",
  },
  button: {
    padding: 10,
    margin: 5,
  },
  buttonText: {
    borderRadius: 20,
    fontSize: 30,
    fontWeight: "bold",
    color: "blue",
    backgroundColor: 'orange',
    padding: 10,
    margin: 10,
  },
  submitButton: {
    backgroundColor: "orange",
  },
  cancelButton: {
    backgroundColor: "red",
  },

});
