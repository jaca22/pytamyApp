Template.question.rendered = function(){
	Deps.autorun(function(){
		Meteor.subscribe("posts",Meteor.userId());
	})
	
}

Template.question.events({

	'click': function () {
    Session.set("selected_answer", this._id);
  },
	'keyup .comment':function(evt,tmpl){
		if(evt.which === 13){
			var commenttext = tmpl.find('.comment').value;
			var options = {text:commenttext,parent:this._id};
			Meteor.call('addPost',options);
			$('.comment').val('').select().focus();
		}
	},
	'click a.yes' : function(e) {
    e.preventDefault();
    if(Meteor.userId()){
      var answerId = Session.get('selected_answer');
      console.log('updating yes count for answerId '+answerId);
      Meteor.call("incrementYesVotes",answerId);
    }
  }, 
  'click a.no': function(e) {
    e.preventDefault();
    if(Meteor.userId()){
      var answerId = Session.get('selected_answer');
      console.log('updating no count for answerId '+answerId);
      Meteor.call("incrementNoVotes",answerId);
    }
  }
})

Template.question.posts = function(){
	return Posts.find({parent:null},{sort:{date:-1}});
}

Template.question.postComments = function(){
	return Posts.find({parent:this._id},{sort:{date:-1}});
}

Template.question.helpers({  commentsCount: function() {    return Posts.find({parent:this._id}).count();  }});

Template.post.helpers({  commentsCount: function() {    return Posts.find({parent:this._id}).count();  }});