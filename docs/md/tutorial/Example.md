# Tutorial Example
*[](https://vimlet.com/video/cta.webm)

@([html]
<head>
  <script>
    alert("hey");
    console.log("Richard");
  </script>
</head>
<body>
  <script>
  alert("Jose");
  console.log("log");
  </script>
  <div id="main">Main div</div>
  <button onclick="test();" type="button">Click Me!</button>
</body>
[/html]
[js]
function test() {
  alert("I'm JS");
}
console.log("Tamara")
[/js]

[css]
#main {
  background-color:red;
}

button {
  cursor:pointer;
}  
[/css])@


@([html]
<body>
  <script>
  console.log("log");
  </script>
  <div id="main">I use common head</div>
  <button onclick="test();" type="button">Click Me!</button>
</body>
[/html]
[js]
function test() {
  alert("I'm JS");
}
console.log("Tamara")
[/js]

[css]
#main {
  background-color:red;
}

button {
  cursor:pointer;
}  
[/css])@