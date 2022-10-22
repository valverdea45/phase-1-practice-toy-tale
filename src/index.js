let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  fetch("http://localhost:3000/toys")
  .then((res) => res.json())
  .then((allToys) => {
    console.log("all toys are loaded")
    for(const singleToy of allToys){
      createToyCard(singleToy)
      console.log(singleToy)
    }
  })

  function createToyCard(singleToy){
    const singleCard = document.createElement("div")
      const toyContainer = document.querySelector("#toy-collection")
      const nameOfToyOnCard = document.createElement("h2")
      const likesOnCard = document.createElement("p")
      const btnOnCard = document.createElement("button")
      const imgOnCard = document.createElement("img")

      singleCard.classList.add("card")
      singleCard.appendChild(nameOfToyOnCard)
      singleCard.appendChild(imgOnCard)
      singleCard.appendChild(likesOnCard)
      singleCard.appendChild(btnOnCard)

      toyContainer.appendChild(singleCard)
      
      nameOfToyOnCard.innerHTML = singleToy.name
      
      likesOnCard.innerHTML = `${singleToy.likes} like(s)`

      imgOnCard.setAttribute("src", singleToy.image)
      imgOnCard.classList.add("toy-avatar")
      
      btnOnCard.classList.add("like-btn")
      btnOnCard.setAttribute("id", singleToy.id)
      btnOnCard.innerHTML = "Like ❤️"
      btnOnCard.addEventListener("click", () => {
        singleToy.likes += 1
        likesOnCard.innerHTML = `${singleToy.likes} like(s)`
        updateLikes(singleToy)
      })
  }

  const formNodeHTMLCollection = document.getElementsByTagName("form")
  const trueFormNode = formNodeHTMLCollection[0]

  
  trueFormNode.addEventListener("submit", (e) => {
    e.preventDefault()
    const objToBeSent = {
      name: e.target[0].value,
      image: e.target[1].value,
      likes: 0
    }

    fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },

      body: JSON.stringify(objToBeSent)
    })
    .then(res => res.json())
    .then(toy => createToyCard(toy))
  })
  function updateLikes(singleToy) {
    fetch(`http://localhost:3000/toys/${singleToy.id}`,{
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        "likes" : singleToy.likes
      })
    })
    .then(res => res.json())
    .then(toy => console.log(toy))
  }
});
