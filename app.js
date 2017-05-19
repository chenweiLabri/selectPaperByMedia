var fs=require('fs');
var request = require('request');
const doesInclude = require('does-include');

// var originalFile = 'Documents/snowballingpapers.json';
// var comparePath = 'Documents/comparepapers.json';
//var writeFilePath = 'Documents/ncomparepapersnuw.json';

//var newPath = 'Documents/ncomparepapersnuw.json';

var module2 = 'Documents2/module2.json';
var originalFile = 'Documents2/snowballingpapers.json';
var comparePath = 'Documents2/comparepapers.json';
//var writeFilePath = 'Documents2/references.json';

compare(originalFile,comparePath);
//changeType(module2,writeFilePath);

function changeType(module2,originalFile){
	var origianlPapers = getOriginalTitles(module2);
	console.log(origianlPapers.length);
	saveTitles(origianlPapers,originalFile);
}

//saveReferencesTitles(comparePath,writeFilePath);
function compare(originalFile,comparePath){
	var selectedPapers = getTitles(comparePath);//papers which we have read and select
	var origianlPapers = getTitles(originalFile);//the titles to find the references
	
	//getTitles(C);//the titles to find the references
	var newPaper = [];
	console.log(selectedPapers.length);
	console.log(origianlPapers.length);
	var restPapers = [];
	var restLen = 0;
	var apiPapers = [];
	var apiLen = 0;
	var webPapers = [];
	var webLen = 0;


	for(var i in origianlPapers){
		var refPath = 'Documents2/references/'+origianlPapers[i]+'.json';		
		var refTitles = getTitles(refPath);	
		//console.log(refTitles);	
		if(refTitles!=null){
			//console.log(refTitles.length);
			for(var j in refTitles){
				//console.log("------------------------------------");
				var titlesRef = refTitles[j];
				if(titlesRef!=null){
					var titlesRefLower = titlesRef.toLowerCase();

					for(var k in selectedPapers){
						var compared = selectedPapers[k];
						if(compared!=null){
							var comparedLower = compared.toLowerCase();
							//if(doesInclude(titlesRefLower, ['eh', comparedLower])||doesInclude(comparedLower, ['eh', titlesRefLower])){
							if(titlesRefLower.indexOf(comparedLower)>=0||comparedLower.indexOf(titlesRefLower)>=0){
								//console.log(k);
								break;//stop this inside loop
							}
							if(k==(selectedPapers.length-1)){
								var len = selectedPapers.length;
								var newLen = 0;
								if(newPaper!=null){
									newLen = newPaper.length;
								}
								
								selectedPapers[len] = titlesRef;
								newPaper[newLen] = titlesRef;
								//console.log("not read this paper ========================="+titlesRef);
							}				

						}
						
					}

				}
			}
		}
		
	}


	console.log(selectedPapers.length);

	console.log(newPaper.length);

	var restPapers = [];
	var restLen = 0;
	var apiPapers = [];
	var apiLen = 0;
	var webPapers = [];
	var webLen = 0;
	for(var item in newPaper){
		if(newPaper[item]!=null){
			var temp = newPaper[item];
			var tempLower = temp.toLowerCase();
			tempLower = tempLower.toString();
			if(doesInclude(tempLower, ['eh', 'rest'])){				
				if(restPapers!=null){
					restLen = restPapers.length;
				}
				restPapers[restLen] = temp;
			}else{
				if(doesInclude(tempLower, ['eh', 'api'])){
					if(apiPapers!=null){
						apiLen = apiPapers.length;
					}
					apiPapers[apiLen] = temp;
				}else{
					if(doesInclude(tempLower, ['eh', 'web service'])){				
						if(webPapers!=null){
							webLen = webPapers.length;
						}
						webPapers[webLen] = temp;
					}
				}				

			}
		}		
	}
	console.log(restPapers.length);
	//console.log(restPapers);
	var restPapersPath = 'Documents/references.json';
	//saveTitles(restPapers,restPapersPath);
	
	console.log(apiPapers.length);
	//console.log(apiPapers);
	console.log(webPapers.length);
	console.log(webPapers);
	//saveTitles(selectedPapers,writeFilePath);


	//console.log(apiPapers);
	//console.log(webPapers);
	// var restRefs = [];
	// var lenrestRefs = 0;

	// for(var i in restPapers){
	// 	var ref = restPapers[i];
	// 	//console.log(ref);
	// 	if(ref!=null){
	// 		var refLower = ref.toLowerCase().toString();
	// 		var flag = true;
	// 		for(var j in selectedPapers){				
	// 			var sel = selectedPapers[j];
	// 			if(sel!=null){
	// 				var selLower = sel.toLowerCase().toString();
	// 				//console.log(refLower+'*******************************');
	// 				//console.log(selLower+'--------------------------------');
	// 				doesInclude(refLower, ['eh', selLower])
	// 				//if(doesInclude(refLower, ['eh', selLower])||doesInclude(selLower, ['eh', refLower])){
	// 				if(refLower.indexOf(selLower)>=0||selLower.indexOf(refLower)>=0){
	// 					//console.log(refLower+'*******************************');
	// 					//flag = false;
	// 					//console.log(refLower+'*******************************');
	// 				    //console.log(selLower+'--------------------------------');
	// 				    break;
	// 					//continue;
	// 				}

	// 				if(j == (selectedPapers.length-1)&&flag){
	// 					if(restRefs!=null){
	// 						lenrestRefs = restRefs.length;
	// 					}
	// 					restRefs[lenrestRefs] = ref;
						
	// 				}		


	// 			}



	// 		}


	// 	}

	// }

	// console.log(restRefs.length);


}


function saveTitles(paperTitles,writePath){
	console.log(writePath);
	if(paperTitles.length>0){
		var temp = JSON.stringify(paperTitles);
		//console.log(temp);
		fs.writeFileSync(writeFilePath, temp);  
	}
}


//get the original titles of the papers of snowballing(first input)
function getOriginalTitles(originalFile) {
	if(fs.existsSync(originalFile)){
    
      var result=JSON.parse(fs.readFileSync(originalFile));
      var origianlPapers = [];
      for (var item in result) {
        origianlPapers[item] = result[item].title;   
      }
      return(origianlPapers);
    
    } 
}

//read json file to get the titles
function getTitles(readpath) {
	var result = null;
	if(fs.existsSync(readpath)){
		result=JSON.parse(fs.readFileSync(readpath));		
	}
    return(result);   
}



function saveReferencesTitles(originalFile,writeFilePath){
  getOriginalTitles(originalFile,function(jsonStr){
    //console.log(jsonStr);
    if(jsonStr.length>0){
      var temp = JSON.stringify(jsonStr);
      fs.writeFileSync(writeFilePath, temp);
    }
  }); 
}

//compare the papers which have been selected
// function comparePapers(original_title){
// 	var path = 'Documents/references/'+original_title+'.json';
// 	if(fs.existsSync(path)){
// 		console.log("existsSync");
// 		//read the original paper to get references
// 	}else{
// 		console.log("not existsSync");
// 	}
// }
