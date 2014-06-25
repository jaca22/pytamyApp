Router.configure({
  layoutTemplate: 'layout',
  notFoundTemplate: 'notFound',
  loadingTemplate: 'loading'
});
Router.map(function() {
  	this.route('splash', {path: '/'})
  	this.route('messages');
	this.route('events');
	this.route('home');
	this.route('question', {
  	path: '/question/:_id',
   data: function() { return Posts.findOne(this.params._id); }
});
});
