window.onload = function()
{
	
	console.log(Date.now());
	var loadingDiv = document.getElementById('loadingBG');
	var timer = 1;
	var loadingFadeOut = setInterval(function()
	{
		timer++;
		if (timer > 40)
		{
			clearInterval(loadingFadeOut);

			if (window.XMLHttpRequest)
			{
				xmlhttp = new XMLHttpRequest();
			}
			else
			{
				xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
			}
			xmlhttp.onreadystatechange = function ()
			{
				if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
				{
					
					document.body.className='bodyClass';
					document.body.style.margin = '0px';
					document.body.innerHTML = xmlhttp.responseText;

					
					loadMove();


				}
			}
			xmlhttp.open("GET", "dick.php", true);
			xmlhttp.send();
		}
	},15);


}

function moveTouch(e)
{

	if(e.touches.length == 1){ 
		var touch = e.touches[0];
		var node = touch.target; 
		var touchX = touch.pageX;
	}
	var scrollWrapper = document.getElementById('scrollWrapper');
	var windowWidth = scrollWrapper.clientWidth;
	var windowMiddle = windowWidth / 2;
	var clickX = touchX;
	var xFromMiddle = windowMiddle - clickX;
	var xFromMiddlePCT = (-1) * (xFromMiddle / windowWidth) * 200;
	if (xFromMiddlePCT > 0)
	{
		var moveDir = 'pos'
	} else
	{
		var moveDir = 'neg'
	}

	var moveSpeed = 0;
	var maxSpeed = Math.round(xFromMiddlePCT);
	var accelInc = Math.abs(maxSpeed) / 20;
	var animateInt = setInterval(function()
	{
		moveSpeed += accelInc;
		if (moveDir == 'pos')
		{
		
			if (moveSpeed < 0)
			{
				clearInterval(animateInt);
			}
			scrollWrapper.scrollLeft += moveSpeed;
			if (moveSpeed > maxSpeed)
			{
				accelInc += (-1);
			}
		} else
		{
			if (moveSpeed < 0)
			{
				clearInterval(animateInt);
			}
			scrollWrapper.scrollLeft -= moveSpeed;
			if (moveSpeed > maxSpeed * (-1))
			{
				accelInc += (-1);
			}
		}

	}, 15);
}

function moveClick(e)
{

	var scrollWrapper = document.getElementById('scrollWrapper');
	var windowWidth = scrollWrapper.clientWidth;
	var windowMiddle = windowWidth / 2;
	var clickX = e.clientX;
	var xFromMiddle = windowMiddle - clickX;
	var xFromMiddlePCT = (-1) * (xFromMiddle / windowWidth) * 200;
	if (xFromMiddlePCT > 0)
	{
		var moveDir = 'pos'
	} else
	{
		var moveDir = 'neg'
	}

	var moveSpeed = 0;
	var accelInc = 1;
	var maxSpeed = Math.round(xFromMiddlePCT);
	var animateInt = setInterval(function()
	{
		moveSpeed += accelInc;
		if (moveDir == 'pos')
		{
		
			if (moveSpeed < 0)
			{
				clearInterval(animateInt);
			}
			scrollWrapper.scrollLeft += moveSpeed;
			if (moveSpeed > maxSpeed)
			{
				accelInc += (-1);
			}
		} else
		{
			if (moveSpeed < 0)
			{
				clearInterval(animateInt);
			}
			scrollWrapper.scrollLeft -= moveSpeed;
			if (moveSpeed > maxSpeed * (-1))
			{
				accelInc += (-1);
			}
		}

	}, 15);
}
function flashImages()
{
	var browserHeight = window.innerHeight;
	var browserWidth = window.innerWidth;
	var bgDivArray = document.getElementsByClassName('extraBackground');
	for (var i = 0;i<bgDivArray.length;i++)
	{
		bgDivArray[i].style.display = 'block';
		bgDivArray[i].style.opacity = '0';
	}


	refreshBackgroundSizes();
}

