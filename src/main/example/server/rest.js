module.exports = {
  setup: function(app, bodyParser) {

    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    // Greet example
    app.get("/greet/:name", function(req, res) {
      // body-parser allows access to request payload content
      // req.body
      res.status("200").send({ message: "Hello " + req.params.name });
    });
    
    // Fetch
    app.get("/users", function(req, res) {
      var responseArray = [];
      var sortArray = [];
      // Sort
      if (req.query.sortParam) {
        sortArray = data;
        // Do sort
        var desc = req.query.sortParam.substring(0, 1) === "-" ? true : false;
        var field = req.query.sortParam.substring(
          1,
          req.query.sortParam.length
        );
        if (desc) {
          // Default sort
          sortArray.sort(function(a, b) {
            return a[field] < b[field] ? 1 : -1;
          });
        } else {
          // Default ascending sort
          sortArray.sort(function(a, b) {
            return a[field] > b[field] ? 1 : -1;
          });
        }
      }

      // Range
      if (req.query.start && req.query.limit) {
        var range = sortArray[0] ? sortArray : data;
        for (var i = req.query.start; i <= req.query.limit; i++) {
          if (range[i - 1]) {
            responseArray.push(range[i - 1]);
          }
        }
      }
      // NOT USED -  Filter (grid example with searchbar)
      if (req.query.filterParam) {
        // Do filter
      }
      // List
      if (req.query.listParam) {
        // Do list
        responseArray = data;
      }
      // TODO response array is empty
      res.set("Total", Object.keys(data).length);
      // body-parser json allow response body parse to json
      res.status("200").send(data);
    });

    // Get all
    app.get("/users", function(req, res) {
      res.set("Total", Object.keys(data).length);
      // body-parser json allow response body parse to json
      res.status("200").send(data);
    });

    // Get
    app.get("/users/:id", function(req, res) {
      // body-parser json allow response body parse to json
      res.set("Total", Object.keys(data).length);
      res.status("200").send(data[req.params.id]);
    });

    // Create
    app.post("/users", function(req, res) {
      console.log('CREATE');
      data.push(req.body);
      // body-parser json allow response body parse to json
      res.status("200").send(data);
    });

    // Update
    app.post("/users/:id", function(req, res) {
      // console.log('req.body',req.body);
      for (var i = 0; i < data.length; i++) {
        // console.log('data[i]', data[i]);
        if (data[i].id === req.params.id) {
          // Merge properties
          for (var key in data[i]) {
            data[i][key] = req.body[key];
          }
        }
      }
      // body-parser json allow response body parse to json
      res.status("200").send(data);
    });

    // Replace
    app.put("/users/:id", function(req, res) {
      console.log('REPLACE', req.params.id, req.body);
      for (var i = 0; i < data.length; i++) {
        if (data[i].id === req.params.id) {
          data[i] = req.body;
        }
      }
      // body-parser json allow response body parse to json
      res.status("200").send(data);
    });

    // Remove
    app.delete("/users/:id", function(req, res) {
      delete data[req.params.id];
      // body-parser json allow response body parse to json
      res.status("200").send(data);
    });

    // DB
    var data = [
      {
        name: "Richard",
        lastname: "Illes",
        age: 22,
        phone: 666666666,
        dni: "458545524F",
        id: "0"
      },
      {
        name: "Jaime",
        lastname: "Perez",
        age: 23,
        phone: 111111111,
        dni: "845784517U",
        id: "1"
      },
      {
        name: "B",
        lastname: "Bunny",
        age: 24,
        phone: "2222222222",
        dni: "5451213546P",
        id: "2"
      }
    ];
  }
};
