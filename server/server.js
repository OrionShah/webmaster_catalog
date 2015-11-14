var Bases = new Mongo.Collection('bases');
if (Meteor.isServer) {
    Meteor.startup(function () {
        
    });
    Meteor.publish("bases", function () {
    	return Bases.find();
    });
}
