// list of meals types
var types = ["breakfast", "lunch", "dinner", "snack"];
var currentSelection;

//get diet plan and meals options
function readData(selection) {
  // select diet from database
  connection.select({
    from: "Diets",
    where: {
      id: selection.dietId
    }
  }).then(function(diets) {
    renderDietInfo(diets[0]);
  }).catch(function(err) {
    console.log(err);
    alert(err.message);
  });

  //collect all meals ids
  var mealsToSelect = [];
  for (var i = 0; i < types.length; i++) {
    var type = types[i];
    mealsToSelect.push(currentSelection[type+'Id']);
  };
    //select meals from database
  connection.select({
    from: 'Meals',
    where: {
      id: {
        in: mealsToSelect
      }
    }
  }).then(function(meals) {
    renderMeals(meals);
  }).catch(function(err) {
    console.log(err);
    alert(err.message);
  });
};

//render meals information
function renderMeals(meals) {
  //store meals with keys
  var mealsData = {};
  for (var i = 0; i < meals.length; i++) {
    var meal = meals[i];
    mealsData[meal.type]= meal;
  }
  var template = $('#mealsInfoTemplate').html();
  var rendered = Mustache.render(template, mealsData);
  $('#mealsInfo').html(rendered);
}

//render diet information into page
function renderDietInfo(diet) {
  var template = $('#dietInfoTemplate').html();
  var rendered = Mustache.render(template,
    diet
  );
  $('#dietInfo').html(rendered);
  $('#exercisesInfo').html(diet.exercises);
}

//called when document is ready
function init() {
  // check if database exists
  connection.isDbExist(db.name).then(function(isExist) {
    if (isExist) {
      //it exists then open database and render diets
      connection.openDb(db.name);
      connection.select({
        from: "Selection"
      }).then(function(selection) {
        //there is no selection or more than one
        if (selection.length != 1) {
          //clear all selections
          connection.remove({
            from: 'Selection'
          });
          //redirect to dietselection page to start new selection
          window.location.href = "dietselection.html";
          return;
        } else if (!selection[0].breakfastId) {
          //redirect to mealsselection page to start new selection
          window.location.href = "mealsselection.html";
          return;
        }
        currentSelection = selection[0];
        // read data from database coresponding to a selected diet
        readData(selection[0]);

      }).catch(function(err) {
        console.log(err);
        alert(err.message);
      });
    } else {
      //needs to redirect to dietselection page
      window.location.href = "dietselection.html";
    }
  }).catch(function(err) {
    console.error(err);
  })
};

$(init);
