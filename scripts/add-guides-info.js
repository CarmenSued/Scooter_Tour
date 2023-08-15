(function () {

    const firebaseConfig = {
        apiKey: "AIzaSyAbjZCUzSU3Fb96IVKXpNC7N8aZIhy091U",
        authDomain: "mwa-fma-ae774.firebaseapp.com",
        databaseURL:"https://mwa-fma-ae774-default-rtdb.firebaseio.com",
        projectId: "mwa-fma-ae774",
        storageBucket: "mwa-fma-ae774.appspot.com",
        messagingSenderId: "756828833443",
        appId: "1:756828833443:web:d4cac570b8353a346ae116"
      };

        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);
        
        // Reference to the database in firebase
        const guideRef = firebase.database().ref("guides");

        //show message when  guide information is submmited
        const form = document.getElementById('guideForm');
        const msg = document.getElementById('msgConfirmation');
        form.addEventListener('submit', handleForm);
       
        function handleForm(e) {
            msg.textContent = 'Your guide has been succesfully added to the database';
            e.preventDefault();
            const guideID = document.getElementById("inputGuideId").value;
            const guideName = document.getElementById("inputGuideName").value;
            const guideLastName = document.getElementById("inputGuideLastName").value;
            const guideAge  = document.getElementById("inputGuideAge").value;
            const guideOccupation = document.getElementById("inputGuideOcuppation").value;
            const guideBlueBadge = document.getElementById("guideBadge").value;
            const guideTour = document.getElementById("inputGuideTours").value;
            const guideImage = document.getElementById("inputGuideImage").value;
            saveGuidesInfo(guideID, guideName,  guideLastName, guideAge, guideOccupation, 
                            guideBlueBadge, guideTour, guideImage);
            form.reset(); 
            
                       
      }
     
        function saveGuidesInfo(guideID, guideName, guideLastName, guideAge, guideOccupation, 
          guideBlueBadge, guideTour, guideImage){
          let newGuideRef = guideRef.push();
          newGuideRef.set({
              guide_ID: guideID,
              guide_name: guideName,
              guide_last_name: guideLastName,
              guide_age: guideAge,
              guide_occupation: guideOccupation,
              guide_blue_badge: guideBlueBadge,
              guide_tour: guideTour,
              guide_img: guideImage
          });
        }  
}());