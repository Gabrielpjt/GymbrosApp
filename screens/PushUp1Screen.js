import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Button } from 'react-native';
import Navbar from '../components/ui/Navbar';
import { OneReportsContext } from '../contexts/OneReportContext';
import { UserContext } from '../contexts/UsersContext';
import { useIsFocused } from '@react-navigation/native';


function PushUp1Screen({ navigation }) {
  const isFocused = useIsFocused();
  const {user} = useContext(UserContext);
  const [repetisi, setRepetisi] = useState(0);
  const [targetRep, setTargetRep] = useState(10);
  const [tempTarget, setTempTarget] = useState(10);
  const [age,setAge] = useState(0);
  const [bpm, setBpm] = useState(0);
  const [ws, setWs] = useState(null);
  const { onereports, setOneReports } = useContext(OneReportsContext);
  const [maxHeartrate, setMaxHeartrate] = useState(0);
  const [status, setStatus] = useState(false); // Udah mulai latihan belom
  const [finished, setFinished] = useState(false); // Selesai latihan atau tidak
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    async function getAge() {
      try {
        const response = await fetch('https://gymbrosbeapp-production-b2f2.up.railway.app/api/users/' + user.username, {
          method: 'GET'
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const identity = await response.json();
        console.log("Data fetched successfully");
        setAge(identity.age)
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    }
    if (isFocused) {
      getAge();
    }
  }, [user.username,isFocused]);

  useEffect(() => {
    setOneReports((prevReports) => ({ ...prevReports, latihan1: repetisi }));
  }, [repetisi]);

  useEffect(() => {
    let websocket;

    if (ws) {
      websocket = ws;

      websocket.onopen = () => {
        console.log('WebSocket connection opened');
      };

      websocket.onmessage = (event) => {
        console.log('WebSocket message received:', event.data);
        const data = JSON.parse(event.data);
        setLoading(false)
        setRepetisi(data.repetitions);
        setBpm(data.bpm);
      };

      websocket.onerror = (error) => {
        console.error('WebSocket error:', error);
      };

      websocket.onclose = () => {
        console.log('WebSocket connection closed');
      };
    }

    return () => {
      if (websocket) {
        websocket.close();
      }
    };
  }, [ws]);

  useEffect(() => {
    if (bpm > maxHeartrate) {
      setMaxHeartrate(bpm);
    }
  }, [bpm]);

  useEffect(() => {
    if (repetisi >= targetRep) {
      setFinished(true);
      setStatus(false);
      if (ws) {
        ws.close();
        setWs(null);
      }
    }
  }, [repetisi, targetRep, ws]);

  const handleConnect = () => {
    console.log('Connecting to WebSocket...');
    setTargetRep(tempTarget)
    setWs(new WebSocket('ws://192.168.207.44:81'));
    setStatus(true);
  };

  const handleClose = () => {
    if (ws) {
      ws.close();
      setWs(null);
      setStatus(false);
      setRepetisi(0);
      setFinished(true);
      console.log("Websocket connection closed!");
    }
  };

  const handlePrev = () => {
    if (ws){
      ws.close();
      setWs(null);
    }
    navigation.goBack();
  };

  const handleNext = () => {
    console.log(onereports);
    navigation.navigate('Push Up Kaki Ditekuk');
  };

  const incrementtempTarget = () => {
    setTempTarget(tempTarget + 1);
  };

  const decrementtempTarget = () => {
    if (tempTarget > 0) {
      setTempTarget(tempTarget - 1);
    }
  };

  useEffect(() => {
    console.log(`Repetisi: ${repetisi}, TargetRep: ${targetRep}`);
  }, [repetisi, targetRep]);

  if(finished) {
    return(
      <View style={styles.container}>
      <View style={styles.content}>
        <Image source={require('../assets/Push-up1.gif')} style={styles.gif} resizeMode="contain" />
          <Text style={styles.finishedText}>You have finished your workout!</Text>
        </View>
          <View style={styles.navButtonContainer}>
          <TouchableOpacity style={styles.navButton} onPress={handlePrev}>
            <Text style={styles.navButtonText}>Sebelumnya</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navButton} onPress={handleNext}>
            <Text style={styles.navButtonText}>Selanjutnya</Text>
          </TouchableOpacity>
        </View>
        <Navbar navigation={navigation} />
      </View>
    )
  } else if (!finished && status && !loading) {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <Image source={require('../assets/Push-up1.gif')} style={styles.gif} resizeMode="contain" /><Text style={styles.description}>Target Pushup: {targetRep}</Text>
            <Text style={styles.repetisi}>Repetisi yang dilakukan: {repetisi}</Text>
            {bpm > (220-age) && (
              <Text style={{color: "red", fontWeight: "bold", fontSize: 24}}>Warning High Heart Rate!</Text>
            )}
            <Text style={styles.bpm}>BPM: {bpm}</Text>
            <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
            <Text style={styles.closeButtonText}>Stop Workout</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.navButtonContainer}>
        <TouchableOpacity style={styles.navButton} onPress={handlePrev}>
          <Text style={styles.navButtonText}>Sebelumnya</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={handleNext}>
          <Text style={styles.navButtonText}>Selanjutnya</Text>
        </TouchableOpacity>
      </View>
      <Navbar navigation={navigation} />
      </View>
    )
  } else if (status && loading && !finished) {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
        <Image source={require('../assets/Push-up1.gif')} style={styles.gif} resizeMode="contain" /><Text style={styles.description}>Target Pushup: {targetRep}</Text>
          <Text style={{color: "white"}}>Loading....</Text>
        </View>
        <View style={styles.navButtonContainer}>
        <TouchableOpacity style={styles.navButton} onPress={handlePrev}>
          <Text style={styles.navButtonText}>Sebelumnya</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={handleNext}>
          <Text style={styles.navButtonText}>Selanjutnya</Text>
        </TouchableOpacity>
      </View>
      <Navbar navigation={navigation} />
      </View>
    )
  } else if (!status) {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <Image source={require('../assets/Push-up1.gif')} style={styles.gif} resizeMode="contain" />
          <View>
              <Text style={{textAlign: "center", marginBottom: 12, fontWeight: "bold", fontSize: 24, color: "white"}}>Target Pushup </Text>
              <View style={styles.targetContainer}>
                <Button title="-" onPress={decrementtempTarget} />
                <Text style={styles.description}>{tempTarget}</Text>
                <Button title="+" onPress={incrementtempTarget}/>
              </View>
              <TouchableOpacity style={styles.connectButton} onPress={handleConnect}>
                <Text style={styles.connectButtonText}>Start Workout!</Text>
              </TouchableOpacity>
            </View>
        </View>
        <View style={styles.navButtonContainer}>
          <TouchableOpacity style={styles.navButton} onPress={handlePrev}>
            <Text style={styles.navButtonText}>Sebelumnya</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navButton} onPress={handleNext}>
            <Text style={styles.navButtonText}>Selanjutnya</Text>
          </TouchableOpacity>
        </View>
        <Navbar navigation={navigation} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  gif: {
    width: '90%',
    height: 300,
    marginBottom: 20,
  },
  description: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
    color: "white",
  },
  repetisi: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: "white",
  },
  bpm: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: "white"
  },
  connectButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    backgroundColor: '#28a745',
    marginBottom: 20,
    alignItems: 'center',
  },
  connectButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  closeButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    backgroundColor: '#dc3545',
    marginBottom: 20,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  finishedText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#28a745',
    marginBottom: 20,
    textAlign: 'center',
  },
  navButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#000',
  },
  navButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    backgroundColor: '#FFD700',
  },
  navButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
  targetContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 20,
  },
});

export default PushUp1Screen;
