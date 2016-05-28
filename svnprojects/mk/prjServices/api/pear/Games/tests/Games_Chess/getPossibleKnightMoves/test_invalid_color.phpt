--TEST--
Games_Chess->getPossibleKnightMoves() invalid color
--SKIPIF--
--FILE--
<?php
require_once dirname(__FILE__) . '/setup.php.inc';
$err = $board->getPossibleKnightMoves('a1', 'Q');
$phpunit->assertErrors(array(
    array('package' => 'PEAR_Error', 'message' => '"Q" is not a valid piece color, try W or B')
), 1);
echo 'tests done';
?>
--EXPECT--
tests done