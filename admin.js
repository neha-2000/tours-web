let users;
let packages;
let bookings;
let logoutBtn = document.querySelector('#logout-btn');
window.onload = function () {
    // your code here
    document.getElementById('logout-btn').style.visibility = 'hidden';
    document.getElementById('profile-btn').style.visibility = 'hidden';
    document.getElementById('admin-btn').style.visibility = 'hidden';

    if (localStorage.getItem("user-cred") !== null || undefined) {
        document.getElementById('Register-btn').style.visibility = 'hidden';
        document.getElementById('login-btn').style.visibility = 'hidden';

        console.log(localStorage.getItem("user-cred"))
        let userCred = JSON.parse(localStorage.getItem("user-cred"));
        if (userCred.role == "Admin") {
            document.getElementById('admin-btn').style.visibility = 'visible';
        }

        document.getElementById('logout-btn').style.visibility = 'visible';
        document.getElementById('profile-btn').style.visibility = 'visible';
    }

    document.getElementById('users-screen').style.visibility = 'visible';
    document.getElementById('packages-screen').style.visibility = 'hidden';
    document.getElementById('bookings-screen').style.visibility = 'hidden';


    fetch("http://localhost:8080/api/users")
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Request failed with status code: " + response.status);
            }
        })
        .then(data => {
            users = data;
            setUserTable(data);
        })
        .catch(error => {
            console.error("Fetch error:", error);
        });
    reloadPackage();
    reloadBookings();
};

logoutBtn.addEventListener('click', () => {
    alert("logout")
    localStorage.removeItem("user-cred")
    document.getElementById('Register-btn').style.visibility = 'visible';
    document.getElementById('login-btn').style.visibility = 'visible';
    document.getElementById('logout-btn').style.visibility = 'hidden';
    
    window.location.href = "/#home"

})

function changeScreen(data) {
    if (data.id === "Users-btn") {
        screen = "USERS";
        document.getElementById('users-screen').style.visibility = 'visible';
        document.getElementById('packages-screen').style.visibility = 'hidden';
        document.getElementById('bookings-screen').style.visibility = 'hidden';
    }
    if (data.id === "packages-btn") {
        screen = "PACKAGES";
        document.getElementById('users-screen').style.visibility = 'hidden';
        document.getElementById('packages-screen').style.visibility = 'visible';
        document.getElementById('bookings-screen').style.visibility = 'hidden';
    }
    if (data.id === "bookings-btn") {
        screen = "BOOKINGS";
        document.getElementById('users-screen').style.visibility = 'hidden';
        document.getElementById('packages-screen').style.visibility = 'hidden';
        document.getElementById('bookings-screen').style.visibility = 'visible';
    };
}

function reloadPackage() {
    document.getElementById('users-screen').style.overflow = '0px';
        document.getElementById('packages-screen').style.overflow = '0px';
        document.getElementById('bookings-screen').style.overflow = '0px';
    fetch("http://localhost:8080/api/packages")
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Request failed with status code: " + response.status);
            }
        })
        .then(data => {
            console.log(data);
            packages = data;
            setPackagesTable(data);
            // setUserTable(data);
        })
        .catch(error => {
            console.error("Fetch error:", error);
        });
}

function reloadBookings(){
    fetch("http://localhost:8080/api/bookings")
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Request failed with status code: " + response.status);
            }
        })
        .then(data => {
            bookings = data;
            setBookingsTable(data);
        })
        .catch(error => {
            console.error("Fetch error:", error);
        });
}

function setUserTable(data) {
    let table = document.getElementById('myUserTable');
    for (let i = 0; i < data.length; i++) {
        let row = document.createElement('tr');
        let nameCell = document.createElement('td');
        let emailCell = document.createElement('td');
        let contactCell = document.createElement('td');

        nameCell.innerHTML = data[i].name;
        emailCell.innerHTML = data[i].email;
        contactCell.innerHTML = data[i].contact;

        row.appendChild(nameCell);
        row.appendChild(emailCell);
        row.appendChild(contactCell);

        table.appendChild(row);
    }
}

