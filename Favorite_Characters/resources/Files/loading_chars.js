const load_chars = () => {
  let container = document.getElementById("Oyaji");
  fetch("./characters.json")
    .then((results) => results.json())
    .then((characters) =>
      characters.map((character) => {
        //Tags Creation and classes attributing:
        var card = document.createElement("div");
        card.className = "cards";
        var cardItem = document.createElement("div");
        cardItem.className = "card-item";
        var cardImage = document.createElement("img");
        cardImage.className = "card-image";
        var cardInfo = document.createElement("div");
        cardInfo.className = "card-info";
        var cardTitle = document.createElement("h2");
        cardTitle.className = "card-title";
        var cardIntro = document.createElement("p");
        cardIntro.className = "card-intro";

        //Using our fitched data:
        cardImage.setAttribute("src", character.photo);
        cardTitle.innerText = character.name;
        cardIntro.innerText = character.characteristics;

        //Link'em all together:
        container.appendChild(card);
        card.appendChild(cardItem);
        cardItem.appendChild(cardImage);
        cardItem.appendChild(cardInfo);
        cardInfo.appendChild(cardTitle);
        cardInfo.appendChild(cardIntro);
      })
    );
};

