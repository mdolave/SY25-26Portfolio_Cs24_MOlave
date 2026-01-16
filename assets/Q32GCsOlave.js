// read from the localStorage saved as a string - to see if there are anything saved on the users coomputer
let acctString = localStorage.getItem("accounts")
if (!acctString) { accountList = {} }
else accountList = JSON.parse(acctString)
const form = document.getElementById("dForm");

form.addEventListener("submit", function(e) { // assign an event handler of submit to the form
    choice = confirm("Bago i-submit, siguraduhing tama ang mga inilagay na impormasyon. \nPindutin ang 'OK' para i-submit o 'Cancel' para suriin ang impormasyon.");
    if (choice===true) {   
        const data = new FormData(form);
        const obj = Object.fromEntries(data.entries()); // get all the data from the form

        accountList[obj.uname] = {};
        for (let key in obj) { // go through the properties of the object and create another account
            if (key != "uname") { 
                accountList[obj.uname][key] = obj[key];
            }
        }
        
        console.log(accountList) // to check all the account information if it will be saved correctly
        acctString = JSON.stringify(accountList) // convert object into string, as a requirement of localStorage
        localStorage.setItem("accounts", acctString) // save on the user's computer
        form.submit();
    } else {
        e.preventDefault(); // cancel the submit if user clicks "Cancel"
    }
});

  

// event handler for the reset button instead of onreset on the button itself
form.addEventListener("reset", function(e) { // 
  // Ask for confirmation before clearing
  if (!confirm("Pidutin ang 'OK' para i-clear ang lahat ng inilagay na impormasyon o 'Cancel' para bumalik sa form.")) {
    e.preventDefault(); // cancel the reset if user clicks "Cancel"
  }
});

// called when user is on the input field
function focus(ele) {
    console.log(ele)
    ele.style.backgroundColor = "yellow"
}