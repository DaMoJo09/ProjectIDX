# Superheroes

## Overview ## 

The superhero app is meant to allow users to create a superhero and add characteristics and powers displayed on a profile page. 

## Wireframe and ERD##

Files included in Github

## User Stories ##  
When the user initially visits the page the top navigation can direct them to the gallery which will house a list of superheros, create a superhero, or add a power to a superhero. 

A user will have the ability to: 
- Add, delete, or update a superhero
- Add, delete, or update a power for a superhero 

## Model ##
 Heroes: 
 - ID: String
 - Name: String
 - Gender: String
 - Mask: Boolean
 - Weapon: Boolean
 - Powers: Array

 Powers: 
 - ID: String
 - Power: String
 - Description: String

 ## Stretch Goals ## 
 - Add more heroes or options for users to customize
 - Set up user authoization to allow users their own superhero collection page

 ## Technology ## 
 - Express, Mongoose, Atlas, EJS, Layout, SASS

  ## Link ## 
  https://stormy-depths-79624.herokuapp.com/