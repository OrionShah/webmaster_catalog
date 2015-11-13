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
    Template.filters.helpers({
        filters: [
            {id: 1, text:"fil1", active: 1},
            {id: 2, text:"fil2", active: 0},
            {id: 3, text:"fil3", active: 0},
            {id: 4, text:"fil4", active: 0},
            {id: 5, text:"fil5", active: 0},
            {id: 6, text:"fil6", active: 0},
            {id: 7, text:"fil7", active: 0},
            {id: 8, text:"fil8", active: 0},
        ]
    });
    Template.filters.events({
        'click .filter': function () {
            console.log(this);
            this.active = !this.active;
            console.log(this);

        }
    });
    Template.new.events({
        'submit #new': function (e) {
            e.preventDefault();
            var inputs = $("input[name^='base']");
            console.log(inputs);
            $.each(inputs, function(index, val) {
                full_name = val.name;
                console.log(full_name.substring(full_name.indexOf('.')+1, full_name.length));

            });
        }
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
    Router.route('/new', function() {
        this.render('new');
    })
}

