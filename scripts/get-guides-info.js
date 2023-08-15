(function () {

    const firebaseConfig = {
        apiKey: "AIzaSyAbjZCUzSU3Fb96IVKXpNC7N8aZIhy091U",
        authDomain: "mwa-fma-ae774.firebaseapp.com",
        databaseURL: "https://mwa-fma-ae774-default-rtdb.firebaseio.com",
        projectId: "mwa-fma-ae774",
        storageBucket: "mwa-fma-ae774.appspot.com",
        messagingSenderId: "756828833443",
        appId: "1:756828833443:web:d4cac570b8353a346ae116"
      };
      // Initialize Firebase
      firebase.initializeApp(firebaseConfig);

        // get inmediate child 
        const guideRef = firebase.database().ref().child("guides");
        //order by surname 
        guideRef.orderByChild("guide_last_name").on("child_added", snap => {
           
            let guide_ID = snap.child("guide_ID").val();
            let guide_name = snap.child("guide_name").val();
            let guide_last_name = snap.child("guide_last_name").val();
            let guide_age = snap.child("guide_age").val();
            let guide_occupation = snap.child("guide_occupation").val();
            let guide_blue_badge = snap.child("guide_blue_badge").val();
            let guide_tour = snap.child("guide_tour").val();
            let guide_img = snap.child("guide_img").val();
        
        if(guide_blue_badge == 'YES') {
         $("#insertGuideInfo").append(
            '<div class=" col-sm-12  col-lg-4 ">'+
                '<div class="card my-2"> '+ 
                '<div class="card-header text-center">'+
                '<img class="card-img-top" src=../img/'+ guide_img +' alt="guide image "> '+
				'</div>'+
                    '<div class="card-body"> '+  
                        '<h4 class="text-info">' + guide_ID + ": "  + guide_name +" " +guide_last_name +"</h4>" +
                        "<p><strong> Age:</strong> " + guide_age + "</p>" +
                        "<p><strong> Occupation:</strong> " + guide_occupation + "</p>" +
                        "<p><strong> Blue Badge:</strong> " + guide_blue_badge + "</p>" +
                        "<p><strong>Tours: </strong>" + guide_tour + "</p>" +    
                    '</div>'+//card body end   
                    '<div class="card-footer text-muted">'+//card footer
                        '<a href="#" class="card-link text-primary text-decoration-none">More info</a>'+
                    '</div>'+                  
                '</div>'+//card
            '</div>');//column
          // console.log(guide_img);
       }

    });   
}());