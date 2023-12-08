---
external: false
draft: false
title: 10 JavaScript Design Patterns
description: Understanding design patterns with examples - Abstract Factory, Builder, Factory Method, Adapter, Decorator, Facade, Proxy, Mediator, Observer, and Visitor.
date: 2023-05-02
image: '/images/10.webp'
thumb: '/images/thumbs/10.png'
---

![Blogster](/images/10.webp)

Design patterns are advanced object-oriented solutions to commonly occurring software problems. Patterns are about reusable designs and interactions of objects. Each pattern has a name and becomes part of a vocabulary when discussing complex design solutions.

In this tutorial, I provide JavaScript examples for each of the GoF patterns. Mostly, they follow the structure and intent of the original pattern designs. These examples demonstrate the principles behind each pattern but are not optimized for JavaScript.

### Creational Patterns

- Abstract Factory — Creates an instance of several families of classes
- Builder — Separates object construction from its representation
- Factory Method — Creates an instance of several derived classes

### Structural Patterns

- Adapter — Match interfaces of different classes
- Decorator — Add responsibilities to objects dynamically
- Facade — A single class that represents an entire subsystem
- Proxy — An object representing another object

### Behavioral Patterns

- Mediator — Defines simplified communication between classes
- Observer — A way of notifying change to a number of classes
- Visitor — Defines a new operation to a class without change

### Abstract Factory

An Abstract Factory creates objects that are related by a common theme. In object-oriented programming, a Factory is an object that creates other objects. An Abstract Factory has abstracted out a theme that is shared by the newly created objects.

![factory](/images/abstract-factory.webp)

```js
function Employee(name) {
    this.name = name;

    this.say = function () {
        console.log("I am employee " + name);
    };
}

function EmployeeFactory() {

    this.create = function (name) {
        return new Employee(name);
    };
}

function Vendor(name) {
    this.name = name;

    this.say = function () {
        console.log("I am vendor " + name);
    };
}

function VendorFactory() {

    this.create = function (name) {
        return new Vendor(name);
    };
}

function run() {
    var persons = [];
    var employeeFactory = new EmployeeFactory();
    var vendorFactory = new VendorFactory();

    persons.push(employeeFactory.create("Joan DiSilva"));
    persons.push(employeeFactory.create("Tim O'Neill"));
    persons.push(vendorFactory.create("Gerald Watson"));
    persons.push(vendorFactory.create("Nicole McNight"));

    for (var i = 0, len = persons.length; i < len; i++) {
        persons[i].say();
    }
}
```

### Builder

The Builder pattern allows a client to construct a complex object by specifying the type and content only. Construction details are hidden from the client entirely.

![builder](/images/builder.webp)

```js
function Shop() {
    this.construct = function (builder) {
        builder.step1();
        builder.step2();
        return builder.get();
    }
}

function CarBuilder() {
    this.car = null;

    this.step1 = function () {
        this.car = new Car();
    };

    this.step2 = function () {
        this.car.addParts();
    };

    this.get = function () {
        return this.car;
    };
}

function TruckBuilder() {
    this.truck = null;

    this.step1 = function () {
        this.truck = new Truck();
    };

    this.step2 = function () {
        this.truck.addParts();
    };

    this.get = function () {
        return this.truck;
    };
}

function Car() {
    this.doors = 0;

    this.addParts = function () {
        this.doors = 4;
    };

    this.say = function () {
        console.log("I am a " + this.doors + "-door car");
    };
}

function Truck() {
    this.doors = 0;

    this.addParts = function () {
        this.doors = 2;
    };

    this.say = function () {
        console.log("I am a " + this.doors + "-door truck");
    };
}

function run() {
    var shop = new Shop();
    var carBuilder = new CarBuilder();
    var truckBuilder = new TruckBuilder();
    var car = shop.construct(carBuilder);
    var truck = shop.construct(truckBuilder);

    car.say();
    truck.say();
}
```

### Factory Method

A Factory Method creates new objects as instructed by the client. One way to create objects in JavaScript is by invoking a constructor function with the new operator. There are situations however, where the client does not, or should not, know which one of several candidate objects to instantiate. The Factory Method allows the client to delegate object creation while still retaining control over which type to instantiate.

![builder](/images/factory-builder.webp)

```js
var Factory = function () {
    this.createEmployee = function (type) {
        var employee;

        if (type === "fulltime") {
            employee = new FullTime();
        } else if (type === "parttime") {
            employee = new PartTime();
        } else if (type === "temporary") {
            employee = new Temporary();
        } else if (type === "contractor") {
            employee = new Contractor();
        }

        employee.type = type;

        employee.say = function () {
            console.log(this.type + ": rate " + this.hourly + "/hour");
        }

        return employee;
    }
}

var FullTime = function () {
    this.hourly = "$12";
};

var PartTime = function () {
    this.hourly = "$11";
};

var Temporary = function () {
    this.hourly = "$10";
};

var Contractor = function () {
    this.hourly = "$15";
};

function run() {

    var employees = [];
    var factory = new Factory();

    employees.push(factory.createEmployee("fulltime"));
    employees.push(factory.createEmployee("parttime"));
    employees.push(factory.createEmployee("temporary"));
    employees.push(factory.createEmployee("contractor"));

    for (var i = 0, len = employees.length; i < len; i++) {
        employees[i].say();
    }
}
```

