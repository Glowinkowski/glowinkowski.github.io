
// TEMPORARY CODE for downloading JSON data
var jsonData = JSON.stringify(orderedList);

alert("Downloading JSON");

download(jsonData, 'getSurvey.json', 'text/plain');


// TEMPORARY CODE for downloading JSON data
function download(content, fileName, contentType) {
    var a = document.createElement("a");
    var file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
}
