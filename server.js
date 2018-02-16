//express library
var express =  require('express');
var bodyParser = require('body-parser');

//express app
var app = express();

function checkObject(str){
	var start = str[0];
	var end = str[str.length-1]
	if(start == "{" && end == "}"){
		return true;
	}
	else{
		return false;
	}
}


function checkArray(str){
	var start = str[0];
	var end = str[str.length-1]
	if(start == "[" && end == "]"){
		return true;
	}
	else{
		return false;
	}
}

function checkStr(str){
	var start = str[0];
	var end = str[str.length-1]
	if(start == '"' && end == '"'){
		return true;
	}
	else{
		return false;
	}
}

function checkTrue(str){
	if(str == 'true'){
		return true;
	}
	else{
		return false;
	}

}
function checkFalse(str){
	if(str == 'false'){
		return true;
	}
	else{
		return false;
	}
}

function checkNull(str){
	if(str == 'null'){
		return true;
	}
	else{
		return false;
	}
}

function checker(str){
	if(checkObject(str))
		return 'JSONObject';
	else if(checkArray(str))
		return 'JSONArray';
	else if(checkStr(str))
		return 'String';
	else if(checkTrue(str))
		return 'Boolean';
	else if(checkFalse(str))
		return 'Boolean';
	else if(checkNull(str))
		return 'JSONObject';
	else 
		return 'int';
}

function getchecker(str){
	if(checkObject(str))
		return 'getJSONObject';
	else if(checkArray(str))
		return 'getJSONArray';
	else if(checkStr(str))
		return 'getString';
	else if(checkTrue(str))
		return 'getBoolean';
	else if(checkFalse(str))
		return 'getBoolean';
	else if(checkNull(str))
		return 'getObject';
	else 
		return 'getInteger';
}


function JSONObjecttostr(){
	return 	JSON.stringify(JsonObj);
}


function JSONObjectParser(data, objectname){
	var encode = "";
	for (var key in data) {
		var str = JSON.stringify(data[key]);
		encode  = encode + checker(str)+' '+key+' = '+ objectname +'.'+ getchecker(str)+'("'+key+'")'+';\n';
		if(checkObject(str)){
			encode = encode + JSONObjectParser(data[key],key);
		}
		else if(checkArray(str)){
			encode = encode + "for (int i = 0; i < "+key+".length(); i++) {\n";	
			encode = encode + JSONArrayParser(data[key],key);
			encode = encode + "}\n";
		}
	}
	return encode;
}


function JSONArrayParser(data, objectname){
	var element = data[0];
	var elementstr = JSON.stringify(element);
	var encode = "";

	if(checkObject(elementstr) || checkNull(elementstr)){
		encode = encode + checker(elementstr)+ ' '+objectname+"e = "+ objectname+'.'+getchecker(elementstr)+'(i)'+";\n";
		encode = encode + JSONObjectParser(element,objectname+'e');
	}
	else if(checkArray(elementstr)){
		encode = encode + checker(elementstr)+ ' '+objectname+"e = "+ objectname+'.'+getchecker(elementstr)+'(i)'+";\n";
		encode = encode + JSONArrayParser(element,objectname+'e');
	}
	else if(checkTrue(elementstr) || checkFalse (elementstr)){
		encode = encode + checker(elementstr)+ ' '+objectname+"e = "+ objectname+'.'+getchecker(elementstr)+'(i)'+";\n";
	}
	else {
		encode = encode + checker(elementstr)+ ' '+objectname+"e = "+ objectname+'.'+getchecker(elementstr)+'(i)'+";\n";
	}
	return encode;

}

app.use(bodyParser.json()); // support json encoded bodies
//canvas page (it loads canvas.html)
app.post('/convert', function(req, res) {
	var json = req.body;

	var jsonstr = JSON.stringify(json);
	if(checkObject(jsonstr)){
		encode = 'JSONObject main = new JSONObject(str) //Enter string of JSON\n';
		encode = encode + JSONObjectParser(json, "main");
		res.status(200).send(encode);
	}
	
});

app.use(express.static('public'));

app.post('/convert', function(req, res) {
	var json = req.body;

	var jsonstr = JSON.stringify(json);
	if(checkObject(jsonstr)){
		encode = 'JSONObject main = new JSONObject(str) //Enter string of JSON\n';
		encode = encode + JSONObjectParser(json, "main");
		res.status(200).send(encode);
	}
	
});

app.get('/googleab3b704dcf5738fc.html',function(req,res){


	//return canvas.html
	res.sendFile(__dirname + '/public/googleab3b704dcf5738fc.html');

});

app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});

console.log("Server running on port 3000");