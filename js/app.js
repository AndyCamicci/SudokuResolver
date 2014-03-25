$(document).ready(function() {

	var Sudoku = function() {
		this.that = this;
		this.cases = [];
	};

	Sudoku.prototype.init = function() {
		var $cases = $('#sudoku div');
		var cases = [];
		if ($cases.length != 3*3*9) {
			console.error('There is not 81 cases but', $cases.length);
		}
		var _case = null;

		(function(context) {
			var caseId;
			$cases.each(function(i) {
				_case = new Case(i, this);
				_case.fill();
				context.cases.push(_case);
			});
		}(this));

		this.createRealGrid();
		this.emptyGridFromDefinedValues();
	};

	Sudoku.prototype.getCase = function(id) {
		return this.cases[id];
	};

	Sudoku.prototype.createRealGrid = function() {
		this.grid = [
			[0, 9],
			[7, 5],
			[10, 5],
			[12, 8],
			[14, 9],
			[15, 1],
			[17, 6],
			[20, 6],
			[21, 4],
			[22, 5],
			[23, 3],
			[25, 2],
			[28, 7],
			[29, 1],
			[32, 4],
			[33, 2],
			[34, 6],
			[38, 4],
			[42, 9],
			[46, 3],
			[47, 9],
			[48, 7],
			[51, 4],
			[52, 8],
			[55, 4],
			[57, 2],
			[58, 7],
			[59, 8],
			[60, 6],
			[63, 7],
			[65, 8],
			[66, 5],
			[68, 1],
			[70, 4],
			[73, 9],
			[78, 8]
		];

		var len = this.grid.length;
		for (var i = 0; i < len; i++)
		{
			this.getCase(this.grid[i][0]).setValue(this.grid[i][1]);
		}
	};

	Sudoku.prototype.emptyGridFromDefinedValues = function() {
		var len = this.grid.length;
		for (var i = 0; i < len; i++)
		{
			this.getCase(this.grid[i][0]).emptyPossible();
		}
	};

	var Case = function(id, caseId, elem) {
		this.id = id;
		this.rowId;
		this.colId;
		this.caseId;
		this.$el = $(elem);
		this.$valueEl = null;
		this.$guessElement = null;
		this.possible = [1, 2, 3, 4, 5, 6, 7, 8, 9];
		this.value = null;

		(function(context) {
			context.$valueEl = $('<span>').attr('class', 'value');
			context.$el.append(context.$valueEl);
			context.$el.on('click', $.proxy(context.clicked, context));

			// Calculate on which vertical column is it
			
		})(this);
	};

	Case.prototype.fill = function() {
		this.$guessElement = $('<span>').attr('class', 'possible').html(this.possible.join(' '))
		this.$el.append(this.$guessElement);
	};

	Case.prototype.setValue = function(val) {
		this.value = val;
		this.$valueEl.html(this.value);
	}

	Case.prototype.emptyPossible = function() {
		this.possible = [];
		this.update();
	};

	Case.prototype.update = function() {
		this.$guessElement.html(this.possible);
		this.$valueEl.html(this.value);
	};

	Case.prototype.clicked = function(e) {
		this.process();
	};

	Case.prototype.process = function() {
		console.log(this.caseId);
		// Group
		var group = this.getGroupIds()
	};

	Case.prototype.getGroupIds = function() {

	};



	var app = new Sudoku();
	app.init();
});