$(function () {

	initDietPlans();

	function initDietPlans() {
		var template = $('#dietPlanTemplate').html();
		var dietPlanData = [{
			sectionTitle: "Breakfast",
			sectionId: "breakfast",
			paragraph: "lorem ipsum",
			availability: "Available meal options",
			options: [{
				title: "first option",
				recipe: "lorem ipsum1",
				id: 1
			}, {
				title: "second option2",
				recipe: "lorem ipsum",
				id: 2
			}, {
				title: "third option3",
				recipe: "lorm ipsum3",
				id: 3
			},{
				title: "first recipe4",
				recipe: "lorem ipsum4",
				id: 4
			}, {
				title: "second option5",
				recipe: "lorem ipsum5",
				id: 5
			}, {
				title: "third option6",
				recipe: "lorm ipsum6",
				id: 6
			}, {
				title: "first recipe7",
				recipe: "lorem ipsum7",
				id: 7
			}]
		},	{
			sectionTitle: "Lunch",
			sectionId: "lunch",
			paragraph: "lorem ipsum",
			availability: "Available meal options",
			options: [{
				title: "first option",
				recipe: "lorem ipsum1",
				id: 1
			}, {
				title: "second option2",
				recipe: "lorem ipsum",
				id: 2
			}, {
				title: "third option3",
				recipe: "lorm ipsum3",
				id: 3
			},{
				title: "first recipe4",
				recipe: "lorem ipsum4",
				id: 4
			}, {
				title: "second option5",
				recipe: "lorem ipsum5",
				id: 5
			}, {
				title: "third option6",
				recipe: "lorm ipsum6",
				id: 6
			}, {
				title: "first recipe7",
				recipe: "lorem ipsum7",
				id: 7
			}],
		}]

    var rendered = Mustache.render(template, {"dietPlanData": dietPlanData});
    // console.log(rendered);
    $('#breakfastDiet').html(rendered);
	}
})
