// list of meals types
var types = ["breakfast", "lunch", "dinner", "snack"];
var currentSelection;

function validateSelection() {
  $('#generalFormError').addClass('d-none');
  $('#mealsForm .mealError').addClass('d-none');
  var hasError = false;
  var values = {};
  for (var i = 0; i < types.length; i++) {
    var type = types[i];
    var val = $('input[name=' + type + ']:checked').val();
    if (!val) {
      hasError = true;
      $('#' + type + 'Meals .mealError').removeClass('d-none')
    } else {
      values[type + 'Id'] = parseInt(val);
    }
  }
  if (hasError) {
    $('#generalFormError').removeClass('d-none');
    $('html, body').animate({
        scrollTop: document.getElementById('mealsForm').offsetTop
      },
      800
    );
  } else {
    connection.update({ in: 'Selection',
      where: {
        dietId: currentSelection.dietId
      },
      set: values
    }).then(function() {
      window.location.href= 'result.html';
    }).catch(function(err) {
      console.log(err);
    });
  }
  return false;
}

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


  for (var i = 0; i < types.length; i++) {
    //select meals by type and diet Id
    connection.select({
      from: "Meals",
      where: {
        dietId: selection.dietId,
        type: types[i]
      }
    }).then(function(meals) {
      renderMealOptions(meals)
    }).catch(function(err) {
      console.log(err);
      alert(err.message);
    });
  }
};

//render options for meal type
function renderMealOptions(meals) {
  // the type of meals
  var type = meals[0].type;
  // current options selected for this type of meal
  var toCheckAgainst = currentSelection[type+'Id'];
  // mark the selected option as checked
  for (var i = 0; i < meals.length; i++) {
    if (meals[i].id == toCheckAgainst) {
      meals[i].checked = true;
    }
  }
  //create object for template
  var typeOptions = {
    type: type,
    options: meals
  };
  var template = $('#mealOptionsTemplate').html();
  var rendered = Mustache.render(template,
    typeOptions
  );
  $('#' + type + 'Meals').append(rendered);
}

//render diet information into page
function renderDietInfo(diet) {
  var template = $('#dietInfoTemplate').html();
  var rendered = Mustache.render(template,
    diet
  );
  $('#dietInfo').html(rendered);

  //add images to each meal type
  for (var i = 0; i < types.length; i++) {
    var type = types[i];
    var id = type + 'Image';
    var image = diet[type+'image'];
    document.getElementById(id).style.backgroundImage = 'url('+image+')';
  }
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
        }
        currentSelection = selection[0];
        // read data from database coresponding to a selected diet
        readData(selection[0]);

        $("#mealsForm").on('submit', validateSelection);
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
