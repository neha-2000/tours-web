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
            let userID = user.id;
            let filteredData = data.filter(item => item.userId.id === userID);
            console.log("filter",filteredData);
            filteredData.map(d => {
                document.getElementById('package-name').innerHTML = d.packageId.packageName;
                document.getElementById('destination').innerHTML = d.packageId.destination;
                document.getElementById('price').innerHTML = d.packageId.price;
                document.getElementById('status').innerHTML = d.status;
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