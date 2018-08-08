// create connection to JsStore instance
var connection = new JsStore.Instance(new Worker('js/jsstore.worker.min.js'));

//table to store user's preferences
var selectionTable = {
  name: "Selection",
  columns: [{
    name: "dietId",
    dataType: JsStore.DATA_TYPE.Number
  }, {
    name: "breakfastId",
    dataType: JsStore.DATA_TYPE.Number
  }, {
    name: "lunchId",
    dataType: JsStore.DATA_TYPE.Number
  }, {
    name: "dinnerId",
    dataType: JsStore.DATA_TYPE.Number
  }, {
    name: "snackId",
    dataType: JsStore.DATA_TYPE.Number
  }]
}

// table to store diets information from API
var dietsTable = {
  name: "Diets",
  columns: [{
    name: "id",
    primaryKey: true,
    dataType: JsStore.DATA_TYPE.Number
  }, {
    name: "name",
    dataType: JsStore.DATA_TYPE.String
  }, {
    name: "description",
    dataType: JsStore.DATA_TYPE.String
  }, {
    name: "teaser",
    dataType: JsStore.DATA_TYPE.String
  }, {
    name: "exercises",
    dataType: JsStore.DATA_TYPE.String
  }, {
    name: "image",
    dataType: JsStore.DATA_TYPE.String
  }, {
    name: "breakfastimage",
    dataType: JsStore.DATA_TYPE.String
  }, {
    name: "lunchimage",
    dataType: JsStore.DATA_TYPE.String
  }, {
    name: "dinnerimage",
    dataType: JsStore.DATA_TYPE.String
  }, {
    name: "snackimage",
    dataType: JsStore.DATA_TYPE.String
  }]
};

// table to store the meals conresponding to diets
var mealsTable = {
  name: "Meals",
  columns: [{
    name: "id",
    primaryKey: true,
    dataType: JsStore.DATA_TYPE.Number
  }, {
    name: "name",
    dataType: JsStore.DATA_TYPE.String
  }, {
    name: "description",
    dataType: JsStore.DATA_TYPE.String
  }, {
    name: "teaser",
    dataType: JsStore.DATA_TYPE.String
  }, {
    name: "type",
    dataType: JsStore.DATA_TYPE.String
  }, {
    name: "dietId",
    dataType: JsStore.DATA_TYPE.Number
  }]
};
// database structure
var db = {
  name: "dietplanner",
  tables: [dietsTable, mealsTable, selectionTable]
};