### Adapter

The Adapter pattern translates one interface (an object‘s properties and methods) to another. Adapters allows programming components to work together that otherwise wouldn&lstqup;t because of mismatched interfaces. The Adapter pattern is also referred to as the Wrapper Pattern.

![builder](/images/adapter.webp)

```js
// old interface

function Shipping() {
    this.request = function (zipStart, zipEnd, weight) {
        // ...
        return "$49.75";
    }
}

// new interface

function AdvancedShipping() {
    this.login = function (credentials) { /* ... */ };
    this.setStart = function (start) { /* ... */ };
    this.setDestination = function (destination) { /* ... */ };
    this.calculate = function (weight) { return "$39.50"; };
}

// adapter interface

function ShippingAdapter(credentials) {
    var shipping = new AdvancedShipping();

    shipping.login(credentials);

    return {
        request: function (zipStart, zipEnd, weight) {
            shipping.setStart(zipStart);
            shipping.setDestination(zipEnd);
            return shipping.calculate(weight);
        }
    };
}

function run() {

    var shipping = new Shipping();
    var credentials = { token: "30a8-6ee1" };
    var adapter = new ShippingAdapter(credentials);

    // original shipping object and interface

    var cost = shipping.request("78701", "10010", "2 lbs");
    console.log("Old cost: " + cost);

    // new shipping object with adapted interface

    cost = adapter.request("78701", "10010", "2 lbs");

    console.log("New cost: " + cost);
}
```

### Decorator

The Decorator pattern extends (decorates) an object’s behavior dynamically. The ability to add new behavior at runtime is accomplished by a Decorator object which ‘wraps itself’ around the original object. Multiple decorators can add or override functionality to the original object.

![decorator](/images/decorator.webp)

```js
var User = function (name) {
    this.name = name;

    this.say = function () {
        console.log("User: " + this.name);
    };
}

var DecoratedUser = function (user, street, city) {
    this.user = user;
    this.name = user.name;  // ensures interface stays the same
    this.street = street;
    this.city = city;

    this.say = function () {
        console.log("Decorated User: " + this.name + ", " +
            this.street + ", " + this.city);
    };
}

function run() {

    var user = new User("Kelly");
    user.say();

    var decorated = new DecoratedUser(user, "Broadway", "New York");
    decorated.say();
}
```

### Facade

The Façade pattern provides an interface which shields clients from complex functionality in one or more subsystems. It is a simple pattern that may seem trivial but it is powerful and extremely useful. It is often present in systems that are built around a multi-layer architecture.

![facade](/images/facade.webp)

```js
var Mortgage = function (name) {
    this.name = name;
}

Mortgage.prototype = {

    applyFor: function (amount) {
        // access multiple subsystems...
        var result = "approved";
        if (!new Bank().verify(this.name, amount)) {
            result = "denied";
        } else if (!new Credit().get(this.name)) {
            result = "denied";
        } else if (!new Background().check(this.name)) {
            result = "denied";
        }
        return this.name + " has been " + result +
            " for a " + amount + " mortgage";
    }
}

var Bank = function () {
    this.verify = function (name, amount) {
        // complex logic ...
        return true;
    }
}

var Credit = function () {
    this.get = function (name) {
        // complex logic ...
        return true;
    }
}

var Background = function () {
    this.check = function (name) {
        // complex logic ...
        return true;
    }
}

function run() {
    var mortgage = new Mortgage("Joan Templeton");
    var result = mortgage.applyFor("$100,000");

    console.log(result);
}
```

### Proxy

The Proxy pattern provides a surrogate or placeholder object for another object and controls access to this other object.

![proxy](/images/proxy.webp)

```js
function GeoCoder() {

    this.getLatLng = function (address) {

        if (address === "Amsterdam") {
            return "52.3700° N, 4.8900° E";
        } else if (address === "London") {
            return "51.5171° N, 0.1062° W";
        } else if (address === "Paris") {
            return "48.8742° N, 2.3470° E";
        } else if (address === "Berlin") {
            return "52.5233° N, 13.4127° E";
        } else {
            return "";
        }
    };
}

function GeoProxy() {
    var geocoder = new GeoCoder();
    var geocache = {};

    return {
        getLatLng: function (address) {
            if (!geocache[address]) {
                geocache[address] = geocoder.getLatLng(address);
            }
            console.log(address + ": " + geocache[address]);
            return geocache[address];
        },
        getCount: function () {
            var count = 0;
            for (var code in geocache) { count++; }
            return count;
        }
    };
};

function run() {

    var geo = new GeoProxy();

    // geolocation requests

    geo.getLatLng("Paris");
    geo.getLatLng("London");
    geo.getLatLng("London");
    geo.getLatLng("London");
    geo.getLatLng("London");
    geo.getLatLng("Amsterdam");
    geo.getLatLng("Amsterdam");
    geo.getLatLng("Amsterdam");
    geo.getLatLng("Amsterdam");
    geo.getLatLng("London");
    geo.getLatLng("London");

    console.log("\nCache size: " + geo.getCount());
    
}
```

