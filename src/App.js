import React, { useEffect, useRef } from "react";
import "./App.css"

function App () {
  let  imageWidth = 2048;
  let  imageHeight = 1364;
  let  imageAspectRatio = imageWidth / imageHeight;
   

  let hotSpots = [
  {
  'title': 'Mouth',
  'description': 'scream.',
  'x': -600,
  'y': -180
  },
  {
  'title': 'Body',
  'description': 'Look at it.',
  'x': 108,
  'y': 20
  },
  {
  'title': 'Antlers',
  'description': 'They crazy.',
  'x': 40,
  'y': -170
  },
  {
  'title': 'This Ear',
  'description': 'It can hear things.',
  'x': -265,
  'y': 145
    }
  ];




  
  function positionHotSpots() {
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;
    let windowAspectRatio = windowWidth / windowHeight;
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

      hotspot.style.marginTop =  `${yPos}%`;
      hotspot.style.marginLeft = `${xPos}%`;
      
     })   
  }
  


  function handleHotSpotMouseover (e,index) {

    let currentHotSpot = e.target;
    let currentIndex = index;
    let speechBubble = speechBubbleRef.current
    let title = hotSpots[currentIndex]['title'];
    let description = hotSpots[currentIndex]['description'];
    let hotSpotTop = currentHotSpot.offsetTop;
    let hotSpotLeft = currentHotSpot.offsetLeft;
    let hotSpotHalfSize = currentHotSpot.clientWidth / 2;
    let speechBubbleHalfSize = speechBubble.clientWidth / 2;
    let topTarget = hotSpotTop - speechBubble.clientHeight;
    let leftTarget = (hotSpotLeft - (speechBubbleHalfSize)) + hotSpotHalfSize;
  

    while (speechBubble.firstChild) {
      speechBubble.removeChild(speechBubble.firstChild);
    };

    const titleHeader = document.createElement('h1');
    const desc = document.createElement('p');
    titleHeader.innerText = title;
    desc.innerText = description;
    speechBubble.append(titleHeader);
    speechBubble.append(desc);
 

    speechBubble.style.top = topTarget - 120 + "px";
    speechBubble.style.left = leftTarget - 85 + 'px';
    speechBubble.style.display = 'block';
    speechBubble.style.opacity = 1;   
}
  
   
  function handleHotSpotMouseout(){
  let speechBubble = document.querySelector(".speech-bubble");
      speechBubble.style.opacity = 0
      speechBubble.style.display = "none";
  
}
  

  const items = Array.from(hotSpots.length, a => React.createRef(null));
  const speechBubbleRef = useRef(null)


 useEffect(() => {
    positionHotSpots()
  
    window.addEventListener("resize", positionHotSpots);
    return () => {
      window.removeEventListener("resize", positionHotSpots)
      }
 }, []);
  

  return (
    <div  className='container'>
      { hotSpots.map((h, index) => <div ref={ items[index]}   onMouseEnter={(e) =>handleHotSpotMouseover(e, index)} onMouseLeave={handleHotSpotMouseout} key={index} className={`hot-spot ${index}`}  />)}
      <div className="speech-bubble" ref={speechBubbleRef} />
    </div>
 
  );
}

export default App;
