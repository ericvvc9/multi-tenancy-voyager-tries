<?php

if (! function_exists('isInsideAdmin')) { 
  function isInsideAdmin() {
    //relation
    return request()->route()->getPrefix() === '/admin';
  }
}

if (! function_exists('isRelationRequest')) { 
  function isRelationRequest() {
    //relation
    
    return strpos(request()->route()->uri, '/relation') !== false;
  }
}


