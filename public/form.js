const formE1 = document.querySelector('.form');


details = [];
function validateForm(event){
    var fnInput = document.getElementById('fname');
    var lnInput = document.getElementById('lname');
    var emailInput = document.getElementById('email');
    var phoneInput = document.getElementById('number');
    var passInput = document.getElementById('password');
    var dateInput = document.getElementById('date')
    var commentInput = document.getElementById('comment')
    var selectedRadioInput = document.querySelector('input[name="gender"]:checked')



    var fname = fnInput.value.trim()
    var lname = lnInput.value.trim()
    var email = emailInput.value.trim()
    var phone = phoneInput.value.trim()
    var date = dateInput.value.trim()
    var password = passInput.value.trim()
    var gender = selectedRadioInput.value.trim()
    var comment = commentInput.value.trim()
    

    console.log(gender)
    // ##########################################################################################
    // #################################### Validation Starts ###################################
    // ##########################################################################################

    isForamValid = 0

    if (fname === ''){
        alert("please enter your first name");
        fnInput.focus();
        isForamValid = 1
    }
    else if (lname === ''){
        alert("please enter your last name");
        lnInput.focus();
        isForamValid = 1
    }

    else if (!isEmailValid(email)){
        alert("Please enter a valid email address! ");
        emailInput.focus();
        isForamValid = 1
    }

    else if (phone === ''){
        alert("phone field shouldn't be blank!")
        phoneInput.focus()
        isForamValid = 1
    }
    
    else if (!isPhoneValid(phone)){
      alert("please enter valid BD phone number");
      phoneInput.focus();
      isForamValid = 1
  }
    else if (comment === ''){
        alert("comment field shouldn't be blank!")
        commentInput.focus()
        isForamValid = 1
      }

    else if (!isPasswordSecure(password)){
        alert("Please enter a valid password and Password must has at least 8 characters that include at least 1 lowercase character, 1 uppercase characters, 1 number, and 1 special character in (!@#$%^&*)")
        passInput.focus();
        isForamValid = 1
    }


    if(isForamValid == 1){
        return false;
    }else{
        var form = event.target;
        var formData = new FormData(form);

        // Convert form data to JSON object
        var jsonObject = {};
        for (var [key, value] of formData.entries()) {
          jsonObject[key] = value;
        }


        // Send the data to the server
        fetch('/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(jsonObject)
        })
          .then(function(response) {
            if (response.ok) {
              alert('Form data submitted successfully!');
            } else {
              alert('Form data submission failed!');
            }
          })
          .catch(function(error) {
            console.error('Error:', error);
          });

          // ##########################################################################################
          // ######################################## END #############################################
          // ##########################################################################################

          // ##########################################################################################
          // ############################  Send data to Local Storage  ################################
          // ##########################################################################################

          console.log(gender)
          let id;
          let peopleList = JSON.parse(localStorage.getItem('Details'))||[];
          peopleList.length === 0 ? id = 0 : id = (peopleList[peopleList.length - 1].id) + 1
          let data = {
              id : id,
              fnInput : fname,
              lnInput : lname,
              emailInput : email,
              phoneInput : phone,
              dateInput : date,
              selectedRadioInput : gender,
          }
          
          // console.log(data)
          

          
          peopleList.push(data)

          localStorage.setItem("Details",JSON.stringify(peopleList))
          }
}

    // ##########################################################################################
    // ##################################  END  #################################################
    // ##########################################################################################


const isEmailValid = (email) => {
    const re = /^[a-z0-9._]+@(gmail|yahoo|outlook)\.(com|co\.uk|in|net)$/;
    return re.test(email)
};

function isValidEmail(email){
    const re = /^[a-z0-9._]+@(gmail|yahoo|outlook)\.(com|co\.uk|in|net)$/;
    return re.test(email)

}

const isPhoneValid = (phone) => {
    const re = /^01[356789]\d{8}$/;
    return re.test(phone)
}
const isPasswordSecure = (password) => {
    const re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    return re.test(password);
};

//radio button selection
var radios = document.querySelectorAll('input[name="gender"]');
radios.forEach(radio => {
  radio.addEventListener('change', () => {
    radios.forEach(radio => {
      radio.checked = false;
    });

    radio.checked = true;
  });
});


//sign in

// let signIn = document.getElementById('signin')

// signIn.addEventListener('submit',function(e){
//   e.preventDefault()
//   console.log("signin works!")

//   const userEmail = document.getElementById('email').value
//   const passWord = document.getElementById('password').value

//   userData = JSON.parse(localStorage.getItem('Details'))

//   userData.forEach(function(item){
//     if(userEmail == item.emailInput && passWord == item.pass){
//       console.log(true)
//     }
//   })
//   console.log(userData)

// })