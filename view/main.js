/**
 * This script will add the main behavior of the tabs.
 * The idea is that every time a tab is clicked, we identify the one that was clicked,
 * call show to this one, and hide to the others.
 */
$(document).ready(function () {


    ///the code for checking the signing informations from the backend and displaying it 
    //in the frontend using the token generated from jwt
    //and redirecting to the weather page
    $('#signInSubmit').click(function (event) {
        event.preventDefault();
        $.ajax({
            type: "POST",
            url: "/auth/signin",
            data: {
                email: $('#signInEmail').val(),
                password: $('#signInPassword').val()
            },
            success: function (data) {
                console.log(data);
                localStorage.token = data.token;
                console.log('Got a token from the server! Token: ' + data.token);
                window.location.href = "/weatherCity.html";
            },
            error: function (err) {
                console.log(err.responseText);
                alert(JSON.parse(err.responseText).error);
            }
        });
    });


    //the frontend by retrieving info from the html elements and saving it in the database and redirecting it to the
    //signing page so the user can signin.
    $('#signUpSubmit').click(function (event) {

        event.preventDefault();
        console.log({
            name: $('#signUpName').val(),
            email: $('#signUpEmail').val(),
            password: $('#signUpPassword').val()
        });
        $.ajax({
            type: "POST",
            url: "/auth/signup",
            data: JSON.stringify({
                name: $('#signUpName').val(),
                email: $('#signUpEmail').val(),
                password: $('#signUpPassword').val()
            }),
            success: function (data) {
                // alert("success")
                localStorage.token = data.token;
                window.location.href = "/signin.html";
            },
            error: function (err) {
                console.log(err.responseText);
                alert(JSON.parse(err.responseText).error);
            }
            ,
            dataType: "json",
            contentType: "application/json"

        });

    });

    //
    $('#signoutID').click(function (event) {

        event.preventDefault();
        alert('signout')
        $.ajax({
            type: "POST",
            url: "/auth/signout",
            success: function () {
                localStorage.token = data.token;

                window.localStorage.clear(); //clear all localstorage
                window.location.href = "/signin.html";
            },
            error: function (err) {
                console.log(err);
            }
        });

    });

    /**
     * This function binds an event to the find temperature button.
     */
    $("#searchButton").click(function (event) {
        event.preventDefault();
        console.log({
            city: $('#cityname').val(),
            province: $('#provincename').val()
        });

        $.ajax({
            url: '/weather/city_weather',
            type: 'GET',
            contentType: 'application/json',
            data: JSON.stringify({
                city: $('#cityname').val(),
                province: $('#provincename').val()
            }),
            success: function (response) {
                console.log(response);
                // $("#find-citsy").text(response.city);
                // $("#find-province").text(response.province);
                // $("#find-temperature").text(response.temperature);
                alert('success')
            },
            error: function (xhr, status, error) {
                console.log(error);
                var errorMessage = xhr.status + ': ' + xhr.statusText
                alert('Error - ' + errorMessage);
            }
        });
    });




});
