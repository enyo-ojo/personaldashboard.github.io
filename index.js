getImage()
getCrypto()
//getting the time
function getTime(params) {
  document.getElementById('time').innerHTML = new Date().toLocaleTimeString()
}
setInterval(getTime, 10000)

//GET IMAGE FROM UNSPLASH
function getImage(params) {
    fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature")
          .then(res => res.json())
          .then(data =>{
            //display image on browser as background
            document.body.style.backgroundImage = `url(${data.urls.full})`
            //display image author
           console.log(data)
           document.getElementById('author').textContent = `By :  ${data.user.name}`
          })
          .catch(err => {
            document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1544084944-15269ec7b5a0?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NTE2NzM0MTA&ixlib=rb-1.2.1&q=85)`           })
}

//get crypto info here
function getCrypto(params) {
  fetch('https://api.coingecko.com/api/v3/coins/bitcoin')
       .then(res =>{
        if (!res.ok) {
          throw Error(`Something went wrong 😓,
           check back later`)
        } 
       return res.json()
      })
       .then(data => { 
        document.getElementById('crypto-top').innerHTML = `
        <img src=${data.image.small}/>
        <span> ${data.name}</span>
        `
        document.getElementById('prices').innerHTML = `
        <p>🎯: $${data.market_data.current_price.usd}</p>
        <p>👆: $${data.market_data.high_24h.usd}</p>
        <p>👇: $${data.market_data.low_24h.usd}</p>
        `
        console.log(data)
      })
       .catch(err => console.error(err)) 
  
}
//GETS LOCATION/WEATHER 
navigator.geolocation.getCurrentPosition(position => {
  fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=imperial`)
       .then(res => {
         if (!res.ok) {
           throw Error(`Something went wrong 😓,
           check back later`)
         }
         return res.json()
       })
       .then(data =>{
         //getting and displaying the weather icon, temperature and city
          const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
          document.getElementById('weather').innerHTML = `
          <img src=${iconUrl} />
         <p class="temp">${Math.round(data.main.temp)}º</p>
         <p class="city">${data.name}</p>
          `
          //displaying the temperature and city
         
         console.log(data)
       })
       .catch(err => console.error(err)) 
});