function refreshBackgroundSizes()
{

	var browserHeight = window.innerHeight;
	var browserWidth = window.innerWidth;
	var bgImgArray = document.getElementsByClassName('extraBackgroundImage');
	for (var i=0;i<bgImgArray.length;i++)
	{
		var displayType = bgImgArray[i].style.display;
		bgImgArray[i].style.display='block';
		var imgWidth = bgImgArray[i].clientWidth;
		var imgHeight = bgImgArray[i].clientHeight;
		bgImgArray[i].style.display=displayType;
		


		resizeElement(bgImgArray[i], browserWidth, browserHeight, imgWidth, imgHeight);

	}
}
function resizeElement(target, bW, bH, eW, eH)
{
	//console.log(eH);
	var extra = 0.1;
	var widthRatio = eW/bW;
	var heightRatio = eH/bH;

	if ((widthRatio >= 1) && (heightRatio >= 1))
	{
		target.style.zoom = '';
		//console.log('bigger');
		if (widthRatio > heightRatio)
		{
		target.style.maxHeight = bH * (1+extra);
		} else
		{
		target.style.maxWidth = bW * (1+extra);
		}
	} else
	{
		target.style.maxHeight = '';
		target.style.maxWidth = '';
		if (widthRatio > heightRatio)
		{
			var amountZoom = 1/heightRatio;
		} else
		{
			var amountZoom = 1/widthRatio;
		}
		target.style.zoom = amountZoom;
	}
}
function hideExtraTilesOnInit()
{
	var scrollWrapper = document.getElementById('scrollWrapper');
	var scrollWidth = scrollWrapper.scrollLeft;
	var browserWidth = window.innerWidth;
	
	var tiles = document.getElementsByClassName('dicktile');
	var currentTileLeft = 0;
	for (var i=0;i<tiles.length;i++)
	{
		var elWidth = tiles[i].clientWidth;
		//console.log(elWidth);
		currentTileLeft += elWidth;
		//console.log(currentTileLeft);
		if (currentTileLeft > browserWidth * 2)
		{
			
		tiles[i].style.visibility = 'hidden';
		}
	}
}
function scrollFunction()
{

	var BGUrlString = document.getElementById('BGUrlString').value;
	var BGUrlArray = BGUrlString.split(',');
	
	var scrollWrapper = document.getElementById('scrollWrapper');
	var scrollWidth = scrollWrapper.scrollLeft;
	var browserWidth = window.innerWidth;
	
	var tiles = document.getElementsByClassName('dicktile');
	var currentTileLeft = 0;
	for (var i=0;i<tiles.length;i++)
	{
		var elWidth = tiles[i].clientWidth;
		//console.log(elWidth);
		currentTileLeft += elWidth;
		//console.log(currentTileLeft);
		if (scrollWidth > currentTileLeft)
		{
			if (scrollWidth > currentTileLeft + (3*browserWidth))
			{
			} else
			{
		tiles[i].style.visibility = 'hidden';
			}
		} else
		{
		
		
			if (currentTileLeft > scrollWidth + (3 * browserWidth))

			{
			} else 
			{
				if ((currentTileLeft > scrollWidth + (2*browserWidth)))
				{
						tiles[i].style.visibility = 'hidden';
				} else
				{
						tiles[i].style.visibility = 'visible';
				}
			}

		}

	}
	var difBGNum = parseFloat(document.getElementById('numBGsHidden').value);

	var BGWidth = 5000;
	var fadeSpeed = 0.0005;
	var moveSpeed = 0.03;
	var moveCorrect = 50;
	//console.log(scrollWidth);
	
	var BGsToDrawAhead = 3;
	var BGNum = Math.floor((scrollWidth / BGWidth)) + BGsToDrawAhead;
	document.getElementById('numBGsHidden').value = BGNum;
	var drawAheadWidth = BGsToDrawAhead * BGWidth;
	console.log(drawAheadWidth);
	//console.log(BGNum);
	var lastBGNum = BGNum - 1;
	var newBG = document.getElementById('bg'+BGNum);
	var oldBG = document.getElementById('bg'+lastBGNum);

	var StartBGNum = 1;
	var bgSpan = document.getElementById('bgSpan');
	for (var i=1; i <= BGNum; i++ )
	{ 
		if (scrollWidth > (i * BGWidth) - drawAheadWidth)
	{
		if (!document.getElementById('bg'+i))
		{
			var currentBGDiv = document.createElement('div');
			currentBGDiv.id = 'bg'+i;
			currentBGDiv.className = 'extraBackground';
			var currentBGImg = document.createElement('img');
			currentBGImg.src = BGUrlArray[i];
			currentBGImg.className = 'extraBackgroundImage';
			currentBGDiv.appendChild(currentBGImg);
			bgSpan.appendChild(currentBGDiv);
			currentBGDiv.style.display = 'block';
			currentBGDiv.style.visibility = 'hidden';


		}
	}

	
	}
	for (var i = 1;i < difBGNum+1; i++ )
	{
		//console.log('scrollWidth: '+scrollWidth+', BGWidth * i: '+(BGWidth * i));
		var currentBG = document.getElementById('bg'+i);
		if (scrollWidth > (BGWidth * i))
		{
			if (scrollWidth > (BGWidth * (i+2)))
		{
			currentBG.style.visibility = 'hidden';
		} else
			{
			var newPos = ((scrollWidth - (BGWidth * i)) * moveSpeed * (-1))
			if ((BGWidth * (i+1)) > scrollWidth)
			{
			currentBG.style.visibility = 'visible';
			currentBG.style.opacity = (scrollWidth - (i*BGWidth)) * fadeSpeed;
			
			translateHW(currentBG, newPos, 0, 0);
			//currentBG = document.getElement
			//console.log(i);
			} else {
			currentBG.style.visibility = 'visible';
			currentBG.style.opacity = 1 - ((scrollWidth - ((i + 1)*BGWidth)) * fadeSpeed);
			translateHW(currentBG, newPos, 0, 0);
			//currentBG.style.display = 'none';
			}
			}

		}	else {
			currentBG.style.visibility = 'hidden';
		}
		
		
		
	}

	/*
	if (scrollWidth > (BGWidth * BGNum))
	{
		newBG.style.display = 'block';
		newBG.style.opacity = (scrollWidth - (BGNum*BGWidth)) * fadeSpeed;
		oldBG.style.opacity = 1-((scrollWidth - BGWidth) * fadeSpeed);
	} else
	{
		newBG.style.display = 'none';
	}
	*/
}
function translateHW(target, x, y, z)
{
	target.style.webkitTransform = 'translate3d('+x+'px, '+y+'px, '+z+'px)';
	target.style.transform = 'translate3d('+x+'px, '+y+'px, '+z+'px)';
}
window.onorientationchange = function()
{
//refreshBackgroundSizes();
}