### Mediator

The Mediator pattern provides central authority over a group of objects by encapsulating how these objects interact. This model is useful for scenarios where there is a need to manage complex conditions in which every object is aware of any state change in any other object in the group.

![mediator](/images/mediator.webp)

```js
var Participant = function (name) {
    this.name = name;
    this.chatroom = null;
};

Participant.prototype = {
    send: function (message, to) {
        this.chatroom.send(message, this, to);
    },
    receive: function (message, from) {
        console.log(from.name + " to " + this.name + ": " + message);
    }
};

var Chatroom = function () {
    var participants = {};

    return {

        register: function (participant) {
            participants[participant.name] = participant;
            participant.chatroom = this;
        },

        send: function (message, from, to) {
            if (to) {                      // single message
                to.receive(message, from);
            } else {                       // broadcast message
                for (key in participants) {
                    if (participants[key] !== from) {
                        participants[key].receive(message, from);
                    }
                }
            }
        }
    };
};

function run() {

    var yoko = new Participant("Yoko");
    var john = new Participant("John");
    var paul = new Participant("Paul");
    var ringo = new Participant("Ringo");

    var chatroom = new Chatroom();
    chatroom.register(yoko);
    chatroom.register(john);
    chatroom.register(paul);
    chatroom.register(ringo);

    yoko.send("All you need is love.");
    yoko.send("I love you John.");
    john.send("Hey, no need to broadcast", yoko);
    paul.send("Ha, I heard that!");
    ringo.send("Paul, what do you think?", paul);
}
```

### Observer

The Observer pattern offers a subscription model in which objects subscribe to an event and get notified when the event occurs. This pattern is the cornerstone of event driven programming, including JavaScript. The Observer pattern facilitates good object-oriented design and promotes loose coupling.

![observer](/images/observer.webp)

```js
function Click() {
    this.handlers = [];  // observers
}

Click.prototype = {

    subscribe: function (fn) {
        this.handlers.push(fn);
    },

    unsubscribe: function (fn) {
        this.handlers = this.handlers.filter(
            function (item) {
                if (item !== fn) {
                    return item;
                }
            }
        );
    },

    fire: function (o, thisObj) {
        var scope = thisObj || window;
        this.handlers.forEach(function (item) {
            item.call(scope, o);
        });
    }
}

function run() {

    var clickHandler = function (item) {
        console.log("fired: " + item);
    };

    var click = new Click();

    click.subscribe(clickHandler);
    click.fire('event #1');
    click.unsubscribe(clickHandler);
    click.fire('event #2');
    click.subscribe(clickHandler);
    click.fire('event #3');
}
```

### Visitor

The Visitor pattern defines a new operation to a collection of objects without changing the objects themselves. The new logic resides in a separate object called the Visitor.

![visitor](/images/visitor.webp)

```js
var Employee = function (name, salary, vacation) {
    var self = this;

    this.accept = function (visitor) {
        visitor.visit(self);
    };

    this.getName = function () {
        return name;
    };

    this.getSalary = function () {
        return salary;
    };

    this.setSalary = function (sal) {
        salary = sal;
    };

    this.getVacation = function () {
        return vacation;
    };

    this.setVacation = function (vac) {
        vacation = vac;
    };
};

var ExtraSalary = function () {
    this.visit = function (emp) {
        emp.setSalary(emp.getSalary() * 1.1);
    };
};

var ExtraVacation = function () {
    this.visit = function (emp) {
        emp.setVacation(emp.getVacation() + 2);
    };
};

function run() {

    var employees = [
        new Employee("John", 10000, 10),
        new Employee("Mary", 20000, 21),
        new Employee("Boss", 250000, 51)
    ];

    var visitorSalary = new ExtraSalary();
    var visitorVacation = new ExtraVacation();

    for (var i = 0, len = employees.length; i < len; i++) {
        var emp = employees[i];

        emp.accept(visitorSalary);
        emp.accept(visitorVacation);
        console.log(emp.getName() + ": $" + emp.getSalary() +
            " and " + emp.getVacation() + " vacation days");
    }
}
```

### Conclusion

As we conclude our journey through JavaScript design patterns, it’s clear that these powerful tools play a vital role in crafting maintainable, scalable, and efficient code. By understanding and implementing these patterns, you’ll not only elevate your programming skills but also create a more enjoyable development experience for yourself and your teammates.

Remember, design patterns are not a one-size-fits-all solution. It’s crucial to analyze your project’s unique requirements and constraints to determine which patterns will bring the most value. Continuously learning and experimenting with different design patterns will enable you to make informed decisions and select the best approach for your projects.

Incorporating design patterns into your workflow may require an initial investment of time and effort, but the long-term benefits are well worth it. As you master the art of writing elegant, modular, and efficient JavaScript code, you’ll find that your applications become more robust, your debugging process more manageable, and your overall development experience more enjoyable.

So, go forth and explore the world of JavaScript design patterns, and may your code be ever more maintainable, scalable, and efficient.

Happy coding! 🚀