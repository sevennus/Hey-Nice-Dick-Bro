<?php

 // START GETTING IMAGE URLS
include ('mysqlconnect.php');
$BGUrlString = '';
$BGHeightString = '';
$BGWidthString = '';
$query = 'select * from BGUrls';
$result = mysqli_query($con, $query);
while ($return = mysqli_fetch_array($result, MYSQL_BOTH))
{
	$BGUrlString .= $return['url'].',';
	$BGWidthString .= $return['width'].',';
	$BGHeightString .= $return['height'].',';
}

 //END GETTING IMAGE URLS


$startTime = microtime(true);


$query = "select count from hitCount";
$result = mysqli_query($con, $query) or die(mysqli_error($con));
$return = mysqli_fetch_array($result);
$count = $return['count'];
$newCount = $count + 1;
$query = "update hitCount set count = ".$newCount;
mysqli_query($con, $query) or die(mysqli_error($con));

$BGQuery = "select * from BGUrls";
$result = mysqli_query($con, $BGQuery);
$BGUrlString = '';
while ($return = mysqli_fetch_array($result, MYSQL_BOTH))
{
$BGUrlString .= $return['url'].',';
}


$numDifTiles = 28;
$numBGs = 2;

$otherFormats = array();
array_push($otherFormats, array(25, 'gif'));
array_push($otherFormats, array(27, 'gif'));

$adDicks = array(1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18);
$adChance = 0.1;



$tileWidth = 270;



$totalDickWidth = 150;
$imageNames = array(array('balls.png', false, 200));
$lastTile = 0;
for ($i=0; $i<$count; $i++)
{
	$currentTile = round(rand(1,$numDifTiles));
	while ($currentTile == $lastTile)
	{
		$currentTile = round(rand(1,$numDifTiles));
	}
	$ext = 'png';
	for ($j=0; $j<count($otherFormats);$j++)
	{
		if ($otherFormats[$j][0] == $currentTile)
		{
			$ext = $otherFormats[$j][1];
		} 

	}


	$adDick = false;
	for ($j=0; $j<count($adDicks); $j++)
	{
		if ($adDicks[$j] == $currentTile)
		{
			$adDick = true;
		}
	}
	array_push($imageNames, array($currentTile.".".$ext, $adDick, 0));
	$lastTile = $currentTile;
}
array_push($imageNames, array('head.png', false, 200));

for ($i=0; $i<count($imageNames); $i++)
{
	$image = new Imagick($imageNames[$i][0]);
	$width = $image->getImageWidth();
	$imageNames[$i][2] = $width;
	$totalDickWidth += $width;
}

echo "
<input type=hidden id=loadDickTime>
<input type=hidden id=loadWindowTime>
<input type=hidden id=BGUrlString value=".$BGUrlString.">
<input type=hidden id=BGWidthString value=".$BGWidthString.">
<input type=hidden id=BGHeightString value=".$BGHeightString.">
<div class=scrollWrapper id=scrollWrapper  onScroll=\"scrollFunction()\"
 onTouchEnd=\"showalert()\" onTouchMove=\"scrollFunction()\" onTouchStart=\"moveTouch(event)\">
	 <div class=bottomPersonDiv id=bottomPersonDiv>
		<div class=bottomPersonWrapper>
			<div class=bottomPersonImgWrapper>
				<img src=bottom1.png class=bottomPersonImg>
			</div>
			<div class=bottomPersonTextWrapper>
				
				<div class=bottomTextImageWrapper>
				<img src=HNDB1.png class=bottomPersonTextImg>
				</div>
			</div>
		</div>
		<div class=bottomTextWrapperCount id=siteHitCount>".$count." Visitors since 2-21-15<br>Want your pic on this hog? <a href=shaft.png target='_NEW' class=linkClass>Use this template</a> and submit it to HeyNiceDickBro@gmail.com</div>
	</div>
	<div id=completedick style=\"display:none;\" class=completedick>
		<div class=dicktile><img style=dickpic src=balls.png></div>";

for ($i=1; $i<$count; $i++)
{
	
	echo "<div class=dicktile>
		<div class=dickTileDivClass style=\"width:".$imageNames[$i][2].";\">
		<img class=dickpic src=".$imageNames[$i][0].">";
		

	echo "</div></div>";

}

echo "<div class=dicktile><img style=dickpic class=dickpic src=head.png></div>
	</div>
	<input type=hidden id=totalDickWidth value=".$totalDickWidth."></div>
</div>
<span id=bgSpan>
";
for ($i=1; $i<$numBGs + 1; $i++)
{
	echo "<div class=extraBackground id=bg".$i."><img src=bg".$i.".jpg class=extraBackgroundImage></div>";
}
echo "
</span>
<input type=hidden id=numBGsHidden value=".$numBGs."></div>";
?>
