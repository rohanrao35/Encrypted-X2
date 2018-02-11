"use strict";

var url  = "http://localhost:3000/"
var auth = ""

function body_onload() {
	new Vue({
		 el: "#main",
		 data: {
		 	 showUpload: false,
		 	 search:     "",
		 	 selected1:  "",
		 	 selected2:  "",
		 	 comments:   "",	 
 		 },

		 methods: {
		 	btnUpload1_click: function () {
		 		this.showUpload = true; 
		 	},

		 	btnLogout_click: function () {
		 		window.location.href = "../login/index.html"
		 	},

		 	btnCancel_click: function () {
		 		this.showUpload = false;
		 	},

		 	btnSave_click: function () {
		 		this.showUpload = false;
		 	},

		 	btnUpload2_click: function () {
		 		
		 	},
		},
	});
}