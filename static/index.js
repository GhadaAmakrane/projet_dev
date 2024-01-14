
// cacher le menu 


// document.addEventListener('DOMContentLoaded',function() {
// 	const logoIcon = document.querySelector('.sidebar_menu .logo i');
// 	const menu = document.querySelector('.sidebar_menu .menu');

// 	let menuVisible = true; // Variable pour suivre l'état actuel du menu

//   if (logoIcon && menu) {
//     logoIcon.addEventListener('click', function() {
//       if (menuVisible) {
//         menu.style.display = 'none'; // Rend le menu invisible
//       } else {
//         menu.style.display = 'block'; // Rend le menu visible
//       }
//       menuVisible = !menuVisible; // Inverse l'état du menu (visible/invisible)
//     });
//   } else {
//     console.log("Les éléments n'ont pas été trouvés.");
//   }
// });

//comaprer les password entrés 

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


const inputBox = document.getElementById("input-box");


function addTask() {
	
	// const inputBox = document.getElementById("input-box");
	// const listBox = document.getElementById("list-tasks");
	// if(inputBox.value === ''){
	// 	alert("You must write something!");
	// }
	// else{
	// 	let li = document.createElement("li");
	// 	li.innerHTML = inputBox.value;
	// 	listBox.appendChild(li);
	// 	let span = document.createElement("span");
	// 	span.innerHTML = "\u00d7";
	// 	li.appendChild(span);
	// }
	// inputBox.value="";
	// saveData();
	const newEvent = {
		eventName : document.getElementById("input-box").value,
		utilisateur : document.getElementById("Fullname").textContent,
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
		  console.log('Tag ajouté avec succès:', data);
		})
		.catch(error => {
		  console.error('Erreur lors de l\'ajout du tag:', error.message);
	});
}

document.addEventListener('DOMContentLoaded', function() {
    let listBox = document.getElementById('list-tasks');

    listBox.addEventListener("click", function(e) {
        if (e.target.tagName === "LI") {
            e.target.classList.toggle("checked");
			saveData()
        } else if (e.target.tagName === "SPAN") {
            e.target.parentElement.remove();
			saveData()
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

	dateInput.addEventListener("keyup",(e)=> {
		dateInput.value = dateInput.value.reaplce(/[^0-9]/g,"");
		if(dateInput.value.length ==2){
			dateInput.value += "/";
		}
		if(dateInput.value.length > 7){
			dateInput.value = dateInput.value.slice(0,7);
		}
		if(e.inputType =="deleteContentBackward") {
			if(dateInput.value.length ==3) {
				dateInput.value = dateInput.value.slice(0,2);
			}
		}
	});

	gotobtn.addEventListener("click",gotoDate);

	function gotoDate() {
		const dateArr = dateInput.value.split("/");
		if(dateArr.length ==2) {
			if(dateArr[0]>0 && dateArr[0] <13 && dateArr[1].length == 4) {
				month == dateArr[0]-1;
				year = dateArr[1];
				initiatCalendar();
				return;
			}
		}
		alert("Invalid date");
	}

	const addEventBtn = document.querySelector(".Add-event");
	const addEventContainer = document.querySelector("add-event-wrapper");
	const addEventColoseBtn = document.querySelector(".close");
	const addEventTitle = document.querySelector(".event-name");
	const addEventForm = document.querySelector(".event-time-from");
	const addEventTo = document.querySelector(".event-time-to");

	addEventBtn.addEventListener("click",()=> {
		addEventContainer.classList.toggle("active");
	});

	addEventColoseBtn.addEventListener("click",()=> {
		addEventContainer.classList.remove("active");
	});

	document.addEventListener("click",(e) => {
		if(e.target !== addEventBtn && !addEventContainer.contains(e.target)) {
			addEventContainer.classList.remove("active");
		}
	});

	addEventForm.addEventListener("input" , (e) => {
		addEventTitle.value = addEventTitle.value.slice(0,50);
	});


	addEventForm.addEventListener("input" , (e) => {
		addEventForm.value = addEventForm.value.reaplce(/[^0-9:]/g, "");
		if(addEventForm.value.length ===2) {
			addEventForm.value += ":"
		}
		if(addEventForm.value.length > 5){
			addEventForm.value = addEventForm.value.slice(0,5);
		}

	});

	addEventTo.addEventListener("input" , (e) => {
		addEventTo.value = addEventTo.value.reaplce(/[^0-9:]/g, "");
		if(addEventTo.value.length ===2) {
			addEventTo.value += ":"
		}
		if(addEventTo.value.length > 5){
			addEventTo.value = addEventTo.value.slice(0,5);
		}

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

document.addEventListener('DOMContentLoaded' , ()=>{
	fetch('/getUsername')
		.then(response => response.json())
		.then(data => {
			const username = data.username;
			if(username) {
				const usernameDispaly = document.getElementById('Fullname');
				if(usernameDispaly) {
					usernameDispaly.textContent = `${username}`;
				}
			}
		})
		.catch(error => {
			console.error('Error:' , error);
});

});
