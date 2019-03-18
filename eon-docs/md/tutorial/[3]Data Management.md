## Data management
One of the main concerns a web application has to deal with is data management. The data required for each web application should be totally independent of each component functionality that composes the main application structure. This means that if our application needs a new data communication technology, we better anticipate this and be aware that the data handling techniques are modular and has nothing to do with the other application functionalities and the single structure elements logic. 

Therefore, Eon provides two tools to make this task easier:

- `eon-endpoint`
- `eon-store` 
[Endpoint]<>
The endpoint tool offers an API for data managing based on the commonly used web communication technologies (REST, Web Sockets, GraphQL). It is as easy as specifying the technology that you are using to communicate with the remote resource and the resource location: 

```[javascript]
var restEndpoint = new eon.endpoint("rest", "https://remote/source");
```

### REST based
The endpoint interface is based on the HTTP operations to manage the data (`get`, `put`, `post`, `delete`). Once our REST endpoint instance is initialized, let's perform a read operation:

```[javascript]
restEndpoint.get("1", function (success, data) {
  if(success) {
    // Do something with item "1"
    // ...
  }
}
```

The `data` argument is an object containing useful response information (xhr object, the status, among others) and the requested data as a JSON.

Now we will see a `post` operation to see how to create a new data item:

```[javascript]
var item = {name: "new", properties: 2}

restEndpoint.send(item, function (success, data) {
  if(success) {
    // Item created successfully
    // ...
  }
}
```

The other HTTP operations are regulated by the same method. It's time to find out the other endpoint capabilities.

### Web Sockets based
This endpoint type is based on the Web Sockets API. Sending and receiving data using sockets is very easy. First, we have to define what we are going to handle the messages received through the socket:

```[javascript]
var socketEndpoint = new eon.endpoint("WebSockets", "https://remote/source");

var item = {
  name: "new item",
  properties: 2
}

socketEndpoint.onMessage(function(success, data){
  if(success) {
    // Socket message received
    // ...
  }
});
```
Once the listener is declared, we can make any request to send new data, and do whatever we want until a new message is sent back to the client. 

```[javascript]
socketEndpoint.send(item);
```

It is as simple as that.

### GraphQL based
Since GraphQL is a query language and only defines a standard to send and receive data from the back and front sides of an application, it is completely independent of any storage engine or data transfer protocol. 
This is the reason why using this technology it should be required a specific protocol to work with, that's why Eon includes two types of GraphQL based endpoints: `graphHTTP` and `graphSockets`.

As you probably already know, GraphQL defines three operations for handling the data: `query`, `mutation` and `subscription`. Following the meaning of these terms, we easily conclude that `graphSockets` endpoint type is intended to be used to perform the subscription operations, and the `graphHTTP` to perform queries and mutations.

Query operation (read data):
```[javascript]
var graphHTTP = new eon.endpoint("graphHTTP", "https://remote/source");
```

```[javascript]
var query = "{ 
  posts {
    title 
  } 
}";

graphHTTP.query(query, function (success, data) {
  if(success) {
    // Socket message received
    // ...
  }
});
```

Mutation operation (update data):
```[javascript]
var graphHTTP = new eon.endpoint("graphHTTP", "https://remote/source");
```
```[javascript]
var query = "{
  addItem(title: "post1"){
    title
  }
}";
endpointHTTP.mutation(query, function (success, data) {
  if(success) {
    // Updated item received
    // ...
  }
});
```

Subscription operation (socket subscription):
```[javascript]
var graphSockets = new eon.endpoint("graphSockets", "https://remote/source");
```
```[javascript]
var query = "{
  posts { 
    title  
  } 
}";

graphSockets.onMessage(function(success, data){
  if(success) {
    // Socket message received
    // ...
  }
});
graphSockets.subscribe(query);
```

These have been de main actions the endpoint tool offers. It is important to realize, even if it goes without saying, that all these client-side approaches need a backend implementation to work in a real situation that is foreign to these examples.

[Store]<>
The Eon store tool is basically a data container that provides a CRUD API for handling its data. It normalizes how components access data granting a uniform layer of interaction. 

```[javascript]
var store = new eon.store();
store.data = new Map();
```

The store uses Javascript `Map` to warehouse the data, which similar to `Object`, can hold keys and values, but has many advantages over a plain `Object`.

Learn more about `Map` advantages here: 
[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)

To leverage the data transformation into `Map`, Eon offers two functions that transforms data thats based on `Object` and `Array` types into `Map`.

```[javascript]
// Store data from an `Array` source
store.data = eon.util.arrayToMap([]]);
// Store data from an `Object` source
store.data = eon.util.objectToMap({});
```

Accessing the store data is really easy since the provided API is based on the main CRUD operations:

- Read an existing item:

```[javascript]
store.read(id).result(function (error, data) {
  // Handle read data
  // ...
});
```

- Create a new item:

```[javascript]
store.create(item).result(function (error, data) {
  // Handle created data
  // ...
});
```

- Update an existing item:

```[javascript]
store.update(id, item).result(function (error, data) {
  // Handle updated data
  // ...
});
```

- Delete an existing item:

```[javascript]
store.delete(id).result(function (error, data) {
  // Handle deleted data
  // ...
});
```

Eon uses a specific strategy to handle the components data. The Eon components are not aware of the data source, they get their data from its own instance of the `eon.store` data type. Meanwhile, the store receives its data updates from an `eon-endpoint` instance operation. This approach allows components to access data in the same way, regardless of the endpoint technology being used.