window.addEventListener('resize', function(event){

	//refreshBackgroundSizes();
  
});


function loadMove()
{
	
	
				var bottomPersonDiv = document.getElementById('bottomPersonDiv');
				var scrollBarHeight = document.getElementById('scrollWrapper').offsetHeight - document.getElementById('scrollWrapper').clientHeight + 1;
				//console.log(scrollBarHeight);
				bottomPersonDiv.style.bottom = scrollBarHeight;

				var accel = 1.08;
				var speed = 1;
				var speedInit = speed;
				//alert('what');
				var dickWidth = document.getElementById('totalDickWidth').value;
				//var dickWidth = 500;
				document.getElementById('scrollWrapper').style.width = '100%';
				document.getElementById('completedick').style.width = dickWidth+'px';
				var dickDiv = document.getElementById('completedick');		
		
				var currentPos = dickWidth * (-1);
				dickDiv.style.webkitTransform = 'translate3d('+currentPos+'px, 0px, 0px)';
				dickDiv.style.display = 'block';

				var dickSlideIn = setInterval(function() {
					document.getElementById('scrollWrapper').style.width = '';
					translateHW(dickDiv, (currentPos + speed), 0, 0); 
					
					if (Math.abs(currentPos) < (100 * speed))
					{
						
						if (!accelCalced)
						{
						var vF = 0;
						var vI = speed;
						var x = Math.abs(currentPos);
						var endAccel = ((vF*vF)-(vI*vI))/(2*x);
						var accelCalced = true;
						} else {
						}

						
						currentPos += speed;
						speed += endAccel;
						
					} else {

					currentPos += speed;
					speed *= accel;

					}
					
					if (currentPos > 0)
					{
						
					document.getElementById('scrollWrapper').style.width = '100%';
					translateHW(dickDiv, 0, 0, 0);
						clearInterval(dickSlideIn);
						
						flashImages();
						hideExtraTilesOnInit();
					}

				}, 15);


}

