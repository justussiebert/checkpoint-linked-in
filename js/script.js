const url = "https://dummy-apis.netlify.app/api/contact-suggestions";
const countContacts = 8;
let numberIdOfNewContact = 0;
let countPendingInvitations = 0;
const paragraphPendingInvitations = document.querySelector(
  "#paragraph-count-invitations"
);
const containerContacts = document.querySelector(
  "#container-contact-suggestions"
);

function getAllContactSuggestionsAndCreateCard(numberContacts) {
  const allContactsFromApi = fetch(url + "?count=" + numberContacts)
    .then((response) => {
      //console.log(response.status);
      //console.log(response.ok);
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
        //console.log("Last Name: ", dataComplete[i].name.last);
        const contactComplete = document.createElement("article");
        const newId = i + numberIdOfNewContact;
        contactComplete.setAttribute("id", "card-id-" + newId);

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
        contactComplete.appendChild(contactTitle);

        // Function / Profession:
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
        contactButtonConnect.setAttribute("id", "button-connect-" + newId);
        contactButtonConnect.setAttribute("value", "isPending");
        contactButtonConnect.innerText = "connect";
        contactComplete.appendChild(contactButtonConnect);
        //console.log(contactButtonConnect.id);
        contactButtonConnect.addEventListener("click", function (e) {
          console.log(e.target.value);
          if (e.target.value === "isPending") {
            e.target.value = "isConnected";
            contactButtonConnect.innerText = "pending";
            contactButtonConnect.classList.add("btnConnectActive");
            countPendingInvitations++;
          } else {
            e.target.value = "isPending";
            contactButtonConnect.innerText = "Connect";
            contactButtonConnect.classList.remove("btnConnectActive");
            countPendingInvitations--;
          }
          paragraphPendingInvitations.innerText =
            countPendingInvitations + " pending invitations";
        });

        // Button remove:
        const contactButtonRemove = document.createElement("button");
        contactButtonRemove.classList.add("btnRemove");
        contactButtonRemove.setAttribute("value", "card-id-" + newId);
        contactButtonRemove.addEventListener("click", function (e) {
          removeThisCard(e.target.value);
        });
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
}

function removeThisCard(cardId) {
  numberIdOfNewContact = countContacts + 1;
  let cardTobeRemoved = document.getElementById(cardId);
  cardTobeRemoved.remove();
  getAllContactSuggestionsAndCreateCard(1);
}

getAllContactSuggestionsAndCreateCard(countContacts);
