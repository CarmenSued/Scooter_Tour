// firebase configuration
const firebaseConfig = {
	apiKey: "",
	authDomain: "",
	databaseURL: "",
	projectId: "",
	storageBucket: "",
	messagingSenderId: "",
	appId: ""
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


//variables referencing to each  form element
const statusLogin  = document.getElementById("loginStatusMsg");
const emaiLabel = document.getElementById("emaillabel");
const emailInput = document.getElementById("txtemail");
const passwordLabel = document.getElementById("passwordlabel");
const passwordInput = document.getElementById("txtpassword");
const btnLogin = document.getElementById("btnlogin");
const btnSignup = document.getElementById("btnsignup");
const btnLogout = document.getElementById("btnlogout");


//create event listener for buttons in the form
// "e" stand for an error message
btnLogin.addEventListener("click", ev => {
	ev.preventDefault();
    const enteredEmail = emailInput.value;
    const enteredPassword = passwordInput.value;
    const auth = firebase.auth();
	const promise = auth.signInWithEmailAndPassword(enteredEmail, enteredPassword);
    document.cookie="validSession = true";
	promise.catch(error => alert("Unable to log you in at this time. \n" + error.message)); 

});
 
btnSignup.addEventListener("click", ev => {
	ev.preventDefault();
    const enteredEmail = emailInput.value;
    const enteredPassword = passwordInput.value;
    const auth = firebase.auth();
    const promise = auth.createUserWithEmailAndPassword(enteredEmail, enteredPassword);
    promise.catch(error => alert("Unable to complete this transaction at this time. \n" + error.message)); 
});

btnLogout.addEventListener("click", ev => {
	ev.preventDefault();
    firebase.auth().signOut();
    document.cookie="validSession = false";
});

firebase.auth().onAuthStateChanged(firebaseUser => {
	if (firebaseUser) {
		document.cookie = "validSession=true";
		console.log("Logged in");
		btnLogout.style.display = "block";
		btnSignup.style.display = "none";
		emailInput.style.display = "none";
		btnLogin.style.display = "none";
		passwordInput.style.display = "none";
		emaiLabel.style.display = "none";
		passwordLabel.style.display = "none";
		statusLogin.innerHTML = "You are currently logged in.";
	} else {
		document.cookie = "validSession=false";
		console.log("Not logged in");
		btnLogout.style.display = "none";
		btnSignup.style.display = "block";
		emailInput.style.display = "block";
		btnLogin.style.display = "block";
		passwordInput.style.display = "block";
		emaiLabel.style.display = "block";
		passwordLabel.style.display = "block";
		statusLogin.innerHTML = "You are not currently logged in. Please log in.";
	}
}
);
