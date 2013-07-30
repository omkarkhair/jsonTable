json Table
=========

A simple jQuery plugin to get your JSON data on a table.

Gettings started
----------------
It is necessary to have a basic table structure with `<thead>` and `<tbody>` in place.
```html
<table id="dataTable">
	<thead>
	</thead>
	<tbody>
	</tbody>
</table>
```

###Initialize
Initialize the table with the head data, and json identities to look for in the loaded file.
```javascript
$("#dataTable").jsonTable({
	head : ['#','Operating System','Market Share'], // Goes on the <thead>
	json : ['id', 'name', 'share'] //json identities from the loaded json object
});
```

###JSON Data
The JSON data in this case looks something like this.
```json
[
{"id" : 1, "name" : "iOS", "share" : 57.56},
{"id" : 2, "name" : "Android", "share" : 24.66},
{"id" : 3, "name" : "Java ME", "share" : 10.72},
{"id" : 4, "name" : "Symbian", "share" : 2.49},
{"id" : 4, "name" : "Blackberry", "share" : 2.26},
{"id" : 4, "name" : "Windows Phone", "share" : 1.33}
]
```

###Update Table
`jsonTableUpdate` accepts the following options

```javascript
var options = {
	source : "data.json", // Can be a URL or a JSON object array
	rowClass : "rowClass", //optional class to be applied
	callback : function() { //Do something when table is updated }
}

$("#dataTable").jsonTableUpdate(options);
```

####OR

Update data from a JSON object.
```javascript
var obj = [
{"id" : 1, "name" : "iOS", "share" : 57.56},
{"id" : 2, "name" : "Android", "share" : 24.66},
{"id" : 3, "name" : "Java ME", "share" : 10.72},
{"id" : 4, "name" : "Symbian", "share" : 2.49},
{"id" : 4, "name" : "Blackberry", "share" : 2.26},
{"id" : 4, "name" : "Windows Phone", "share" : 1.33}
]

var options = {
	source : obj,
	rowClass : "rowClass",
	callback : function() { alert("Table updated."); }
}

$("#dataTable").jsonTableUpdate(options);
```