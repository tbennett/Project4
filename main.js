fetch('https://dog.ceo/api/breeds/image/random')
  .then((response) => response.json())
  .then(data => {
    let img = data.message;
    displayDog(img);
    console.log(data)
  })
  .catch((error) => console.error(error));

//display the dog 
function displayDog(img) {
  const pic = `<img src="${img}">`;
  document.getElementById("dog").innerHTML = pic;
}

function fetchDogImage() {
  fetch('https://dog.ceo/api/breeds/image/random')
  .then((response) => response.json())
  .then(data => {
    let img = data.message;
    displayDog(img);
    console.log(data)
  })
}


//dog park map
var locations = [
  ["Baldwin Park", 37.98415, -122.02766],
  ["Ohlone Dog Park", 37.8735, -122.2743],
  ["Channel Street Dog Park", 37.8735, -122.2743],
  ["Osage Station Park", 37.8035, -121.9795],
  ["Newhall Dog Park", 37.9556, -121.9799],
  ["César E. Chávez Park", 37.8926, -122.3148],
  ["Mission Creek Dog Park", 37.7709, -122.3992],
  ["Iron Horse Park", 38.0176, -122.0522],
  ["Acton Parker Dog Park", 37.8602, -122.2826],
  ["SoMa West Dog Park", 37.7703, -122.4217],
  ["Oak Hill Park", 37.8442, -121.9863],
  ["Hap Magee Ranch Park", 37.8404, -122.0199]
];

var map = L.map('map').setView([37.8832, -122.0907], 13); 
mapLink =
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 11,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

for (var i = 0; i < locations.length; i++) {
  marker = new L.marker([locations[i][1], locations[i][2]])
    .bindPopup(locations[i][0])
    .addTo(map);
}
function zoomSelection(coordinates) {
  map.setView(coordinates, 12)
}
//creating dropdown element
document.addEventListener("DOMContentLoaded", init);

function init() {
  let parklocations = [];
  // get external json data and convert it into a JS arrays
  fetch("parklocations.json")
    .then((response) => response.json())
    .then((data) => {
      parklocations = data;
      // loop through the houses array and populate the
      // dropdown with the parklocation names and codes.

      parklocations.forEach((item) => {
        const option =
          document.createElement("OPTION");
        option.value = item.code;
        option.innerText = item.name;
        parklocation.appendChild(option);
      });
    })

    .catch((err) => {
      console.log("oops ", err.message);
    });

  // DOM ref to the select dropdown

  let parklocation =
    document.getElementById('parklocation');
  // display a list of the park location members
  // when the select list has changed.

  parklocation.addEventListener("change", (e) => {

    // Get a new dog photo
    const dogImage = document.getElementById('dog-img');
    fetchDogImage();

    //get the parklocation code from the select
    const code = e.target.value;
    console.log(code)
    //if selection = concord than 
    //setZoom on the coordinates for Baldwin
    if (code === "CC") {
      zoomSelection ([locations[0][1], locations[0][2]])
    } 
    if (code === "BK") {
      zoomSelection ([locations[5][1], locations[5][2]])
    } 
    if (code === "DV") {
      zoomSelection ([locations[11][1], locations[11][2]])
    } 
    if (code === "SF") {
      zoomSelection ([locations[6][1], locations[6][2]])
    } 
    let members = [];
    // loop through parklocation array
    // check for a matching parklocation code,
    // grab the members of that parklocation
    parklocations.forEach((item) => {
      if (item.code === code) {
        members = item.members;
      }
    });
    //DOM ref for ul to display members
    const container = document.getElementById("parks");

    // clear out any previous member names
    container.innerHTML = "";

    // handle if no house selected
    if (members.length === 0) {
      let item = document.createElement("LI");
      item.innerText = "No Park location Selected";
      container.appendChild(item);
    } else {
      // create the li's and append to the ul
      members.forEach((location) => {
        let item = document.createElement("LI");
        item.innerText = location;
        container.appendChild(item);
      });
    } // end if/else
  }); //end addEventListener - change
} // end init


