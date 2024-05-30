// import logo from './logo.svg';
import {useState} from 'react'
import './App.css';

function App() {
  const [latitude,setLatitude]=useState();
  const [longitude,setLongitude]=useState();
  const [gpslatitude,setGpsLatitude]=useState();
  const [gpslongitude,setGpsLongitude]=useState();
  const [userAdd,setUserAdd] = useState();
  const geo = navigator.geolocation
  // get current location
  geo.getCurrentPosition(userco)
  function userco(position){
    let userlat = position.coords.latitude;
    let userlon = position.coords.longitude;
    // console.log(userlat+" "+userlon)
    setLatitude(userlat);
    setLongitude(userlon);
  }

  const getUserAdd = async()=>{
    let url = `https://api.opencagedata.com/geocode/v1/json?key=92403a11e098446bab80a7080cacac55&q=${latitude}%2C+${longitude}&pretty=1&no_annotations=1`
    const loc = await fetch(url)
    const data = await loc.json();
    console.log(data)
    // console.log(data.results[0].components.state)
    setUserAdd(data.results[0].formatted)
  }
   // get gps current location
 const watchID = geo.watchPosition(usergpsco)
  function usergpsco(position){
    let usergpslat = position.coords.latitude;
    let usergpslon = position.coords.longitude;
    console.log(usergpslat+" "+usergpslon)
    setGpsLatitude(usergpslat);
    setGpsLongitude(usergpslon);
  }

  const handleGetAdd = ()=>{
    getUserAdd();
  }
const stopgps = ()=>{
  geo.clearWatch(watchID)
}

  return (
   <>
   <h1>current location</h1>
   <h2>latitude - {latitude}</h2>
   <h2>longitude - {longitude}</h2>
   <h2>user address - {userAdd}</h2>
   <button onClick={handleGetAdd}>Get user address</button>
   <hr></hr>
   <h1>GPS location</h1>
   <h2>GPS latitude - {gpslatitude}</h2>
   <h2>GPS longitude - {gpslongitude}</h2>
   {/* <button onClick={handleGetAdd}>Get user button</button> */}
   <button onClick={stopgps}>Stop gps tracker</button>
   </>
    
  );
}

export default App;
