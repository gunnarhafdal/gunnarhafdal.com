function compare(a,b) {
  if (a.frontpageOrdering == null && b.frontpageOrdering == null) {
    return 0;
  }
  if (a.frontpageOrdering == null) {
    return 1;
  }
  if (b.frontpageOrdering == null) {
    return -1;
  }
  if (a.frontpageOrdering < b.frontpageOrdering)
    return -1;
  if (a.frontpageOrdering > b.frontpageOrdering)
    return 1;
  return 0;
}

function addToList(definitions, list, parent) {
	var list = document.querySelector('div.'+ parent +' ul.' + list);
	for (var i = 0; i < definitions.length; i++) {
		var item = '<li>'+ definitions[i].frontpageOrdering + ' ' + definitions[i].qualifier + '</li>'
		list.insertAdjacentHTML('beforeend', item);
	}
}

function showSorted(json, parent) {
	var definitions = json.sampleDefinition;

	var milk = [];
	var water = [];
	var quality = [];

	for (var i = 0; i < definitions.length; i++) {
		switch(definitions[i].type){
			case "MILK": 
			milk.push(definitions[i]);
			break;
			case "QUALITY": 
			quality.push(definitions[i]);
			break;
			case "WATER": 
			water.push(definitions[i]);
			break;
			case "SETTLEMENT": 
			break;
		}
	}

	milk.sort(compare);
	water.sort(compare);
	quality.sort(compare);

	addToList(milk, 'milk', parent);
	addToList(water, 'water', parent);
	addToList(quality, 'quality', parent);
}

function loadData(file) {
	fetch('/qualityMenu_'+ file +'.json')
	  .then(function(response) {
	    return response.json()
	  }).then(function(json) {
	  	console.log(json);
	    showSorted(json, file);
	  }).catch(function(ex) {
	    console.log('parsing failed', ex);
	  })
}



document.addEventListener("DOMContentLoaded", function() {
	loadData('arla1');
	loadData('test');
	loadData('prod');
});