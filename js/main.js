$(function() {
  console.log("ready");

  initDietPlans();

  function initDietPlans() {
    var template = $('#dietPlanTemplate').html();
    var dietPlanData = [{
      title: "Diet plan 1",
      description: "lorem ipsum",
      url: "dietplan1.html",
    }, {
      title: "Diet plan 2",
      description: "lorem ipsum2",
      url: "dietplan2.html"
    }, {
      title: "Diet plan 3",
      description: "lorem ipsum3",
      url: "dietplan3.html"
    }];
    var rendered = Mustache.render(template, {"dietPlanData": dietPlanData});
    // console.log(rendered);
    $('#dietPlanList').html(rendered);
  }
});
