if (Meteor.isClient) {
    Filters = [
        {id: 1, name:"food", text:"Питание", active: true},
        {id: 2, name:"indoor", text:"Помещения", active: true},
        {id: 3, name:"year", text:"Круглый год", active: true},
        {id: 4, name:"winter", text:"Зима", active: true},
        {id: 5, name:"spring", text:"Весна", active: true},
        {id: 6, name:"summer", text:"Лето", active: false},
        {id: 7, name:"autumn", text:"Осень", active: false},
        {id: 8, name:"cars", text:"Стоянка", active: false},
        {id: 9, name:"night", text:"Ночевка", active: false},
        {id: 10, name:"sport", text:"Спорты", active: false}
    ];
    // Session.setDefault();
    Filter = {
        food: Session.get('food'),
        sport: Session.get('sport'),
        indoor: Session.get('indoor'),
        year: Session.get('year'),
        winter: Session.get('winter'),
        spring: Session.get('spring'),
        summer: Session.get('summer'),
        autumn: Session.get('autumn'),
        cars: Session.get('cars'),
        night: Session.get('night')
    };
    Bases = new Meteor.Collection('bases');
    Meteor.subscribe("bases", Filters);
    
    Router.configure({
        autoRender: true,
    });

    Template.list.helpers({
        list: function() {
            return Bases.find().fetch();
        },
        filters: function() {
            return Filters;
        },
        checkedIf: function (val) {
            return val ? 'checked' : '';
        }
    });
    Template.list.events({
        'click .filter>input': function () {
            this.active = !this.active;
            Session.set(this.name, this.active);
        }
    });
    Template.new.events({
        'submit #new': function (e) {
            e.preventDefault();
            var inputs = $("input[name^='base']");
            var new_base = {};
            $.each(inputs, function(index, val) {
                full_name = val.name;
                name = full_name.substring(full_name.indexOf('.')+1, full_name.length);
                if (val.type == "checkbox") {
                    new_base[name] = $(val).is(':checked');
                } else {
                    new_base[name] = val.value;
                }
            });
            Bases.insert(new_base);
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
    });
    Router.route('/add', function() {
        this.render('new');
    });
}

