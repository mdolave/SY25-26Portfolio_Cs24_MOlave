// Q32GCsOlave.js - Form submission handler for Ang Lagablab sign-up form

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('dForm');
  
  form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission
    
    // Get form values
    const idnum = document.getElementById('idnum').value;
    const uname = document.getElementById('uname').value;
    const dob = document.getElementById('dob').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const glvl = document.getElementById('glvl').value;
    const club = document.getElementById('club').value;
    
    // Get intern/extern value
    const internRadio = document.querySelector('input[name="Intern"]:checked');
    const externRadio = document.querySelector('input[name="Extern"]:checked');
    let inex = '';
    if (internRadio) inex = 'Intern';
    if (externRadio) inex = 'Extern';
    
    // Get about text
    const about = document.getElementById('about').value;
    
    // Validate required fields
    if (!idnum || !uname || !dob || !email || !phone || !glvl || !club || !inex) {
      alert('Pakiusap punan ang lahat ng kinakailangang impormasyon.');
      return;
    }
    
    // Create user object
    const userData = {
      idnum: idnum,
      uname: uname,
      dob: dob,
      email: email,
      phone: phone,
      glvl: glvl,
      club: club,
      inex: inex,
      about: about,
      timestamp: new Date().toISOString()
    };
    
    // Save to localStorage
    let signups = {};
    const existingData = localStorage.getItem('clubsignups');
    
    if (existingData) {
      signups = JSON.parse(existingData);
    }
    
    // Use ID number as the key
    signups[idnum] = userData;
    
    // Save back to localStorage
    localStorage.setItem('clubsignups', JSON.stringify(signups));
    
    // Show success message
    alert('Matagumpay na na-save ang iyong impormasyon!');
    
    // Optionally redirect to view page
    if (confirm('Nais mo bang tingnan ang listahan ng mga sign-up?')) {
      window.location.href = 'viewsignups.html';
    } else {
      form.reset(); // Clear the form
    }
  });
  
  // Optional: Add validation for phone number (Philippines format)
  const phoneInput = document.getElementById('phone');
  phoneInput.addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, ''); // Remove non-digits
    if (value.length > 11) value = value.slice(0, 11);
    e.target.value = value;
  });
});