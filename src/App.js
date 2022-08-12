

import { useEffect } from "react";
import "./App.css"

function App () {
  let imageWidth = 2048;
  let  imageHeight = 1364;
  let  imageAspectRatio = imageWidth / imageHeight;
   

let hotSpots = [{
  'title': 'Mouth',
  'description': 'scream.',
  'x': -600,
  'y': -180
}, {
  'title': 'Body',
  'description': 'Look at it.',
  'x': 108,
  'y': 20
}, {
  'title': 'Antlers',
  'description': 'They crazy.',
  'x': 40,
  'y': -170
}, {
  'title': 'This Ear',
  'description': 'It can hear things.',
  'x': -265,
  'y': 145
}];




  
  function positionHotSpots() {
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;
    let  windowAspectRatio = windowWidth / windowHeight;
    const hotSpot = document.querySelectorAll(".hot-spot");


    hotSpot.forEach((hotspot, index) => {
     
    let xPos = hotSpots[index].x;
    let yPos = hotSpots[index].y;


    if (windowAspectRatio > imageAspectRatio) {
      yPos = (yPos / imageHeight) * 100;
      xPos = (xPos / imageWidth) * 100;
    } else {
      yPos = ((yPos / (windowAspectRatio / imageAspectRatio)) / imageHeight) * 100;
      xPos = ((xPos / (windowAspectRatio / imageAspectRatio)) / imageWidth) * 100;
    }

      hotspot.style.marginTop = `${yPos}%`;
      hotspot.style.marginLeft = xPos + '%';
       
     } )
       
     
  }

  
   
  
  

 useEffect(() => {

         positionHotSpots()
  
        window.addEventListener("resize", positionHotSpots);
        return () => {
            window.removeEventListener("resize", positionHotSpots)
        }

       
    }, []);
  return (
    <div  className='container'>
      
      { hotSpots.map(h => <div className="hot-spot"  />)}
     
      </div>
 
  );
}

export default App;
