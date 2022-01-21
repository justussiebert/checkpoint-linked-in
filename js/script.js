const url = "https://dummy-apis.netlify.app/api/contact-suggestions";
let countContacts = 8;
const containerContacts = document.querySelector(
  "#container-contact-suggestions"
);

function getAllContactSuggestions(numberContacts) {
  const allContactsFromApi = fetch(url + "?count=" + numberContacts)
    .then((response) => {
      console.log(response.status);
      console.log(response.ok);
      if (response.ok) {
        return response.json();
      }
    })
    .then((dataComplete) => {
      console.log(dataComplete);
      const containerContacts = document.querySelector(
        "#container-contact-suggestions"
      );
      for (let i = 0; i < dataComplete.length; i++) {
        console.log("Last Name: ", dataComplete[i].name.last);
        const contactComplete = document.createElement("article");

        // Portrait:
        const contactPortraitContainer = document.createElement("picture");
        const contactPortraitImage = document.createElement("img");
        contactPortraitImage.src = dataComplete[i].picture;
        contactPortraitImage.alt = dataComplete[i].name.last;
        contactPortraitContainer.appendChild(contactPortraitImage);
        contactComplete.appendChild(contactPortraitContainer);

        // Name:
        const contactTitle = document.createElement("h2");
        const contactNameComplete =
          dataComplete[i].name.title +
          " " +
          dataComplete[i].name.first +
          " " +
          dataComplete[i].name.last;

        contactTitle.innerText = contactNameComplete;
        //contactTitle.appendChild(contactNameComplete);
        contactComplete.appendChild(contactTitle);

        // Function:
        const contactFunction = document.createElement("h3");
        contactFunction.innerText = dataComplete[i].title;
        contactComplete.appendChild(contactFunction);

        // Mutual connections:
        const contactMutConnections = document.createElement("p");
        contactMutConnections.classList.add("paragraphConnections");
        contactMutConnections.innerText =
          dataComplete[i].mutualConnections + " mutual connections";
        contactComplete.appendChild(contactMutConnections);

        // Button connect:
        const contactButtonConnect = document.createElement("button");
        contactButtonConnect.classList.add("btnConnect");
        contactButtonConnect.innerText = "connect";
        contactComplete.appendChild(contactButtonConnect);

        // Button remove:
        const contactButtonRemove = document.createElement("button");
        contactButtonRemove.classList.add("btnRemove");
        contactComplete.appendChild(contactButtonRemove);

        // Background-image:
        if (dataComplete[i].backgroundImage.length > 0) {
          contactComplete.style.backgroundImage =
            "url(" + dataComplete[i].backgroundImage + ")";
        }

        // zum Schluss: alles der Liste zufügen als article
        containerContacts.appendChild(contactComplete);
      }
    });
  //console.log();
}
getAllContactSuggestions(countContacts);