function setPackagesTable(data) {
    let table = document.getElementById('packageTable');
    for (let i = 0; i < data.length; i++) {
        let row = document.createElement('tr');
        let packageNameCell = document.createElement('td');
        let destinationCell = document.createElement('td');
        let durationCell = document.createElement('td');
        let priceCell = document.createElement('td');
        let descriptionCell = document.createElement('td');
        let imageCell = document.createElement('td');
        let buttonsCell = document.createElement('td');

        packageNameCell.innerHTML = data[i].packageName;
        destinationCell.innerHTML = data[i].destination;
        durationCell.innerHTML = data[i].duration;
        priceCell.innerHTML = data[i].price;
        descriptionCell.innerHTML = data[i].description;
        imageCell.innerHTML = `<img
        src="${data[i].image}"
        alt="Tropical Paradise"
        width="100"
        height="100"
      />`;

        row.appendChild(packageNameCell);
        row.appendChild(destinationCell);
        row.appendChild(durationCell);
        row.appendChild(priceCell);
        row.appendChild(descriptionCell);
        row.appendChild(imageCell);
        row.appendChild(buttonsCell);

        table.appendChild(row);
    }
}

function searchUserFunction() {
    let input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("myUserTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

function sortUserTable(n) {
    let table,
        rows,
        switching,
        i,
        x,
        y,
        shouldSwitch,
        dir,
        switchcount = 0;
    table = document.getElementById("myUserTable");
    switching = true;
    // Set the sorting direction to ascending
    dir = "asc";
    // Make a loop that will continue until no switching has been done:
    while (switching) {
        // Start by saying: no switching is done:
        switching = false;
        rows = table.getElementsByTagName("TR");
        /* Loop through all table rows (except the
  first, which contains table headers): */
        for (i = 1; i < rows.length - 1; i++) {
            // Start by saying there should be no switching:
            shouldSwitch = false;
            /* Get the two elements you want to compare,
      one from current row and one from the next: */
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];
            /* Check if the two rows should switch place,
      based on the direction, asc or desc: */
            if (dir === "asc") {
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    // If so, mark as a switch and break the loop:
                    shouldSwitch = true;
                    break;
                }
            } else if (dir === "desc") {
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    // If so, mark as a switch and break the loop:
                    shouldSwitch = true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            /* If a switch has been marked, make the switch
      and mark that a switch has been done: */
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            // Each time a switch is done, increase this count by 1:
            switchcount++;
        } else {
            /* If no switching has been done AND the direction is "asc",
      set the direction to "desc" and run the while loop again. */
            if (switchcount === 0 && dir === "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}

function searchPackageFunction() {
    console.log("running");
    let input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myPackageInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("packageTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

function sortPackageTable(n) {
    let table,
        rows,
        switching,
        i,
        x,
        y,
        shouldSwitch,
        dir,
        switchcount = 0;
    table = document.getElementById("packageTable");
    switching = true;
    dir = "asc";
    while (switching) {
        switching = false;
        rows = table.rows;
        for (i = 1; i < rows.length - 1; i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];
            if (dir == "asc") {
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            } else if (dir == "desc") {
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            switchcount++;
        } else {
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}

document
    .getElementById("addPackageButton")
    .addEventListener("click", function () {
        document.getElementById("addPackageForm").style.display = "block";
    });

document
    .getElementById("submitPackageButton")
    .addEventListener("click", function () {
        let packageName = document.getElementById("packageName").value;
        let destination = document.getElementById("destination").value;
        let duration = document.getElementById("duration").value;
        let price = document.getElementById("price").value;
        let description = document.getElementById("description").value;
        let image = document.getElementById("image").value;

        const data = {
            "packageName": packageName,
            "destination": destination,
            "duration": duration,
            "price": parseInt(price),
            "description": description,
            "image": image
        };

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };

        fetch('http://localhost:8080/api/packages', options)
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error("Request failed with status code: " + res.status);
                }
            })
            .then(data => {
                let table = document.getElementById("packageTable");
                let row = table.insertRow();
                let packageNameCell = row.insertCell(0);
                let destinationCell = row.insertCell(1);
                let durationCell = row.insertCell(2);
                let priceCell = row.insertCell(3);
                let descriptionCell = row.insertCell(4);
                let imageCell = row.insertCell(5);

                packageNameCell.innerHTML = packageName;
                destinationCell.innerHTML = destination;
                durationCell.innerHTML = duration;
                priceCell.innerHTML = price;
                descriptionCell.innerHTML = description;
                imageCell.innerHTML = `<img src="${image}" alt="${packageName}" width="100" height="100">`;
                document.getElementById("addForm").style.display = "none";

            })
            .catch(error => console.error(error));



    });

const packageTable = document.querySelector("#packageTable");

packageTable.addEventListener("click", function (event) {
    if (event.target.classList.contains("editBtn")) {
        // logic for editing a row goes here
    } else if (event.target.classList.contains("deleteBtn")) {
        // logic for deleting a row goes here
        console.log("deleteing", event.target.id);
        const url = `http://localhost:8080/api/packages/${event.target.id}`;

        const options = {
            method: 'DELETE',
        };

        fetch(url, options)
            .then(res => {
                if (res.ok) {
                    console.log(res);
                    return res.json();
                } else {
                    throw new Error("Request failed with status code: " + res.status);
                }
            })
            .then(data => {
                reloadPackage();
            })
            .catch(error => console.error(error));

    }
});


function searchBookingFunction() {
  // Declare variables
  console.log("running");
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("bookingSearchBar");
  filter = input.value.toUpperCase();
  table = document.getElementById("bookingsTable");
  tr = table.getElementsByTagName("tr");

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td");
    for (var j = 0; j < td.length; j++) {
      txtValue = td[j].textContent || td[j].innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
        break;
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

function sortBookingTable(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("bookingsTable");
    switching = true;
    // Set the sorting direction to ascending:
    dir = "asc"; 
    /* Make a loop that will continue until
    no switching has been done: */
    while (switching) {
      // Start by saying: no switching is done:
      switching = false;
      rows = table.rows;
      /* Loop through all table rows (except the
      first, which contains table headers): */
      for (i = 1; i < (rows.length - 1); i++) {
        // Start by saying there should be no switching:
        shouldSwitch = false;
        /* Get the two elements you want to compare,
        one from current row and one from the next: */
        x = rows[i].getElementsByTagName("TD")[n];
        y = rows[i + 1].getElementsByTagName("TD")[n];
        /* Check if the two rows should switch place,
        based on the direction, asc or desc: */
        if (dir == "asc") {
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            // If so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        } else if (dir == "desc") {
          if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
            // If so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        }
      }
      if (shouldSwitch) {
        /* If a switch has been marked, make the switch
        and mark that a switch has been done: */
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        // Each time a switch is done, increase this count by 1:
        switchcount ++;      
      } else {
        /* If no switching has been done AND the direction is "asc",
        set the direction to "desc" and run the while loop again. */
        if (switchcount == 0 && dir == "asc") {
          dir = "desc";
          switching = true;
        }
      }
    }
  }
  
  function setBookingsTable(data){
    console.log("data", data);
    let table = document.getElementById('bookingsTable');
    for (let i = 0; i < data.length; i++) {
        let row = document.createElement('tr');
        let namebookingCell = document.createElement('td');
        let bookingsPackageNameCell = document.createElement('td');
        let emailbookingCell = document.createElement('td');
        let contactBookingCell = document.createElement('td');
        let bookingDateCell = document.createElement('td');
        let statusBookingCell = document.createElement('td');

        namebookingCell.innerHTML = data[i].userId.name;
        bookingsPackageNameCell.innerHTML = data[i].packageId.packageName;
        emailbookingCell.innerHTML = data[i].userId.email;
        contactBookingCell.innerHTML = data[i].userId.contact;
        bookingDateCell.innerHTML = data[i].bookingDate;
        statusBookingCell.innerHTML = data[i].status;

        row.appendChild(namebookingCell);
        row.appendChild(bookingsPackageNameCell);
        row.appendChild(emailbookingCell);
        row.appendChild(contactBookingCell);
        row.appendChild(bookingDateCell);
        row.appendChild(statusBookingCell);

        table.appendChild(row);
    }
  }