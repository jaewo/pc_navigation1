window.addEventListener("load", function(){
	/*
	var depth1Ul=document.querySelector("nav > ul");
	var depth1Li=document.querySelectorAll("nav > ul > li");
	var lastLi=document.querySelectorAll("nav li li:last-child");
	var lastLastLi=document.querySelector("nav li:last-child li:last-child");

	for(var i=0; i<depth1Li.length; i++){
		// depth1Li[i].addEventListener("mouseover", function(e){
		// depth1Li[i].addEventListener("mouseout", function(e){
		// mouseover, mouseout : Bubbles Yes, Capture Yes
		// mouseenter, mouseleave : Bubbles No, Capture No
		depth1Li[i].addEventListener("mouseenter", function(e){ // info : nav > ul > li
			depth1Ul.classList.add("over");
		});
		depth1Li[i].addEventListener("mouseleave", function(e){
			depth1Ul.classList.remove("over");
		});

		// console.log(depth1Li[i].childNodes);
		// console.log(depth1Li[i].children);

		var depth1=depth1Li[i].children[0]; // info : nav > ul > li > a
		// console.log(depth1);
		depth1Li[i].index=i;

		depth1.addEventListener("focusin", function(e){
			// console.log("focusin event");
			e.target.classList.add("over");

			if(e.target.parentNode.index == 0){
				depth1Ul.classList.add("over");
			}
		});
	}

	for(var j=0; j<lastLi.length; j++){
		lastLi[j].addEventListener("focusout", function(e){ // info : nav li li:last-child
			// console.log("focusout event!!");
			// console.log(e.currentTarget.parentElement.previousElementSibling);
			var link=e.currentTarget.parentElement.previousElementSibling; // info : nav > ul > li > a
			link.classList.remove("over");
		});
	}

	lastLastLi.addEventListener("focusout", function(e){ // info : nav li:last-child li:last-child
		// console.log("focusout event!!");
		depth1Ul.classList.remove("over");
	});
	*/

	var depth1Ul=document.querySelector("nav > ul");
	var depth1Li=null;
	var lastLi=null;
	var lastLastLi=null;
	var requestURL="../data/menu.json";
	var request=new XMLHttpRequest();
	var depth1HTML="";
	var num=0;

	function init(){
		setTimeout(function(){
			request.open("GET", requestURL, true);
			request.responseType="json";
			request.send();
			request.addEventListener("load", function(){
				var data=request.response;
				// console.log(data);

				// 1Depth drawing
				for(key1 in data){
					// console.log(key1+" : "+data[key]);
					// <a href="#">main1</a>
					depth1HTML+='<li class="menu">'+'\n';
					depth1HTML+='<a href="#">'+key1+'</a>'+'\n';
					depth1HTML+='<ul class="sub">'+'\n';
					depth1HTML+='</ul>'+'\n';
					depth1HTML+='</li>'+'\n';
				}
				// console.log("depth1 : "+depth1HTML);
				depth1Ul.innerHTML=depth1HTML;
				depth1Li=document.querySelectorAll("nav > ul > li");
				// console.log(depth1Li);

				// 2Depth drawing
				for(key1 in data){
					var depth2HTML='';

					for(key2 in data[key1]){
						// console.log(key2+" : "+data[key1][key2]);
						// <li><a href="#">sub11</a></li>
						depth2HTML+='<li>'+'\n';
						depth2HTML+='<a href="#">'+data[key1][key2]+'</a>'+'\n';
						depth2HTML+='</li>'+'\n';
					}
					// console.log("depth2 : "+depth2HTML);
					depth1Li[num].children[1].innerHTML=depth2HTML;
					num++;
				}

				lastLi=document.querySelectorAll("nav li li:last-child");
				lastLastLi=document.querySelector("nav li:last-child li:last-child");

				for(var i=0; i<depth1Li.length; i++){
					depth1Li[i].addEventListener("mouseenter", function(e){
						depth1Ul.classList.add("over");
					});
					depth1Li[i].addEventListener("mouseleave", function(e){
						depth1Ul.classList.remove("over");
					});

					var depth1=depth1Li[i].children[0]; // info : nav > ul > li > a
					// console.log(depth1);
					depth1Li[i].index=i;

					depth1.addEventListener("focusin", function(e){
						// console.log("focusin event");
						e.target.classList.add("over");

						if(e.target.parentNode.index == 0){
							depth1Ul.classList.add("over");
						}
					});
				}

				for(var j=0; j<lastLi.length; j++){
					lastLi[j].addEventListener("focusout", function(e){
						var link=e.currentTarget.parentElement.previousElementSibling;
						link.classList.remove("over");
					});
				}

				lastLastLi.addEventListener("focusout", function(e){
					depth1Ul.classList.remove("over");
				});
			});
		}, 10);
	}
	init();
});