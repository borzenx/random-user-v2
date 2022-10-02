//LISTA DOSTĘPNYCH KRAJÓW
const optionListNationality = document.getElementById('nationality').options;
const optionsNationality = [
    {
      text: 'Australia',
      value: 'au',
	    selected: true
    },
    {
      text: 'Brazil',
      value: 'br'
    },
    {
      text: 'Canada',
      value: 'ca'
    },
    {
      text: 'Switzerland',
      value: 'ch'
    },
    {
      text: 'Germany',
      value: 'de'
    },
    {
      text: 'Denmark',
      value: 'dk'
    },
    {
      text: 'Spain',
      value: 'es'
    },
    {
      text: 'Finland',
      value: 'fi'
    },
    {
      text: 'France',
      value: 'fr'
    },
    {
      text: 'United Kingdom',
      value: 'gb'
    },
    {
      text: 'Irleand',
      value: 'ie'
    },
    {
      text: 'Iran',
      value: 'ir'
    },
    {
      text: 'Mexico',
      value: 'mx'
    },
    {
      text: 'Netherlands',
      value: 'nl'
    },
    {
      text: 'Norway',
      value: 'no'
    },
    {
      text: 'New Zealand',
      value: 'nz'
    },
    {
      text: 'Serbia',
      value: 'rs'
    },
    {
      text: 'Turkey',
      value: 'tr'
    },
    {
      text: 'Ukraine',
      value: 'ua'
    },
    {
      text: 'United States',
      value: 'us'
    }
  ];
  
  optionsNationality.forEach(optionNationality);
	function optionNationality(option) {
    optionListNationality.add(new Option(option.text, option.value, option.selected))
  };

//LISTA DOSTĘPNYCH KRAJÓW
const optionListUserCount = document.getElementById('userCount').options;
const optionsUserCount = [
    {
      text: '5',
      value: '5',
	    selected: true
    },
    {
      text: '10',
      value: '10'
    },
    {
      text: '20',
      value: '20'
    },
    {
      text: '30',
      value: '30'
    }
  ];
  
  optionsUserCount.forEach(optionUserCount);
	function optionUserCount(option) {
    optionListUserCount.add(new Option(option.text, option.value, option.selected))
  };

//GŁÓWNA FUNKCJA PODPIĘTA POD PRZYCISK GENERUJĄCA LISTE UŻYTKOWNIKÓW

document.getElementById("generateButton").addEventListener("click", generate);
async function generate() {

	const userCount = document.querySelector("#userCount").value;
	const country = document.querySelector("#nationality")
	const text = country.options[country.selectedIndex].text;

	//FUNKCJA ODPOWIEDZIALNA ZA WYŚWIETLANIE NAZWY KRAJU Z TŁEM
	function displayBackground() {
		if (country.value != "") {
			document.querySelector(".userBackground").style.backgroundImage = "url('img/"+country.value+".webp')";
			document.querySelector(".countryName").innerHTML = text;
		}
	}
	//POZYSKIWANIE INFORMACJI Z API
	try{
		await fetch(`https://randomuser.me/api/?results=${userCount}&nat=${country.value}`)
		.then(response => response.json())
		.then(response => response.results)
		.then(displayUsers)
		.then(displayBackground)
	} catch{
		console.log(`error api fetching`);
	}
	
}

//FUNKCJA ODPOWIEDZIALNA ZA WYŚWIETLANIE POBRANYCH INFORMACJI Z API 
function displayUsers(userData) {

	let userHTML = ``;
	userData.forEach(user);
	function user(user, i){
		userHTML += `
    <div class="cardUser">
	    <div class="important-information">
	      <img src="${user.picture.large}" alt="${user.name.first} ${user.name.last}" class="cardImage" />
	      <p class="cardName">${user.name.first} ${user.name.last}</p>
	      <p class="cardAddress">${user.location.city},${user.location.country}</p>
	    </div>
      <br>
      <address>
        <p><span class="infoIcon material-symbols-outlined"> home </span> ${user.location.street.name}, ${user.location.street.number},</p>
        <p>${user.location.postcode} ${user.location.city}, ${user.location.state}, ${user.location.country}</p>
        <p><span class="infoIcon material-symbols-outlined"> mail </span> ${user.email}</p>
        <p><span class="infoIcon material-symbols-outlined"> call </span> ${user.phone}</p>
      </address>
    </div>`;
	  }
	  document.querySelector('.usersList').innerHTML = userHTML;
}