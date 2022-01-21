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
        //const contactNameComplete = "Müller";
        contactTitle.innerText = contactNameComplete;
        //contactTitle.appendChild(contactNameComplete);
        contactComplete.appendChild(contactTitle);

        // Function:

        // zum Schluss: alles der Liste zufügen als article
        containerContacts.appendChild(contactComplete);
      }
    });
  //console.log();
}
getAllContactSuggestions(countContacts);
