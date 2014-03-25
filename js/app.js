$(document).ready(function() {

	var Sudoku = function() {
		this.that = this;
		this.cases = [];
	};

	Sudoku.prototype.init = function() {
		var $cases = $('#sudoku div');

		if ($cases.length != 3*3*9) {
			console.error('There is not 81 cases but', $cases.length);
		}
		var _case = null;

		(function(context) {
			$cases.each(function(i) {

				_case = new Case(i, this);
				_case.fill();
				context.cases.push(_case);
			});
			
		}(this));
	};

	var Case = function(id, elem) {
		this.id = id;
		this.$el = $(elem);
	};

	Case.prototype.fill = function() {
		this.possible = [1, 2, 3, 4, 5, 6, 7, 8, 9];
		this.$guessElement = $('<span>').html(this.possible.join(' '))
		this.$el.append(this.$guessElement);
	};



	var app = new Sudoku();
	app.init();
});