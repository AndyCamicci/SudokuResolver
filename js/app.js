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

		// (function(context) {
		// 	var caseId;
		// 	$cases.each(function(i) {
		// 		_case = new Case(i, this);
		// 		_case.fill();
		// 		context.cases.push(_case);
		// 	});
		// }(this));
		var i = 0;
		for (var row = 0; row < 9; row++) {
			for (var col = 0; col < 9; col++) {
				_case = new Case(i, col, row, $cases[i]);
				_case.setReference(this);
				_case.fill();
				this.cases.push(_case);
				i++;
			}
		}

		for(var i = 0; i < this.cases.length; i++ ) {
			this.cases[i].getGroups();
		}

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

	var Case = function(id, colId, rowId, elem) {
		this.id = id;
		this.row = rowId;
		this.col = colId;
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
		})(this);
	};

	Case.prototype.setReference = function(ctx) {
		this._Sudoku = ctx;
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
		this.$guessElement.html(this.possible.join(' '));
		this.$valueEl.html(this.value);
	};

	Case.prototype.clicked = function(e) {
		this.process();
	};

	Case.prototype.getGroups = function() {
		// Line horizontal
		var idFirst = this.id - this.id%9;
		var idLast = idFirst + 8;
		
		this.groupH = [];
		for (var i = idFirst; i <= idLast; i++) {
			this.groupH.push(this._Sudoku.getCase(i));
		}

		// Line vertical
		idFirst = this.id - (this.row * 9);
		idLast = idFirst + (9*8);

		this.groupV = [];
		for (var i = idFirst; i <= idLast; i+=9) {
			this.groupV.push(this._Sudoku.getCase(i));
		}

		// Block
		this.groupB = [];
		var firstRow = this.row - (this.row%3);
		var firstCol = this.col - (this.col%3);
		for (var row = firstRow; row < firstRow + 3; row++) {
			for (var col = firstCol; col < firstCol + 3; col++) {
				this.groupB.push(this._Sudoku.getCase( row * 9 + col ));
			}
		}
	};

	Case.prototype.process = function() {
		// this.highlightGroups(true);
		this.removePossibleValues();
		// this.highlightGroups(false);

	};
	Case.prototype.removePossibleValues = function() {
		var value = this.value;

		var len = this.groupB.length;
		while(len--) {
			this.groupB[len].removePossibleValue(value);
		}

		len = this.groupV.length;
		while(len--) {
			this.groupV[len].removePossibleValue(value);
		}

		len = this.groupH.length;
		while(len--) {
			this.groupH[len].removePossibleValue(value);
		}
	};

	Case.prototype.highlightGroups = function(active) {
		var len = this.groupB.length;
		while(len--) {
			this.groupB[len].highlight(active);
		}

		len = this.groupV.length;
		while(len--) {
			this.groupV[len].highlight(active);
		}

		len = this.groupH.length;
		while(len--) {
			this.groupH[len].highlight(active);
		}
	};

	Case.prototype.highlight = function(active) {
		if (active)  {
			this.$el.addClass('highlight');
		} else {
			this.$el.removeClass('highlight');
		}
	};

	Case.prototype.removePossibleValue = function(val) {
		var index = this.possible.indexOf(val);
		if (index > -1) {
			this.possible.splice(index, 1);
		}
		this.update();
	};



	var app = new Sudoku();
	app.init();
});