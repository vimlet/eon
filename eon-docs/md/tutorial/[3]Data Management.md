[Data management]<>
One of the main concerns a web application has to deal with is data management. The data required for each web application should be totally independent of each component functionality that composes the main application structure. This means that if our application needs a new data communication technology, we better anticipate this and be aware that the data handling techniques are modular and has nothing to do with the other application functionalities and the single structure elements logic. 

Therefore, Eon provides two tools to make this task easier:

- `eon-endpoint`: 
- `eon-store` 

[Endpoint]<>
The endpoint tool offers an API for data managing based on the commonly used web communication technologies (REST, Web Sockets, GraphQL). It is as easy as specifying the technology that is been used to communicate with the remote resource and the resource location: 

```[javascript]
var endpoint = new eon.endpoint("rest", "https://remote/source");
```

The endpoint API is based on the CRUD operations to manage with the data (`get`, `put`, `post`, `delete`). 

```[javascript]
endpoint.get("1", function (success, data) {
  // Resource data handling
  // ...
}
```

It is important to realize that when using GraphQL, it might be required a specific protocol to work with, that's why Eon includes another two types of GraphQL based endpoints: `graphHTTP` and `graphSockets`.

[Store]<>
The Eon store tool is basically a data container that provides a crud API for handling its data.

```[javascript]
var store = new eon.store();
store.data = new Map();
```

The store is based on the Javascript `Map` object to warehouse the data. As a consequence, it is not possible to pass to the store any different types of data. To overcome this issue Eon offers two functions for parsing the frequent Javascript types based data into a `Map` object:

```[javascript]
// Store data from an `Array` source
store.data = eon.util.arrayToMap([]]);
// Store data from an `Object` source
store.data = eon.util.objectToMap({});
```

Access the store data is really easy since the API provided is based on the main CRUD operations:

```[javascript]
// Store read
store.read(id).result(function (error, data) {
  // Resource handling
  // ...
});
```

Eon uses a specific strategy to handle the components data. The Eon components are not aware of the data source, they get their data from its own instance of the `eon.store` data type, meanwhile the store receives its data updates from an `eon-endpoint` instance operation. This approach converts the Eon components into a more powerful and data technology independent elements.




