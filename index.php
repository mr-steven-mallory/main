<pre>
<?php 
require "vendor/autoload.php";
require_once 'URL2.php';
use PHPHtmlParser\Dom;

$url = 'https://www.pinterest.se/pin/322640760783260616/';
$images = array();

$base = new Net_URL2($url);
$dom = new Dom;
$dom->loadFromUrl($url);

$contents = $dom->find('img');
//echo count($contents);

foreach ($contents as $content){

	$src = $base->resolve($content->getAttribute('src'));

	if ($src){
		$imageData = getimagesize($src);

		if (checkImageSize($imageData[0], $imageData[1])){

			$images[] = (object) [
			    'size' => $imageData[0]+$imageData[1],
			    'url' => (string)$src,
			];
		}
	}
}

function checkImageSize($width, $height){
	return ($width >= 230 && $height >= 100); // config
}

function sortImagesBySize($a, $b) {
	if ($a->size == $b->size){ return 0 ; }
	return ($a->size > $b->size) ? -1 : 1;
}

usort($images, 'sortImagesBySize');
print_r($images); // result

?>

</pre>