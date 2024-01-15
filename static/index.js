


function Submit() {
	//Compare Password
	var entree = document.getElementById("Password").value;
	var verification = document.getElementById("verification").value;

	if(entree == verification) {
		console.log("Validé");
	}
	else
	{
		alert("veuillez vérifier vos mots de passe");
	}

	//Récuperer les données du formulaire
	var fullname = document.getElementById("Fullname").value;
	var email = document.getElementById("Email").value;
	var radioButtons = document.getElementsByName("gender");
	var selectedOption ="";

	if (radioButtons !== null && radioButtons.length > 0) {
		for (var i = 0; i < radioButtons.length; i++) {
			if (radioButtons[i].checked) {
				selectedOption = radioButtons[i].value;
				break; 
			}
		}
    } else {
        console.log("Aucun bouton radio trouvé ou la liste est vide.");
    }

	

	var t = [fullname , email,entree,selectedOption];
	var t_json = JSON.stringify(t);

	localStorage.setItem('userData' ,t_json);

	var storedData = localStorage.getItem('userData');
	var userData = JSON.parse(storedData);
	console.log(userData)
	
}


// const inputBox = document.getElementById("input-box");



function getEventUser() {
    const FullName = localStorage.getItem("username");
    const listBox = document.getElementById("list-tasks");

    fetch(`/event/${FullName}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`La requête a échoué avec le code ${response.status}`);
            }
            return response.json();
        })
        .then(jsonData => {			
            try {
				listBox.innerHTML = '';
                const parsedData = jsonData.data;

                // Le reste de votre code pour afficher les éléments dans la listBox
                parsedData.forEach(item => {
					console.log(item);
                    let li = document.createElement("li");
                    li.innerHTML = item.title;
					li.setAttribute("id", item.id)
                    listBox.appendChild(li);

                    let span = document.createElement("span");
                    span.innerHTML = "\u00d7";
                    span.addEventListener("click", function () {
						deleteTask(item.id);
                    });
                    li.appendChild(span);
                });
            } catch (error) {
                console.error('Erreur lors de l\'analyse des données JSON :', error.message);
            }
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des événements :', error.message);
        });
}



function addTask() {
	
	title = document.getElementById("input-box")
	const newEvent = {
		title : title.value,
		FullName : localStorage.getItem("username"),
	} 
	const requestOptions = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json' 
		  },
		
		body: JSON.stringify(newEvent) 
	  };
	  // Effectuer la requête Fetch
	fetch('/event', requestOptions)
		.then(response => {
		  if (!response.ok) {
			throw new Error(`La requête a échoué avec le code ${response.status}`);
		  }
		  return response.json(); 
		})
		.then(data => {
		  console.log('Evenement ajouté avec succès:', data);
		})
		.catch(error => {
		  console.error('Erreur lors de l\'ajout de l\'evenement :', error.message);
	});
	title.value = '';
	getEventUser();
}

async function deleteTask(id){
	title = document.getElementById("input-box")
	const Event = {
		eventId : id,
	} 
	FullName = localStorage.getItem("username");

	const requestOptions = {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json' 
		  },
		
		body: JSON.stringify(Event) 
	  };
	  // Effectuer la requête Fetch
	await fetch(`/event/${FullName}`, requestOptions)
		.then(response => {
		  if (!response.ok) {
			throw new Error(`La requête a échoué avec le code ${response.status}`);
		  }
		  return response.json(); 
		})
		.then(data => {
		  console.log('Evenement supprimé avec succès:', data);
		})
		.catch(error => {
		  console.error('Erreur lors de la supression de l\'evenement :', error.message);
	});
	getEventUser();

}

function addTaskOnDate() {
	title = document.getElementById("title");
	description = document.getElementById("description") ;
	date = document.getElementById('date');

	const newEvent = {
		title : title.value,
		FullName : localStorage.getItem("username"),
	}

	const requestOptions = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json' 
		  },
		
		body: JSON.stringify(newEvent) 
	  };

	  fetch('/eventOnDay', requestOptions)
		.then(response => {
		  if (!response.ok) {
			throw new Error(`La requête a échoué avec le code ${response.status}`);
		  }
		  return response.json(); 
		})
		.then(data => {
		  console.log('Evenement ajouté avec succès:', data);
		})
		.catch(error => {
		  console.error('Erreur lors de l\'ajout de l\'evenement :', error.message);
	});
	title.value = '';
	getEventUser();	// modifier pour calendar
}

document.addEventListener('DOMContentLoaded', function() {
    let listBox = document.getElementById('list-tasks');

    listBox.addEventListener("click", function(e) {
        if (e.target.tagName === "LI") {
            e.target.classList.toggle("checked");
			// saveData()
        } else if (e.target.tagName === "SPAN") {
            e.target.parentElement.remove();
			// saveData()
        }
    }, false);
});


document.addEventListener("DOMContentLoaded", function() {
    const calendar = document.querySelector(".Calendar");
    const date = document.querySelector(".Date");
    const daysContainer = document.querySelector(".Days");
    const prev = document.querySelector(".prev");
    const next = document.querySelector(".next");
    const todaybtn = document.querySelector(".today-btn");
    const gotobtn = document.querySelector(".goto-btn");
    const dateInput = document.querySelector(".date-input");


    let today = new Date();
    let activeDay;
    let month = today.getMonth();
    let year = today.getFullYear();

    const months = [
        "January", "February", "March", "April", "May", "June", "July",
        "August", "September", "October", "November", "December"
    ];

	const eventsArr = [
		{
			day:13,
			month:12,
			year:2023,
			events: [
				{
					title: "Event 1",
					time: "10:00 AM"
				},

				{
					title: "Event 2",
					time: "11:00 AM"
				}
			]
		}
	]

    function initiatCalendar() {
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const prevLastDay = new Date(year, month, 0);
        const prevDays = prevLastDay.getDate();
        const lastDate = lastDay.getDate();
        const startingDay = firstDay.getDay(); // Récupère le jour de la semaine du premier jour du mois (0 pour dimanche, 1 pour lundi, etc.)

        // update date on top of calendar
        date.innerHTML = months[month] + " " + year;
        // adding days on the DOM
        let days = "";
        let totalDaysDisplayed = 0;


        // prev month days
        for (let x = startingDay; x > 0; x--) {
            days += `<div class="day prev-date">${prevDays - x + 1}</div>`;
			totalDaysDisplayed++;
        }
        // current month days
        for (let i = 1; i <= lastDate ; i++) {
			//check if event present a current day 

			let event = false ;;
			eventsArr.forEach((eventObj) => {
				if (
					eventObj.day == i &&
					eventObj.month == month + 1 &&
					eventObj.year == year
				){
					event = true;
				}
			});

            if (i === new Date().getDate() &&
                year === new Date().getFullYear() &&
                month === new Date().getMonth()
            ) {
				if(event){
					days += `<div class="day today event">${i}</div>`;
				}
				else {
					days += `<div class="day today">${i}</div>`;
				}
            } else {
				if(event){
					days += `<div class="day event">${i}</div>`;
				}
				else {
					days += `<div class="day ">${i}</div>`;
				}
            }
            totalDaysDisplayed++;
        }

        // next month days to fill the last week
        const remainingDays = 35 - totalDaysDisplayed ;
        const nextMonth = (month + 1) % 12; // Month index for the next month
        const nextYear = month === 11 ? year + 1 : year; // Increment year if current month is December
        const daysInNextMonth = new Date(nextYear, nextMonth + 1, 0).getDate();
        for (let j = 1; j <= remainingDays && j <= daysInNextMonth; j++) {
            days += `<div class="day next-date">${j}</div>`;
        }

        daysContainer.innerHTML = days;
    }

    initiatCalendar();

    function prevMonth() {
        month--;
        if (month < 0) {
            month = 11;
            year--;
        }
        initiatCalendar();
    }

    function nextMonth() {
        month++;
        if (month > 11) {
            month = 0;
            year++;
        }
        initiatCalendar();
    }

    prev.addEventListener("click", prevMonth);
    next.addEventListener("click", nextMonth);

	todaybtn.addEventListener("click",()=> {
		today = new Date();
		month = today.getMonth();
		year = today.getFullYear();
	});
	
});

function toggleNoteInputs() {
    var addIcon = document.getElementById("addIcon");
    var hideIcon = document.getElementById("hideIcon");
    var noteInputs = document.getElementById("noteInputs");

    if (noteInputs.style.display === "none" || noteInputs.style.display === "") {
        noteInputs.style.display = "block";
        addIcon.style.display = "none";
        hideIcon.style.display = "inline-block"; 
    } else {
        noteInputs.style.display = "none";
        addIcon.style.display = "inline-block";
        hideIcon.style.display = "none";
    }
}

function addNote() {
    const title_note = document.getElementById("Title_note").value;
    const note_Content = document.getElementById("note_content").value;
    const list_notes = document.getElementById("notes");

    if (note_Content === '') {
        alert("You must write something!");
    } else {
        let li = document.createElement("li");
        let a = document.createElement("a");
        a.setAttribute("href", "#");
        let h2 = document.createElement("h2");
        h2.textContent = title_note; 
        let p = document.createElement("p");
        p.textContent = note_Content;
        a.appendChild(h2);
        a.appendChild(p);
        li.appendChild(a);

       
        li.ondblclick = function() {
			list_notes.removeChild(this);
		}

        list_notes.appendChild(li);
    }

    // Effacer les champs après l'ajout de la note
    document.getElementById("Title_note").value = "";
    document.getElementById("note_content").value = "";

    // saveData();
}

function getEventsForUser(userName) {
	fetch(`/events/${userName}`)
	  .then(response => {
		if (!response.ok) {
		  throw new Error('Erreur de réseau');
		}
		return response.json(); 
	  })
	  .then(data => {
		console.log(data); // Utilisez les données récupérées ici
	  })
	  .catch(error => {
		console.error('Erreur :', error);
	  });
  }

async function getUsername() {
	await fetch('/getUsername')
		.then(response => response.json())
		.then(data => {
			localStorage.setItem("username", data.username)
		})
		.catch(error => {
			console.error('Error:' , error);
	
		});

}

document.addEventListener('DOMContentLoaded' , async ()=>{
	await getUsername()
	username = localStorage.getItem("username");
	if(username) {
		const usernameDispaly = document.getElementById('Fullname');
		if(usernameDispaly) {
			usernameDispaly.textContent = `Welcome ${username} !`;
		}
	}
	getEventUser();
});
