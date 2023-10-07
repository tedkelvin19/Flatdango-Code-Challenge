// add event to load movie list
document.addEventListener('DOMContentLoaded',() => {
    const mainMovieContainer = document.querySelector('main')
    const movielist = document.getElementById('films')
    
    // fetch beer list from server 
    fetch('http://localhost:3000/films')
    .then(resp => resp.json())
    .then(movieData => {
        movielist.innerHTML = ""
        movieData.forEach(item => {
            createDOM(item)
        })
    })
    function createDOM(movieDataItem){
        let movie = document.createElement("li")
        movie.addEventListener('click',function(){
            displayMovieInfo(movieDataItem)
        })
        movie.innerText = movieDataItem.title
        movielist.appendChild(movie)
    }
    // fetch movie function by id
    function fetchMovie(id){
        if(typeof(id)!== 'number') id = parseInt(id)
        fetch(`http://localhost:3000/films/${id}`)
    .then(response => response.json())
    .then(movie => {
        displayMovieInfo(movie)
    })
    }
    // call the function to display the first movie on list
    fetchMovie(1)

    // display movie info function
    function displayMovieInfo(movie){
       //calculate available ticktes
       let tickects = movie.capacity - movie.tickets_sold
    // set main equal to a empty     
        mainMovieContainer.innerHTML= ""
    // create div to hold movie details
        const movieContainer =document.createElement('div')
        movieContainer.setAttribute("class","movie-details")
    // movie details to be child of movie container
    const detailHTML = `
    <h2 id="movie-name"> ${movie.title}</h2>
    <h3 id="movie-runtime">Runtime: ${movie.runtime} Minutes</h3>
    <img src="${movie.poster}" id="movie-image">
    <p id="show-time">Showtime: ${movie.showtime}</p>
    <p id="tickets-sold">Sold Tickets: ${movie.tickets_sold}</p>
    <p id="capacity">Capacity: ${movie.capacity}</p>
    <p id="tickects"><span>Available Tickects: ${tickects}</span></p>
    <p><span style = "font-weight:bold; text-decoration:underline;">Description</span><br><em id="movie-description">${movie.description}</em></p>
    <button id="btn">Buy Ticket</button>
    <footer>
        <p>Created By: <a href="">Ted Kelvin Mutwiri</a></p>
    </footer>
    `
    movieContainer.innerHTML = detailHTML
    // append movie container to mainmoviecontainer
    mainMovieContainer.appendChild(movieContainer)
    // click event to buy tickets
    document.getElementById('btn').addEventListener('click',(e)=>{
        if(tickects!==0){
            tickects--
            movieContainer.querySelector('span').textContent = `Available Tickects: ${tickects}`
        } else {
            movieContainer.querySelector('span').textContent = "Tickets Sold Out"
            
        }
    })    
    }
   
})

