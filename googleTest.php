<?php


include ('mysqlconnect.php');
$hitQuery = 'select * from hitCount';
$result = mysqli_query($con, $hitQuery) or die(mysqli_error);
$return = mysqli_fetch_array($result, MYSQL_BOTH);
$hits = $return['count'];
$newCount = $hits++;
$hitQuery = 'update hitCount set count = '.$newCount;
mysqli_query($con, $hitQuery) or die(mysqli_error($con));

$approxTileLength = 300;
$backgroundWidth = 5000;

$MaxScroll = $approxTileLength * $newCount;
$maxBGs = ceil($MaxScroll / $backgroundWidth);




 $forbiddenHosts = 
 array(
 'freewallsource.com',
 'hdwallsource.com',
 'hdwallpaperd.com',
 'wallpaperswide.com',
 'hdwallpaperin.net',
 'clickhdwallpapers.com',
 '7-themes.com',
 'thewinmedia.com');

function getImageSearch($search, $numPerPage, $startNum)
{

$url = "https://ajax.googleapis.com/ajax/services/search/images?" .
       "v=1.0&q=".$search."&userip=jim.reilly.jr@gmail.com&rsz=".$numPerPage."&imgsz=huge&start=".$startNum."&as_filetype=jpg|png";

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_REFERER, 'http://52.0.55.87/dick');
$body = curl_exec($ch);
curl_close($ch);

return $body;
}

$urlArray = array();


$numBGsUsed = 0;
$numPerPage = 8;
$searchTerm = 'Space+Wallpaper';
$searchTerms = array(
'Space+Wallpaper',
'funny+wallpaper',
'Beach+wallpaper', 
'underwater+wallpaper', 
'forest-wallpaper', 
'cartoon-wallpaper');

for ($i=0; $i<5; $i++)
{
	$searchTerm = $searchTerms[$i];
	if ($numBGsUsed < $maxBGs)
	{
		$data = json_decode(getImageSearch($searchTerm, $numPerPage, $numPerPage*$i));
		foreach ($data->responseData->results as $result) 
		{
		$imgUrl = $result->url;
		$width = $result->width;
		$urlBlocked = false;

		for ($j=0; $j<count($forbiddenHosts); $j++)
			{
			if (strpos($imgUrl, $forbiddenHosts[$j]) !== false)
				{
				$urlBlocked = true;
				} else
				{
				}
			}
		if (!$urlBlocked)
			{
			array_push($urlArray, array($result->url, $result->width));
			$numBGsUsed++;
			}
		}
	}
}

$query = "delete from BGUrls";
mysqli_query($con, $query) or die(mysqli_error($con));

$query = '';
for ($i=0; $i<count($urlArray); $i++)
{
	echo '<br>trying to insert '.$urlArray[$i][0].', width is '.$urlArray[$i][1];
	$query.= "insert into BGUrls values ('', '".$urlArray[$i][0]."'); ";
}

echo "hit count is ".$newCount.", required ".$maxBGs.", and downloaded ".$numBGsUsed;

mysqli_multi_query($con, $query) or die(mysqli_error($con));

?>