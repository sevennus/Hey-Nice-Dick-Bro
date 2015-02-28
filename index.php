<?php

$numDifTiles = 28;
$numBGs = 2;

$otherFormats = array();
array_push($otherFormats, array(25, 'gif'));
array_push($otherFormats, array(27, 'gif'));

echo"
<html>
<head>
<title>Hey! Nice Dick, Bro!</title>
<link rel=\"shortcut icon\" href=hndbIcon.ico>
<link type=text/css rel=stylesheet href=stylesheet.css>
<script src=jquery.js></script>
<script src=dick.js></script>
</head>
<body class=loadingBody>
<div class=loadingBG id=loadingBG>
	<div class=loadingBGTitle><img src=moment.png class=loadingBGTitleImg></div>
	<div class=loadingBGImagesDiv>
		<div class=loadingDickTile><img src=balls.png class=loadingDickTileImg></div>";
	for ($i=1; $i<=$numDifTiles; $i++)
	{
		$ext = 'png';
		for ($j = 0; $j<count($otherFormats); $j++)
		{
			if ($otherFormats[$j][0] == $i)
			{
				$ext = $otherFormats[$j][1];
			}
		}

		echo "<div class=loadingDickTile><img src=".$i.".".$ext." class=loadingDickTileImg></div>";
	}
		echo "<div class=loadingDickTile><img src=head.png class=loadingDickTileImg></div>
		</div>
		<div class=loadingBGImagesDiv>";
	for ($i=1; $i<=$numBGs; $i++)
	{
		echo"<div class=loadingDickTile><img src=bg".$i.".jpg class=loadingDickTileImg></div>";
	}

	echo "
	</div>
</div>
</body>
</html>";

?>