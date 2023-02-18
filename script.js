

let searchBtn = document.querySelector('#search-btn');
let searchBar = document.querySelector('.search-bar-container');
let formBtn = document.querySelector('#login-btn');
let registerBtn = document.querySelector('#Register-btn')
let loginForm = document.querySelector('.login-form-container');
let registerionForm = document.querySelector('#registerionForm');
let loginsubmitForm = document.querySelector('#loginsubmitForm');
let registerForm = document.querySelector('.register-form-container');
let formClose = document.querySelector('#form-close');
let profileBtn = document.querySelector('#profile-btn');
let adminBtn = document.querySelector('#admin-btn');


let logoutBtn = document.querySelector('#logout-btn');

let registerformClose = document.querySelector('#register-form-close');
let menu = document.querySelector('#menu-bar');
let navbar = document.querySelector('.navbar');
let videoBtn = document.querySelectorAll('.vid-btn');

let isSingin = false;
let isAdmin = false;


window.onscroll = () => {
    searchBtn.classList.remove('fa-times');
    searchBar.classList.remove('active');
    menu.classList.remove('fa-times');
    navbar.classList.remove('active');
    loginForm.classList.remove('active');
    registerForm.classList.remove('active');
}

menu.addEventListener('click', () => {
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
});

searchBtn.addEventListener('click', () => {
    searchBtn.classList.toggle('fa-times');
    searchBar.classList.toggle('active');
});

formBtn.addEventListener('click', () => {
    loginForm.classList.add('active');
});

registerBtn.addEventListener('click', () => {
    registerForm.classList.add('active')
})


logoutBtn.addEventListener('click', () => {
    alert("logout")
    isAdmin = false;
    isSingin = false;
    localStorage.removeItem("user-cred")
    document.getElementById('Register-btn').style.visibility = 'visible';
    document.getElementById('login-btn').style.visibility = 'visible';
    document.getElementById('logout-btn').style.visibility = 'hidden';


})

formClose.addEventListener('click', () => {
    loginForm.classList.remove('active');

});

function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

registerformClose.addEventListener('click', () => {
    registerForm.classList.remove('active');

});

// Register form submit
registerionForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    let isValid = true;

    const nameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;

    if (!nameRegex.test(name)) {
        document.getElementById("nameError").innerHTML = "Invalid name format";
        isValid = false;
        return;
    } else {
        document.getElementById("nameError").innerHTML = "";
    }

    if (validateEmail(email)) {
        document.getElementById("emailError").innerHTML = "";
    } else {
        document.getElementById("emailError").innerHTML = "Invalid email format";
        //     isValid = false;
        return;
    }

    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone) && phone.length <= 10) {
        document.getElementById("phoneError").innerHTML = "Invalid phone number format";
        isValid = false
        return;
    }
    else {
        document.getElementById("phoneError").innerHTML = "";
    }

    if (password === confirmPassword) {
        document.getElementById("confirmPassworderror").innerHTML = "";
        document.getElementById("passwordError").innerHTML = "";

    }
    else {
        document.getElementById("passwordError").innerHTML = "Password must be same";
        document.getElementById("confirmPassworderror").innerHTML = "Password must be same";
        isValid = false
        return;

    }

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "name": name,
        "email": email,
        "password": password,
        "contact": phone,
        "role": "Admin"
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("http://localhost:8080/api/users", requestOptions)
        .then(response => {
            if (!response.ok) {
                alert("Something went wrong")
            }
            else {
                registerForm.classList.remove('active');
                alert("successfully registered")
            }

        })
        .then(result => {

            registerForm.classList.remove('active');
        })
        .catch(error => console.log('error', error));

    registerionForm.submit();
});

function commonFetch(endpoint, options = {}) {
    return fetch(endpoint, options)
        .then(response => {
            if (!response.ok || response.status === 500) {
                alert("something went wrong")
                throw new Error(response.statusText);

            } else {
                loginForm.classList.remove('active');

                return response.json();
            }

        })
        .catch(error => {
            console.error(error);
        });
}

loginsubmitForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("emaillogin").value;
    const password = document.getElementById("passwordlogin").value;

    if (email == "" || password == "") {
        document.getElementById("invalidError").innerHTML = "Invalid Credentials";
        return;
    }
    else {
        document.getElementById("invalidError").innerHTML = "";
    }

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "email": "pkbhavsar1@gmail.com",
        "password": "Golu@245701"
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    // 
    commonFetch('http://localhost:8080/api/login', requestOptions)
        .then(data => {
            localStorage.setItem("user-cred", JSON.stringify(data))
            document.getElementById('Register-btn').style.visibility = 'hidden';
            document.getElementById('login-btn').style.visibility = 'hidden';
            document.getElementById('logout-btn').style.visibility = 'visible';
            isSingin = true;
            isAdmin = data.role === "Admin" ? true : false;

            if (isAdmin) {
                document.getElementById('profile-btn').style.visibility = 'visible'

                document.getElementById('admin-btn').style.visibility = 'visible';

            }
            else {
                document.getElementById('profile-btn').style.visibility = 'visible'

                document.getElementById('admin-btn').style.visibility = 'hidden';

            }
        });
})


videoBtn.forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelector('.controls .active').classList.remove('active');
        btn.classList.add('active');
        let src = btn.getAttribute('data-src');
        document.querySelector('#video-slider').src = src;
    });
});

var swiper = new Swiper(".review-slider", {
    spaceBetween: 20,
    loop: true,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    breakpoints: {
        640: {
            slidesPerView: 1,
        },
        768: {
            slidesPerView: 2,
        },
        1024: {
            slidesPerView: 3,
        },
    }
});

var swiper = new Swiper(".brand-slider", {
    spaceBetween: 20,
    loop: true,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    breakpoints: {
        450: {
            slidesPerView: 2,
        },
        768: {
            slidesPerView: 3,
        },
        991: {
            slidesPerView: 4,
        },
        1200: {
            slidesPerView: 5,
        },
    },
});


// Select the element where you want to render the orders
// const ordersElement = document.querySelector("#orders");
const ordersElement = document.getElementById("orders");

function getPackages() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "email": "pkbhavsar1@gmail.com",
        "password": "Golu@245701"
    });

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    commonFetch('http://localhost:8080/api/packages', requestOptions)
        .then(data => {
            let order = [];
            order = data
            console.log(order)

            
            user = JSON.parse(localStorage.getItem('user-cred'));
            let isDisable = user ? false : true
            for (const order of data) {
                // Create a new element for each order
                const orderElement = document.createElement("div");
                orderElement.innerHTML = ` <div class="box">
                     <img src="${order.image}" alt="img">
                     
                    
                    <div class="content">
                        <h3> <i class="fas fa-map-marker-alt"></i> ${order.destination} </h3>
                        <p>${order.description} </p>
                        <div class="stars">
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="far fa-star"></i>
                        </div>
                        <div class="price">${order.price}  &#x20B9; 
                         </div>
                      
                            <button href="#" class="btn" onClick="redirectBook('${order?.id}')">book now</button> 
            
                        </div>
                    </div>
                    
                `;

                orderElement.classList.add("box");

                // Add the order element to the orders element
                ordersElement.appendChild(orderElement);
            }

        });

}



function redirectBook(orderId) {
    const user = JSON.parse(localStorage.getItem('user-cred'));
    if (user) {
        sessionStorage.setItem("orderID", orderId);
        window.location.href = "book.html";
    }
}

window.onload = function () {
    // your code here
    document.getElementById('logout-btn').style.visibility = 'hidden';
    document.getElementById('profile-btn').style.visibility = 'hidden';
    document.getElementById('admin-btn').style.visibility = 'hidden';
    getPackages();
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
};