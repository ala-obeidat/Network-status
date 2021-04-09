




const speedDisplay = document.getElementById("speed");
const statusDisplay = document.getElementById("status");

const checkSlowConnection =  (seconds) => {  
    
	let speed="Excellent";
	if(seconds > 1 && seconds < 3)
		speed= "Good";
	if(seconds > 3 && seconds < 5)
		speed= "Poor";
	if(seconds > 5 && seconds < 10)
		speed= "Slow";
	if(seconds > 10)
		speed= "Very Slow"; 
	if(seconds < 0)
		speed= "No"; 
	speedDisplay.textContent = speed + ' Connection';
}

const checkOnlineStatus = async () => {
  try {
  let countDownDate = new Date().getTime();
    const online = await fetch("http://1x1px.me/FF4D00-0.8.png",{mode: "no-cors"});
	let newDate = new Date().getTime();
	 let distance = newDate - countDownDate;
	 let seconds = Math.floor((distance % (1000 * 60)) / 1000);
	 checkSlowConnection(seconds);
    return online.status ==0;
  } catch (err) {
  checkSlowConnection(-1);
    return false; // definitely offline
  }
};
const SetStatusDisplayContet = async () => {
statusDisplay.textContent = await checkOnlineStatus() ? "Online" : "OFFline";
}
setInterval(async () => { 
  await SetStatusDisplayContet();
}, 3000); 

// forgot to include async load event listener in the video! 
window.addEventListener("load", async (event) => { 
  await SetStatusDisplayContet();
});
