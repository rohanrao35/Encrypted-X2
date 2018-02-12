"use strict";

var url  = "http://localhost:3000"
var auth = ""

function body_onload() {
	Vue.component("file-box", {
		 template: "#file-box-template",
		 props: ["url", "date", "title", "comments"],
		 data: function() {
		 	return { showComments: false, showConfirm: false}
	 	 },

	 	 methods: {
			 btnDelete_click: function () {
			 	this.showConfirm = true;
			 },

			 btnYes_click: function () {
			 	this.$parent.fileDelete(this.url);
			 	this.showConfirm = false;
			 },

			 btnNo_click: function () {
			 	this.showConfirm = false;
			 }
		 }
	 })

	new Vue({
		 el: "#main",
		 data: {
		 	 showUpload: false,
		 	 search:     "",
		 	 selected1:  "",
		 	 selected2:  "",
		 	 comments:   "",
		 	 fileTitle:  "",

		 	 date: "",
		 	 title: "",
		 	 comments: "",
		 	 files:  [{url: 96, date: "02/02/2018", title: "Test4", comments: "comments hjsembfjwsbdvjksbvdkjbvszkdbvk cakezdjbkzbvdz"}, {url: 97, date: "02/02/2018", title: "Test3", comments: "comments hjsembfjwsbdvjksbvdkjbvszkdbvk cakezdjbkzbvdz"}, {url: 98, date: "02/02/2018", title: "Test2", comments: "comments hjsembfjwsbdvjksbvdkjbvszkdbvk cakezdjbkzbvdz"}, {url: 99, date: "01/02/2018", title: "Test1", comments: "comments hjsembfjwsbdvjksbvdkjbvszkdbvk cakezdjbkzbvdz"}],	 
 		 },

 		 computed: {
 		 	listFiles: function() {
 		 		if (this.search != "") {
 		 			var temp = this.files;
 		 		}
 		 	}
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
		 		var query  = location.search.substr(1);
				var email  = parseInt(query.substr(query.indexOf("=") + 1));

		 		var info             = new Object();
		 		info.title           = this.title;
		 		info.comments        = this.comments;
    			info.timeoutOption   = this.selected1;
    			info.timeToDelete    = this.selected2;
    			info.link            = "link1";
    			info.owner           =  email;

    			var self = this;
			    fetch(url + "/addfile", {
			        method: "POST",
			        headers: {
			            'content-type': 'application/json'
			        },
			        body: JSON.stringify(info)
			    }).then(function(res) {
			            if (res.ok) {
			                res.json().then(function(data) {
			                	// auth = data.authtoken;
			                	//localStorage.setItem("authToken", data.authtoken);
			                	var file      = new Object();
			                	file.url      = info.url;
			                	file.title    = info.title;
			                	file.comments = info.comments;
			                	file.date     = data.date;
			                	
			                	self.showUpload = false;
			                	self.files.push(file);
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

		 	fileDelete: function(url) {
		 		//alert(url);
		 		for (var i = 0; i < this.files.length; i++) {
					if (this.files[i].url === url) {
						this.files.splice(i, 1);
						//this.showConfirm = false;
					 	return;
					}
	 			}	
		 	}
		},
	});
}