json Table
=========

A simple jQuery plugin to get your JSON data on a table.

Gettings started
----------------
You can use a table already attached to the DOM, or one you created in memory. jsonTable needs at least a thead with a tr, and a tbody. If they don't exist, they will be created.

Initialize the table with the columns titles, and json identities to look for in the loaded file.
```javascript
$("#dataTable").jsonTable({
	head : ['N.', 'Model','Operating System','Market Share'], // Goes on the <thead>
	json : ['*', 'model', 'name', 'share'] //json identities from the loaded json object
});				       // NOTE : an '*' identity will generate an autoincremented column
```

The JSON data in this case looks something like this.
```json
[
    {"model" : "Iphone 18", "name" : "iOS", "share" : 57.56},
    {"model" : "Nexus 23", "name" : "Android", "share" : 24.66},
    {"model" : "Tom-tom", "name" : "Java ME", "share" : 10.72},
    {"model" : "Nokia 66610", "name" : "Symbian", "share" : 2.49},
    {"model" : "Blackberry", "name" : "Blackberry", "share" : 2.26},
    {"model" : "Lumia", "name" : "Windows Phone", "share" : 1.33}
]
```

Update the table from a JSON file. This could be the url to your JSON endpoint. Currently only GET requests are supported.
```javascript
$("#dataTable").jsonTableUpdate("data.json");
```

####OR

Update data from a JSON object.
```javascript
$("#dataTable").jsonTableUpdate([
    {"id" : 1, "name" : "iOS", "share" : 57.56},
    {"id" : 2, "name" : "Android", "share" : 24.66},
    {"id" : 3, "name" : "Java ME", "share" : 10.72},
    {"id" : 4, "name" : "Symbian", "share" : 2.49},
    {"id" : 4, "name" : "Blackberry", "share" : 2.26},
    {"id" : 4, "name" : "Windows Phone", "share" : 1.33}
]);
```
