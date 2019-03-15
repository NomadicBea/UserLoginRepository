
//Login info:
//email is j.b.worrall222@hotmail.com
//pw: nothing2
/*-----------------------MAIN SCRIPTS-------------------------------------------------*/

function userInfo(){

    //var user = firebase.auth().currentUser;
    firebase.auth().onAuthStateChanged(function(user) {

        if (user) {
            // User is signed in.

            $('.card-title').html('Welcome, ' + user.displayName);
            $('.card-text').html(user.email);
            $('.u-id').html('ID: ' + user.uid);
            $('.card-img-top').attr('src', user.photoURL);
        } else {
            // No user is signed in.
            //redirect to the login page.
            window.location.replace('index.html')
            exit();
        }
    });
}

function userLogout(){
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
        window.location.replace('index.html');
    }).catch(function(error) {
        // An error happened.
        $('.error').html(`
      <div class="alert alert-warning" role="alert">
        ${error}
      </div>
      `);
    });
}

userInfo();



$('#profile-form').on('submit', function(e){
//Get form from User Function
    var userInfo = {
        name: $('#username').val(),
        email: $('#email').val(),
        newEmail: $('#emailNew').val(),
        currentpassword: $('#password1').val(),
        imgURL: 'https://images.unsplash.com/photo-1517423568366-8b83523034fd?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80'
        //https://images.unsplash.com/photo-1517423738875-5ce310acd3da?ixlib=rb-1.2.1&auto=format&fit=crop&w=810&q=80
    };
    console.log(userInfo.name + userInfo.newEmail);
    e.preventDefault();

//Update User Function
    var user = firebase.auth().currentUser;
    user.updateProfile({
        displayName: userInfo.name,
        photoURL: userInfo.imgURL
    }).then(function() {
        // Update successful.
        console.log('user info has been updated!' + userInfo.name);
    }).catch(function(error) {
        console.log('An Error has occurred: ' + error);
    });

    var user = firebase.auth().currentUser;
    var cred;
    var cred = firebase.auth.EmailAuthProvider.credential(
        userInfo.email,
        userInfo.currentpassword
    );

    user.reauthenticateAndRetrieveDataWithCredential(cred).then(function() {
        // Update successful.
        user.updateEmail(userInfo.newEmail).then(function() {
            console.log('user email has been updated to ' + userInfo.newEmail);
        }).catch(function(error) {
            // An error happened.
            console.log('An Error has occurred: ' + error);
        });
    }).catch(function(error) {
        // An error happened.
        console.log('An Error has occurred: ' + error);
    });

});



//Update User Password
$('#password-form').on('submit', function(e){
//Get form from User Function
    var userInfo = {
        email: $('#email2').val(),
        currentPW: $('#old-password').val(),
        newPW: $('#new-password').val()
    };
    console.log(userInfo.email +" "+ userInfo.currentPW +" "+ userInfo.newPW);

    e.preventDefault();

//Re-authenticating a user
    var user = firebase.auth().currentUser;
    var cred;
    var cred = firebase.auth.EmailAuthProvider.credential(
        userInfo.email,
        userInfo.currentPW
    );
//NEED TO REAUTHENTICATE
// Prompt the user to re-provide their sign-in credentials
    user.reauthenticateAndRetrieveDataWithCredential(cred).then(function() {
        // User re-authenticated.
        user.updatePassword(userInfo.newPW).then(function() {
            // Update successful.
            console.log('User updatd the password.');
        }).catch(function(error) {
            // An error happened.
            console.log('An Error has occurred: ' + error);
        });
    }).catch(function(error) {
        // An error happened.
        console.log('An Error has occurred: ' + error);
    });


});




//Delete User Password
$('#delete-form').on('submit', function(e){
//Get form from User Function
    var userInfo = {
        email: $('#email3').val(),
        pw: $('#pw').val(),

    };
    console.log(userInfo.email +" "+ userInfo.pw);

    e.preventDefault();

    //Re-authenticating a user
    var user = firebase.auth().currentUser;
    var cred;
    var cred = firebase.auth.EmailAuthProvider.credential(
        userInfo.email,
        userInfo.pw
    );

    user.reauthenticateAndRetrieveDataWithCredential(cred).then(function() {
        // User re-authenticated.
        //DELETE: https://firebase.google.com/docs/auth/web/manage-users?authuser=0
        var user = firebase.auth().currentUser;

        user.delete().then(function() {
            // User deleted.
        }).catch(function(error) {
            // An error happened.
        });
    }).catch(function(error) {
        // An error happened.
        console.log('An Error has occurred: ' + error);
    });
});
