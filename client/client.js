if (Meteor.isClient) {
    Bases = new Meteor.Collection('bases');
    Meteor.subscribe("bases");
    
    Router.configure({
        autoRender: false,
    });

    Template.list.helpers({
        list: function() {
            var all = Bases.find().fetch();
            return all;
        }
        // bases: [
        //     {about: "adsfadsf", name: "base1", id: 1},
        //     {about: "fsdfcv", name: "base2", id: 2},
        //     {about: "csvdfgrdg", name: "base3", id: 3},
        //     {about: "vcxvbfdtr", name: "base4", id: 4},
        //     {about: "vdsgerty5y gr", name: "base5", id: 5},
        // ]
    });
    Router.route('/base/:_id', function() {
        var item = Bases.findOne({id: this.params._id});
        this.render('base', {data: item});
        
    });
    Router.route('/', function() {
        this.render('index');
    });
    Router.route('list', function() {
        this.render('list', {data: Bases});
    });
    Router.route('/about', function() {
        this.render('about');
    });
}

