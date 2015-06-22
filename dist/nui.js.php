<?php

define('NUIROOT',dirname(dirname(__FILE__)));
$filelist = glob(sprintf('%s/src/plugins/*.js',NUIROOT));
sort($filelist);

// prepend our traits.
array_unshift($filelist,sprintf(
	'%s/src/nui-traits.js',
	NUIROOT
));

// prepend our utility stuff.
array_unshift($filelist,sprintf(
	'%s/src/nui-util.js',
	NUIROOT
));

// then prepend main to be first.
array_unshift($filelist,sprintf(
	'%s/src/nui-main.js',
	NUIROOT
));

ob_start();
foreach($filelist as $file) {
	$line = sprintf(
		"//// %s ",
		trim(str_replace(dirname(dirname($file)),'',$file),'/')
	);
	
	$line .= str_repeat('/',(79-strlen($line)));
	echo $line, PHP_EOL;
	
	echo file_get_contents($file);
	echo PHP_EOL, PHP_EOL;
}
$data = ob_get_clean();

file_put_contents(
	sprintf('%s/dist/nui.js',NUIROOT),
	$data
);

header("Content-type: text/javascript");
header("Content-length: ".strlen($data));
echo $data;
