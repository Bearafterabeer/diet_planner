

// hide loading indicator
function hideLoadingIndicator() {
  document.getElementById('loadingIndic').style.display = 'none';
};

// shows an error if there is a error with loading the data
function showXhrError() {
  document.getElementById('hxrErrorContainer').classList.remove('d-none');
  hideLoadingIndicator();
};


// create database and store data
function initStore(diets) {
  connection.createDb(db);
  // collect diets information conresponding to dietsTable format
  var dietsValues = [];
  // generated Id for each diet to relate meals to it
  var dietId = 1;
  // collect meals information conresponding to mealsTable format
  var mealsValues = [];
  // generated Id for each meal
  var mealId = 1;
  for (var i = 0; i < diets.length; i++) {
    var diet = diets[i];
    // store diet value
    var dietValue = {
      id: dietId,
      name: diet.name,
      description: diet.description,
      teaser: diet.teaser,
      exercises: diet.exercises,
      image: diet.image
    };
    // walk through meals
    for (var j = 0; j < diet.meals.length; j++) {
      //current meal type
      var mealType = diet.meals[j].type;
      // meal type options
      var mealOptions = diet.meals[j].options;
      //add image for meal type to diet table
      dietValue[mealType+'image'] = diet.meals[j].image;
      // walk through meal options
      for (var k = 0; k < mealOptions.length; k++) {
        var option = mealOptions[k];
        // add meal information
        mealsValues.push({
          id: mealId,
          name: option.name,
          description: option.description,
          teaser: option.teaser,
          type: mealType,
          dietId: dietId
        });
        mealId++;
      }
    }
    // add diet information
    dietsValues.push(dietValue);
    dietId++;
  }
  // insert diets information into diets table
  connection.insert({
    into: "Diets",
    values: dietsValues
  });
  // insert meals information into meals table
  connection.insert({
    into: "Meals",
    values: mealsValues
  });
  renderDiets();
}

// load data from the API
function loadData() {
  //get the list availbale diets
  $.ajax({
      url: 'diets/config.json',
      dataType: 'json'
    })
    .done(function(diets) {
      // list of stored diets from API
      var loadedDiets = [];
      for (var i = 0; i < diets.length; i++) {
        // get diet's data
        $.ajax({
          url: 'diets/' + diets[i],
          dataType: 'json'
        }).done(function(diet) {
          // add diet data to the list
          loadedDiets.push(diet);
          //if all diets loaded
          if (diets.length === loadedDiets.length) {
            initStore(loadedDiets);
          }
        }).catch(showXhrError);
      }
    })
    .catch(showXhrError);
}

// show diets to select from
function renderDiets() {
  hideLoadingIndicator();
  // handle click on diet button
  $('#dietPlanForm')
    .removeClass('d-none')
    .on('click', 'a', function(ev) {
      // get diet Id from input value
      var dietId = parseInt($(this).parent().find('input').prop('checked', true).val());
      // remove any previous selections
      connection.remove({
        from: 'Selection'
      }).then(function(){
        // store the new selection
        connection.insert({
          into: 'Selection',
          values: [{
            dietId: dietId,
            breakfastId: 0,
            lunchId: 0,
            dinnerId: 0,
            snackId: 0
          }]
        }).then(function(){
          //redirect to meals selection
          window.location.href= "mealsselection.html";
        });
      });
      return false;
    });

  // get the template for diet option
  var template = $('#dietOptionTemplate').html();
  // select all diets from diets table
  connection.select({
    from: 'Diets',
  }).then(function(diets) {
    // render each diet in html
    var rendered = Mustache.render(template, {
      "diets": diets
    });
    // append the html to the form
    $('#dietPlanForm .row').html(rendered);
  }).catch(function(err) {
    console.log(err);
    alert(err.message);
  });
}

// called when the page is ready
function init() {
  // check if database exists
  connection.isDbExist(db.name).then(function(isExist) {
    if (isExist) {
      //it exists then open database and render diets
      connection.openDb(db.name);
      renderDiets();
    } else {
      //needs to create database with data from API
      loadData();
    }
  }).catch(function(err) {
    console.error(err);
  })
}

$(init)
