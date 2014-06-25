Template.splash.rendered = function(){
	Deps.autorun(function(){
		Meteor.subscribe("posts",Meteor.userId());
		Meteor.subscribe("likes");
		Meteor.subscribe("appusers");
	})
	
}

Template.splash.helpers({  postsCount: function() {    return Posts.find({parent:null}).count();  }});
