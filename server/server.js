Meteor.publish("posts",function(userid){
	return Posts.find({});
})
Meteor.publish("likes",function(postid){
	return Likes.find({post:postid});
})
Meteor.publish("appusers",function(){
	return Meteor.users.find();
})

Meteor.methods({
	//{text:'',owner:'',date:'',parent:''}
	'addPost':function(options){
		var image = "http://graph.facebook.com/" + Meteor.user().services.facebook.id + "/picture/?type=large";
		var post = {
			text:options.text,
			owner:Meteor.user().services.facebook.name,
			date:new Date(),
			picture:image,
			parent:options.parent
		}
		Posts.insert(post);
	},
	'removePost':function(id){
		Posts.remove({_id:id});
	},
	'removeAllPosts':function(){
		Posts.remove({});
	},
	'incrementYesVotes' : function(answerID){
		console.log(answerID);

		Posts.update(answerID,{
			$inc : {'yes':1},
			$set: {'votedBy': Meteor.userId()}
		});

	},
	'incrementNoVotes' : function(answerID){
		console.log(answerID);

		Posts.update(answerID,{
			$inc : {'no':1},
			$set: {'votedBy': Meteor.userId()}
		});

	}
});