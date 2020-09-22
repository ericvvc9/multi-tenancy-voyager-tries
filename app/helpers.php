<?php

if (! function_exists('isInsideAdmin')) { 
  function isInsideAdmin() {
    return request()->route()->getPrefix() === '/admin';
  }
}

