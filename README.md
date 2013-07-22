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

Initialize the table with the head data, and json identities to look for in the loaded file.
```javascript
$("#dataTable").jsonTable({
	head : ['#','Operating System','Market Share'], // Goes on the <thead>
	json : ['id', 'name', 'share'] //json identities from the loaded json object
});
```

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