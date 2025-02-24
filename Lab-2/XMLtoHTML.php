<?php
// Завантаження XML і XSLT
$xml = new DOMDocument;
$xml->load('people.xml');

$xsl = new DOMDocument;
$xsl->load('people.xsl');

// Використання XSLTProcessor для трансформації
$proc = new XSLTProcessor;
$proc->importStylesheet($xsl);

// Виведення перетвореного HTML
echo $proc->transformToXML($xml);
?>