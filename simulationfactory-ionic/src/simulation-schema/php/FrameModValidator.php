<?php

require_once('/usr/share/php/simulation-schema/vendor/autoload.php');
use JsonSchema\SchemaStorage;
use JsonSchema\Validator;
use JsonSchema\Constraints\Factory;
use JsonSchema\Constraints\Constraint;


// Accept Input and print it
$data = json_decode(file_get_contents('php://input'));

// Add correct path for comparison Schema
$path = file_get_contents(__DIR__ . '/../schema/FrameModification.json');
$JSONFile = json_decode($path);

// Correct the referenced User Property
$JSONFile-> properties->user->{'$ref'} = 'file://'.__DIR__.'/../schema/User.json';

// Correct the referenced User Property
$JSONFile-> properties->effects->items->{'$ref'} = 'file://'.__DIR__.'/../schema/Effect.json';

// Create new Validator obj and validate $data against the schema ($JSONFile)
$validator = new Validator();
$validator-> validate($data, $JSONFile); // validates!

if ($validator->isValid()) {
	//cannot include the echop as the PHP sees this as a return type
	//echo "The supplied JSON validates against the schema.\n";
} else {
	throw new Exception("JSON does not validate.\n");

}
?>

