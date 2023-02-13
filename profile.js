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

    user = JSON.parse(localStorage.getItem("user-cred"));
    fetch(`http://localhost:8080/api/users/${user.id}`)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Request failed with status code: " + response.status);
            }
        })
        .then(data => {
            console.log(data);
            document.getElementById('user-name').innerHTML = data.name;
            document.getElementById('user-email').innerHTML = data.email;
            document.getElementById('user-contact').innerHTML = data.contact;
        })
        .catch(error => {
            console.error("Fetch error:", error);
        });

    fetch(`http://localhost:8080/api/bookings`)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Request failed with status code: " + response.status);
            }
        })
        .then(data => {
            console.log("bookings",data);
            let userID = user.id;
            console.log("userId", userID);
            let filteredData = data.filter(item => item.userId.id == userID);
            console.log("filter",filteredData);
            let table = document.getElementById('user-bookings-table');
            filteredData.map(d => {
                let row = document.createElement('tr');
                let packageNameCell = document.createElement('td');
                let destinationCell = document.createElement('td');
                let priceCell = document.createElement('td');
                let statusCell = document.createElement('td');
        
                packageNameCell.innerHTML = d.packageId.packageName;
                destinationCell.innerHTML = d.packageId.destination;
                priceCell.innerHTML = d.packageId.price;
                statusCell.innerHTML = d.status;
        
                row.appendChild(packageNameCell);
                row.appendChild(destinationCell);
                row.appendChild(priceCell);
                row.appendChild(statusCell);
        
                table.appendChild(row);
            })
        })
        .catch(error => {
            console.error("Fetch error:", error);
        });
};

logoutBtn.addEventListener('click', () => {
    alert("logout")
    localStorage.removeItem("user-cred")
    document.getElementById('Register-btn').style.visibility = 'visible';
    document.getElementById('login-btn').style.visibility = 'visible';
    document.getElementById('logout-btn').style.visibility = 'hidden';

    window.location.href = "/#home"

})

function sortTable(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("user-bookings-table");
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
  