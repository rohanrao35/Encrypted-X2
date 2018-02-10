"use strict";

var url  = "http://localhost:3000/"
var auth = ""

function body_onload() {
	new Vue({
		 el: "#encryptedApp",
		 data: {
		 	 showLogin: 			false,
			 userid:    			"",
			 password:  			"",
			 
			 signUpId:  			"",
			 signUpPassword:        "",
			 signUpConfirmPassword: "",
			 firstName: 			"",
			 lastName:  			"",
			 accessKey:       		"",			 
 		 },

		 methods: {
			btnSignIn_click: function () {
				var credentials        = new Object();
    			credentials.email      = this.userid;
    			credentials.password   = this.password;

    			var self = this;
			    fetch(url + "/login", {
			        method: "POST",
			        headers: {
			            'content-type': 'application/json'
			        },
			        body: JSON.stringify(credentials)
			    }).then(function(res) {
			            if (res.ok) {
			                res.json().then(function(data) {
			                	auth = data.authtoken;
			                	//localStorage.setItem("authToken", data.authtoken);
			                	self.showLogin = true;
			                });
			            }
			            else {
			                res.json().then(function(data) {
			                    alert(data.message);
			                });
			            }
			        }).catch(function(err) {
			            alert(err.message);
			    }); 
		 	},

		 	btnSignUp1_click: function () {
		 		this.showLogin = true;
		 		window.location.href = "../main/main.html" 
		 	},

		 	btnSubmit_click: function () {
		 		this.showLogin  = false;

		 		if (this.signUpPassword == "" || this.signUpPassword != this.signUpConfirmPassword) return;

		 		var credentials        = new Object();
    			credentials.email      = this.signUpId;
    			credentials.password   = this.signUpPassword;

    			var self = this;
			    fetch(url + "/signup", {
			        method: "POST",
			        headers: {
			            'content-type': 'application/json'
			        },
			        body: JSON.stringify(credentials)
			    }).then(function(res) {
			            if (res.ok) {
			                res.json().then(function(data) {
			                	auth = data.authtoken;
			                	//localStorage.setItem("authToken", data.authtoken);
			                	self.showSignUp = true;
			                });
			            }
			            else {
			                res.json().then(function(data) {
			                    alert(data.message);
			                });
			            }
			        }).catch(function(err) {
			            alert(err.message);
			    }); 
		 	}
		},
	});
}