//================== TEMP ====================
/*
async function gif(query, go, num) { go=go||1; num=num||1; var all=[]; for(var i=0;i<num;i++) { var result = await google.gif.search(query,go+(i*10)); if(Array.isArray(result)) {  all=all.concat(result); } stack.push(all); var paste="```\n#" + query + "\n";  paste += all.items.map(item=>"![" + item.title + "](" + item.link + ")\n").join('- - -\n'); var link=await gist(paste); console.log(query + " | " + link); }; };
/* */
//================== TEMP ====================

var util = require('util');

//var Promise = require('bluebird');
//var compose = require('./composition').compose;
//var inheritance = require('./inheritance')
//var regexp = require('./regexp/regexp');
//var story = require('./story/story' );
//exports.regexp = regexp;
//exports.story = story;


var zz=s=>{ var av=parseArgs(s.split(" ")),q="\r\n```\r\n"; function z(url, no, go) { no=no|| 0; go=go||parseInt(url.match(/(\d+).jpg/)[1],10); var b=url.slice(0,url.lastIndexOf("/")+1); var dmLink = `${b}[${go}:${go+no}].jpg`; var pics = lib.range(go,go+no).map(i=>`${b}${i}.jpg`); console.log(dmLink); return pics; }; return gist(q+z(av._[0], parseInt(av._[1],10)).map((img,i)=>`![${"zz"+i}](${img})`).join("\r\n")+q) }

var assign=(n,...o)=>o.reduce((prev,next)=>{Object.getOwnProperyNames(next).forEach(prop=>{Object.setOwnPropertyDescriptor(prev,Object.getOwnPropertyDescriptor(next,prop))}); return prev;}, n);
exports.assign = assign;
var parseDate = (d) => {
	var s = d.toISOString();
	var a = s.match(regexp.date.iso);

	return {
		date: {
			year: a[1],
			month: a[2],
			day: a[3],
			toString() {
				this.year + '-' + this.month + "-" + this.day
			}
		},
		time: {
			hour: a[4],
			minute: a[5],
			second: a[6],
			milisecond: a[7],
			toString() {
				this.hour + ":" + this.minute + ":" + this.milisecond; 			
			}
		}
	}	
}
exports.parseDate = parseDate;


exports.tictactoe = () => (function(field) {
	var xy = xy || "x";
	this.board = board || new Array(9).fill(0);
	var won = s => {
		var check = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6]
		];
		return check.some(combination => combination.every(field => board[field] == s));
	};
	var f = this.board[field];
	if (!f) {
		f = xy;
		if (won(xy)) {
			console.log(xy + " wins!", this.board);
			this.board = new Array(9).fill(0);
			xy = null;
		} else {
			if (xy == 'x') {
				xy = 'o'
			} else {
				xy = 'x'
			};
			console.log("Next: ", xy, this.board)
		}
	}
}).bind({
	board: []
});

//javascript:(function(d,src){src=src||'http://iis/webkit/webkit.js'; var script=d.createElement('script');script.src=src;d.getElementsByTagName('head')[0].appendChild(script);})(document,'http://iis/webkit/webkit.js');
exports.webkit = (function(d, src) {
	src = src || 'http://iis/webkit/webkit.js';
	var script = d.createElement('script');
	script.src = src;
	d.getElementsByTagName('head')[0].appendChild(script);
});

var polynom = a => {
	var f = x => a.map((m, n) => Math.pow(x, n) * m).reduce((p, n) => p + n);
	f.toString = () => "f(x) = " + a.reverse().map((m, n) => m + "*x^" + (a.length - 1 - n)).join(" + ");
	f.wolfram = () => f.toString() + " | http://www.wolframalpha.com/input/?i=" + encodeURIComponent(f.toString()) + " ";
	return f;
};
polynom.help = "var f = lib.polynom([3, -0.5, 1]); -> f(x) = x² - 0.5x + 3 | graph: lib.range(-5,5).map(x=>[x, f(x)]) |  f.wolfram()";
exports.polynom = polynom;

function Includes() {
	this.includes = function(x) {
		return [].some.call(this, v => x === v)
	};
	return this;
};

function mixin(target, ext) {
	if (typeof ext == 'function') {
		var target = ext.call(target);
	} else {
		for (var trait in ext) {
			Object.assign(target, trait)
		}
	};
	return target;
};
mixin({
	0: "a",
	1: "b",
	length: 2
}, Includes).includes("a");
exports.mixin = mixin;
exports.Includes = Includes;

function matrix2D(cols, rows, fill) {
	fill = fill || function(a, b) {
		return {
			x: a,
			y: b
		};
	};
	var matrix = new Array(cols * rows);
	cols = cols || 8;
	rows = rows || 8;
	cols = Math.abs(Math.floor(parseInt(cols, 10)));
	rows = Math.abs(Math.floor(parseInt(rows, 10)));
	matrix.cols = cols;
	matrix.rows = rows;
	for (var k = 0; k < cols; k++) {
		for (var j = 0; j < rows; j++) {
			matrix[j * cols + k] = fill(k, j);
		}
	}
	var f = function(x, y) {
		if (!arguments.length) {
			return matrix;
		} else {
			x = Math.abs(Math.floor(x));
			if (x >= matrix.cols) {
				return null;
			}
			if (arguments.length == 1) {
				return matrix.slice(x * cols, x * cols + cols);
			} else {
				y = Math.abs(Math.floor(y));
				if (y >= matrix.rows) {
					return null;
				} else {
					return matrix[y * cols + x];
				}
			}
		}
	};
	f.matrix = matrix;
	f.inspect = function() {
		return util.inspect(matrix, {
			depth: null
		});
	};
	f.toJSON = function() {
		return JSON.stringify({
			cols: cols,
			rows: rows,
			matrix: matrix
		});
	};
	return f;
};


var matrix = (cols, rows) => { var mx=Array.from({length: cols*rows}, (e,i)=>({x: i%cols,y: Math.floor(i/rows)})); var f=(x, y)=>{ if ((x<0||x>=this.cols)||(y<0||y>=this.rows)) return undefined;	return this[y*this.cols+x] }; mx.cols=cols; mx.rows=rows; f.mx=mx; return f.bind(f.mx);};
matrix.help = 'var matrix = (cols,rows) => { var matrix=Array.from({length:cols*rows}, (e,i)=>({x:i%cols,y:Math.floor(i/rows)})); matrix.w=cols; matrix.h=rows; function field(x, y) { if ((x<0||x>=this.w) || (y<0||y>=this.h)) return undefined; return this[y*this.w+x] }; return field.bind(matrix); }; var bb=matrix(8,8); bb(2,4).items=["queen"]; bb(2,4)';
/* var board = matrix2D(8,8); board(3)(1).figure = 'red queen'; board(3)(1) */
exports.matrix = matrix;

var CellMap = exports.CellMap = function CellMap(cols, rows) {
	this.cols = cols;
	this.rows = rows;
	this.items = new Array(rows * cols).fill(0).map((elem, index) => this.createCell(index));
};
CellMap.prototype.createCell = function(i) {
	var self = this;
	i = i || 0;
	var cell = {
		x: (i + self.cols) % (self.cols),
		y: Math.floor(i / self.cols),
		index: i
	};

	cell.cells = {
		all: () => {
			return [
				[-1, -1],
				[0, -1],
				[1, -1],
				[-1, 0],
				[1, 0],
				[-1, 1],
				[0, 1],
				[1, 1]
			].map(z => self.field(cell.x + z[0], cell.y + z[1]))
		},
		get topLeft() {
			return this.all()[0]
		},
		get top() {
			return this.all()[1]
		},
		get topRight() {
			return this.all()[2]
		},
		get left() {
			return this.all()[3]
		},
		get right() {
			return this.all()[4]
		},
		get bottomLeft() {
			return this.all()[5]
		},
		get bottom() {
			return this.all()[6]
		},
		get bottomRight() {
			return this.all()[7]
		}
	};
	return cell;
};
CellMap.prototype.field = function(x, y) {
	if (!arguments.length) return this.items;
	x = Math.abs(Math.floor(parseInt(cols, 10)));
	y = Math.abs(Math.floor(parseInt(rows, 10)));
	if ((x < 0) || (x >= this.colt)) return null;
	if ((y < 0) || (y >= this.rows)) return null;
	return this.items[y * this.cols + x]
};
CellMap.create = function(cols, rows) {
	var cellMap = new CellMap(cols, rows);
	var f = cellMap.field.bind(cellMap);
	f.cellMap = cellMap;
	f.toJSON = function() {
		return JSON.stringify(f.cellMap)
	};
	f.inspect = () => util.inspect(f.cellMap);
	return f;
};


function tape(s) {
	var head = null;
	var tape = [];
	s.split('').forEach((char, index) => {
		if (char == ' ') {
			if (!head) head = index;
			if ((head - index) % 2) {
				tape.push('-');
			} else {
				tape.push('_')
			}
		} else {
			head = null;
			tape.push('char')
		}
	});
	return tape.join();
};
tape("This        is A  TEST");

var ducky = exports.ducky = function ducky(query, site) {
		if (site) {
			site = "+" + encodeURIComponent("site:" + site);
		} else {
			site = "";
		};
		var url = ("https://duckduckgo.com/?q=%q" + site).replace("%q", encodeURIComponent(query.replace(" ", "+")));
		return url;
	}
	/*
	var o = { proto: Object.getPrototypeOf, names: Object.getOwnPropertyNames, symbols: Object.getOwnPropertySymbols, prop: Object.getOwnPropertyDescriptor };
	/* */

var Vector2D = {
	x: 0,
	y: 0,
	create(x, y) {
		var v = Object.create(Vector2D);
		v.x = x;
		v.y = y;
		return v;
	},
	get length() {
		return Math.sqrt(this.x * this.x + this.y * this.y)
	},
	scale(s) {
		return Vector2D.create(this.x * s, this.y * s)
	},
	norm() {
		return this.scale(1 / this.length)
	},
	orth() {
		return Vector2D.create(this.y * (-1), this.x)
	},
	angle(rad) {
		var phi = Math.asin(this.norm().y);
		if (!rad) phi *= (180 / Math.PI);
		return phi;
	},
	
	//x' = x1 + cosq * (x - x1) - sinq * (y - y1) 
	//y' = y1 + sinq * (x - x1) + cosq * (y - y1) 
	turn(phi, v) { 
		v = v || Vector2D.create();
		var v_ = Vector2D.create(); 
		v_.x = v.x + Math.cos(phi) * (this.x - v.x) - Math.sin(phi) * (this.y - v.y);
		v_.y = v.y + Math.sin(phi) * (this.x - v.y) + Math.cos(phi) * (this.y - v.y);

		return v_;
	},

	turn(phi) { 
		var v_ = Vector2D.create(); 
		v_.x = this.x*Math.cos(phi) - this.y*Math.sin(phi); 
		v_.y=this.x*Math.sin(phi)+this.y*Math.cos(phi); 
		return v_ 
	},
	add(...v) {
		return Vector2D.create(v.map(v_ => v_.x).reduce((prev, next) => prev + next, this.x), v.map(v_ => v_.y).reduce((prev, next) => prev + next, this.y))
	},

	substract(...v) {
		return Vector2D.create(v.map(v_ => v_.x).reduce((prev, next) => prev - next, this.x), v.map(v_ => v_.y).reduce((prev, next) => prev - next, this.y))
	},
	toJSON() {
		return [this.x, this.y]
	},
	fromJSON(json) {
		return Vector2D.create(json[0], json[1])
	},
	toString() {
		//return "( " + this.x.toPrecision(3) + ", " + this.y.toPrecision(3) + " )";
		return util.inspect(this.toJSON())
	}
};
Vector2D.wolframAlpha = function(...v) {
	return "http://www.wolframalpha.com/input/?i=vector+" + encodeURI(v.map(v_ => v_.toString()).join(','));
}
exports.Vector2D = Vector2D;


Function.prototype.bind = function() {
	var fn = this,
		args = Array.prototype.slice.call(arguments),
		object = args.shift();
	return function() {
		return fn.apply(object, args.concat(Array.prototype.slice.call(arguments)));
	};
};

var logical = {
	nand: function(a, b) {
		return !(a && b);
	},
	not: function(a) {
		return this.nand(a, a);
	},
	and: function(a, b) {
		return this.not(this.nand(a, b));
	},
	or: function(a, b) {
		return this.nand(this.not(a), this.not(b));
	},
	nor: function(a, b) {
		return this.not(this.or(a, b));
	},
	xor: function(a, b) {
		return this.and(this.nand(a, b), this.or(a, b));
	},
	xnor: function(a, b) {
		return this.not(this.xor(a, b));
	}
};
exports.logical = logical;





var GUID = () => { var s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1); return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4(); };
exports.GUID = GUID;

var girls = function girls(q, p, r, t, s) {
	q = q || 'jeans+ass';
	q = q.replace(' ', '+');
	p = p || 1;
	r = r || 5;
	t = t || 22;
	s = s || 8;
	return 'http://hagb4rd.gizmore.org/gallery/slideshow.html?p=' + p + '&r=' + r + '&t=' + t + '&sleep=' + s + '&fadeout=2&autoplay=1&jailbait=' + q;
};
//exports.girls = girls;

// Simulate pure virtual inheritance/'implement' keyword for JS
var inherits = function inherits(b) {
	if (b.constructor == Function) { /* inherit */
		this.prototype = new b;
		this.prototype.constructor = this;
		this.prototype.b = b.prototype;
	} else { /* virtual */
		this.prototype = b;
		this.prototype.constructor = this;
		this.prototype.b = b;
	}
	return this;
};
Function.prototype.inherits = inherits;
exports.inherits = inherits;



var allKeys = function allKeys(o) {
	var result = [];
	for (var obj = o; obj !== null; obj = Object.getPrototypeOf(obj)) {
		result.push({
			symbols: Object.getOwnPropertySymbols(obj),
			keys: Object.getOwnPropertyNames(obj).map(function(prop) {
				var p = {
					name: prop
				};
				var d = Object.getOwnPropertyDescriptor(obj, prop);
				if (d.value) p.value = d.value;
				if (d.get) p.get = d.get;
				if (d.set) p.set = d.set;
				return p;
			})
		});
	};
	return result;
};
exports.allKeys = allKeys;
//Object.prototype.allKeys = function() { return allKeys(this); };

var xx = function(o) {
	var s = Object.getOwnPropertyNames(o).sort().map(key => {
		var v = o[key];
		var s = key;
		switch (typeof(v) == 'object') {
			case 'object':
				if (Array.isArray(v)) {
					s += "[]";
				}
				break;
			case 'function':
				s += "()";
				break;
			default:
				s += ':' + v;
		};
		return s;
	}).join(',');
	return {
		text: s,
		get __proto__() {
			var parent = Object.getPrototypeOf(o);
			if (parent) {
				return xx(parent)
			} else {
				return null;
			}
		}
	}
}
exports.xx = xx;

/* */
/*
	fugMe("!g lana del rey site:youtube.com", "lana.del.rey"); lana.del.rey // @ecmabot
/* */
var fugMe = function(value, chain, o) {
	o = o || this;
	chain = chain.split(".").reverse();
	var prop = chain.pop();
	if (prop) {
		if (chain.length > 0) {
			o[prop] = {};
			return fugMe(value, chain.reverse().join('.'), o[prop])
		} else {
			return o[prop] = value || {}
		};
	}
};
exports.fugMe = fugMe;

var ns = ( literal, target ) => { target=target||{};  literal.split('.').reduce((prev, next) => ( prev[next] = {}, prev[next] ), target); return target; };
ns.help = "ns('net.irc') // { net: { irc: {} } } ";
exports.ns = ns;



//var lpad = (len, pad, foo) => (new Array(len+1).join(pad) + foo).slice(-1*len);
var lpad = (len, pad, num) => new Array(Math.max(0, len - String(0, Math.floor(num)).length + 1)).join(pad) + num;
exports.lpad = lpad;
//String.prototype.leftFill = function(char, length) { return leftFill(this, char, minlength); }

var rot13 = s => s.replace(/[a-zA-Z]/g, (c) => String.fromCharCode((c <= "Z" ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26));

exports.rot13 = rot13;
//String.prototype.rot13 = function() { return rot13(this);  };

 var sortBy = (props, compare) => { compare=compare||((a,b)=>String(a).localeCompare(String(b)));  return function sort(a,b) { var next = keys => { var key = keys.shift(); var comparison=compare(a[key],b[key]); if(!comparison && keys.length) { return next(keys); } else { return comparison } }; return next(props.slice(0)) } };
 
exports.sortBy = sortBy;
 
var cmp = (a,b) => a-b; cmp.locale = (a,b) => String(a).localeCompare(String(b));
exports.cmp = cmp;


var stripTags = function stripTags(s) {
	return s.replace(/<[^>]*>/gi, "");
};
exports.stripTags = stripTags;
//String.prototype.stripTags = function() { return stripTags(this); };

//var Vector2D = {x:0, y:0, create: function(x, y) { var v = Object.create(Vector2D); v.x=x;v.y=y; return v; }, get length() { return Math.sqrt(this.x*this.x + this.y*this.y) }, norm() { return Vector2D.create(this.x/this.length, this.y/this.length)  }  };


Math.P = function P(x, y, z) {
	if (z) {
		return new Point3D(x, y, z);
	} else if (x instanceof Point2D) {
		return new Point3D(x.x, x.y, y);
	} else if (y instanceof Point2D) {
		return new Point3D(x, y.x, y.y);
	} else {
		return new Point2D(x, y);
	}

}

Math.Point2D = function Point2D(x, y) {
	this.x = x | 0;
	this.y = y | 0;
	this.toString = function() {
		return "(" + this.x + "," + this.y + ")";
	};
}
Math.Point3D = function Point3D(x, y, z) {
	this.x = x | 0;
	this.y = y | 0;
	this.z = z | 0;
	this.toString = function() {
		return "(" + this.x + "," + this.y + "," + this.z + ")";
	};
}

//cartesian product
//function P(x,y,z) { var p = {x:x,y:y}; var zs="" if(z) { p.z=z; zs=","+this.z; }; p.toString = function() {  return "("+this.x+","+this.y + zs ")" } return p; }
var AxB = function AxB(x, y, f) {
	f = f || ((x, y, z) => Math.P(x, y, z));
	return x.map(a => y.map(b => f(x, y)));
};
exports.AxB = AxB;



//function Shape() {}; function Rectangle() { Shape.call(this); } Rectangle.prototype = Object.create(Shape.prototype); /* Rectangle.prototype.constructor = Rectangle; */ var rect=new Rectangle();
//function Shape() { Rectangle.call(this); } Shape.prototype = Object.create(Rectangle.prototype);
var Shape = function Shape(x1, y1, x2, y2) {
	this.x1 = x1;
	this.y1 = y1;
	this.x2 = x2;
	this.y2 = y2;
};
Shape.prototype.overlaps = function(another) {
	return (this.x2 >= another.x1) && (this.y2 >= another.y1) && (this.x1 <= another.x2) && (this.y1 <= another.y2);
};
var a = new Shape(10, 10, 200, 200),
	b = new Shape(50, 50, 300, 300);
(a.overlaps(b)) //intersection?
exports.Shape = Shape;
exports.Math = Math;


var flatten = function flatten(array) {
	return [].concat.apply([], array);
}
exports.flatten = flatten;
if (!Array.flatten) {
	Array.flatten = flatten;
}
if (!Array.from) {
	Array.from = function(arrayLike) {
		return [].slice.call(arrayLike);
	}
}

var randomElement = function randomElement(array) {
	if (array.length) {
		return array[Math.floor(Math.random() * array.length)];
	} else {
		return null;
	}
}
var range = function range(a, b, step) {
	b=b||a||9;
	a=a||0;
	for (var r = []; r.length <= Math.abs(b - a); r.push(Math.min(a, b) + r.length * Math.abs(step || 1)));
	return r;
};
var range2 = function range(a, b, step) {
	if (arguments.length < 2) throw TypeError('Missing Arguments');
	step = Math.abs(step) || 1;
	var min = Math.min(a, b);
	var max = Math.max(a, b);
	var arr = new Array(Math.floor(max - min / step) + 1);
	for (var i = 0, next = min; next <= max; i++, next = min + (step * i)) arr[i] = next;
	return arr;
};

exports.range = range;
var timer = function timer(f) {
	var t1 = Date.now();
	f();
	var t2 = Date.now();
	return (t2 - t1);
};
exports.timer = timer;
var stats = function stats(f, n) {
	n = n || 5;
	var a = range(0, n);
	return a.map(x => timer(t => f()));
};
exports.stats = stats;
exports.randomElement = randomElement;
Array.prototype.random = function() {
	return randomElement(this);
}
var shuffle = function shuffle(o) {
	for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
	return o;
};
exports.shuffle = shuffle;
Array.prototype.shuffle = function() {
	return shuffle(this);
}
var map = (arr, f) => { var xs = new Array(arr.length);	for (var i = arr.length; i--> 0;) xs[i] = f(arr[i]); return xs; };
exports.map = map;



//Example: var access = Flags("execute","write","read"); (access.read | access.execute) //read or execute access
function Flags() {
	var flags = {
		__proto__: Flags
	};
	var args = [].concat.apply([], [].slice.call(arguments));
	args.forEach((name, index) => {
		Object.defineProperty(flags, name, {
			value: Math.pow(2, index),
			writable: false,
			enumerable: true
		});
	});
	return flags;
};
exports.Flags = Flags;


var Buffer = {};
Buffer.uint32 = function uint32() {
	return [].slice.call(new Uint32Array([].slice.call(arguments))).map(function(x) {
		return ('00000000' + x.toString(16)).slice(-7)
	});
};
Buffer.float64 = function float64() {
	return [].slice.call(new Uint32Array(new Float64Array([].slice.call(arguments)).buffer)).map(function(x) {
		return ('00000000' + x.toString(16)).slice(-7)
	});
};
exports.Buffer = Buffer;



/**
 * Math - generate random integer value between min and max, or between 0 and min-1 if only 1 argument
 *
 * @param  {Number} min description
 * @param  {Number} max description
 * @return {Number}     description
 */
var rand = function rand(min, max) {
	if(Array.isArray(min)) {
		if (array.length) {
			return array[Math.floor(Math.random() * array.length)];
		} else {
			return undefined;
		}		
	} else {
		
		if ((max == undefined) && (min != undefined)) {
			max = min - 1;
			min = 0;
		} else if (min == undefined) {
			min = 1;
			max = 100;
		}
		var range = max - min;
		return Math.round(Math.random() * range) + min;
	}
}
exports.rand = rand;
Math.rand = rand;


/*
Math.Probe = function Probe(array) { var p = { events: array, total: function() { return array.map(x=>x.weight).reduce((prev, curr) => prev+curr) }, addEvent: function(weight, name, obj){ obj=obj||{}; obj.name=name||"P"+this.events.length; obj.weight=weight||0; this.events.push(obj); this.init(); }, init: function() { var nextmin=0;  for(var i=array.length;i-->0;) { this.events[i].chance=array[i].weight/this.total(); this.events[i].min=nextmin; this.events[i].max=this.events[i].chance+nextmin;  } }, emit: function(n) { if(n>1) { var pArr = []; while(n-->0) pArr.push(this.emit()) return pArr; } var rand = Math.random(); var event=this.events.filter(e=>((rand >= e.min) && ( rand < e.max)))[0]; if(!event.count) event.count=0; event.count++; return {event: event.name, chance: event.chance, count: even.count }; } }; p.init(); return p; };
/* */
function Probe(array) {
	array = array || [];
	var p = {
		_private: {
			events: array
		},
		get events() {
			return this._private.events;
		},
		set events(array) {
			this._private.events = array;
			this.init();
		},
		get total() {
			return this.events.map(x => x.weight).reduce((prev, curr) => prev + curr)
		},
		emitted: [],
		addEvent: function(weight, name, obj) {
			obj = obj || {};
			obj.name = name || "P" + this.events.length;
			obj.weight = weight || 1;
			this._private.events.push(obj);
			this.init();
		},
		init: function() {
			this.emitted = [];
			var nextmin = 0;
			for (var i = this.events.length; i-- > 0;) {
				this.events[i].chance = this.events[i].weight / this.total;
				this.events[i].min = nextmin;
				this.events[i].max = this.events[i].chance + nextmin;
				nextmin = this.events[i].max;
			}
		},
		toString: function() {
			return this.events.map(event => {
				return event.name + " (" + (event.chance * 100).toFixed(2) + "%) : " + event.count + " / " + this.emitted.length;
			}).join(" | ");
		},
		emit: function(n) {

			if (this.events.length <= 0)
				throw Error('No events specified.');

			if (n > 1) {
				while (n-- > 0) {
					var event = this.emit()
				};
				return this.emitted;
			}

			var rand = Math.random();
			var event = this.events.filter(e => ((rand >= e.min) && (rand < e.max)))[0];
			if (!event.count)
				event.count = 0;
			event.count++;
			this.emitted.push(event);
			return event;
		}
	};
	p.init();
	return p;
};

exports.Probe = Probe;

Promise.resolveDelayed = function(x, ms) {
	return function(delay, overwrite) {
		delay = delay || ms || 1000;
		return new Promise((resolve, reject) => {
			setTimeout(function() {
				return resolve(x || overwrite || delay)
			}, delay);
		})
	}
};
Promise.resolveDelayed.help = "var sleep = Promise.resolveDelayed(23); sleep(1000).then(x=>console.log(x)).catch(console.log);"
Promise.taskify = function(arr) {
	if (!arr) throw TypeError('missing argument: Promise.all(lib.taskify(1,2,3).map(task=>task())).then(console.log)');
	if (!Array.isArray(arr)) arr = [].slice.call(arguments);
	return arr.map(n => () => new Promise(resolve => resolve(n)));
}
Promise.taskify.help = "Promise.all(Promise.taskify(1,2,3).map(task=>task())).then(console.log)";
Promise.queue = require('concurrent-task-queue');
Promise.queue.help = "var sequence = Promise.queue([()=>sleep(10*1000), ()=>Promise.resolve(23).then(console.log)], 1); sequence() // example: https://jsfiddle.net/mhq3qg5w/"
	//Promise.prototype.inspect = function() { return undefined; };


Promise.tasks = [
	() => Promise.resolve("http://www.free-emoticons.com/files/funny-emoticons/7279.png"),
	() => Promise.resolve("http://www.free-emoticons.com/files/funny-emoticons/7278.png"),
	() => Promise.resolve("http://www.free-emoticons.com/files/funny-emoticons/7277.png"),
	() => Promise.resolve("http://www.free-emoticons.com/files/funny-emoticons/7276.png"),
	() => Promise.resolve("http://www.free-emoticons.com/files/funny-emoticons/7275.png"),
	() => Promise.resolve("http://www.free-emoticons.com/files/funny-emoticons/7274.png"),
	() => Promise.resolve("http://www.free-emoticons.com/files/funny-emoticons/7273.png"),
	() => Promise.resolve("http://www.free-emoticons.com/files/funny-emoticons/7272.png"),
	() => Promise.resolve("http://www.free-emoticons.com/files/funny-emoticons/7271.png"),
	() => Promise.resolve("http://www.free-emoticons.com/files/funny-emoticons/7270.png")
];

exports.resolveDelayed = Promise.resolveDelayed;
exports.taskify = Promise.taskify;
exports.queue = Promise.queue;


exports.fb = {
	icons: "﻿🍀🌱🌹🌸💐🌻🌟⭐🌙☀⚡🔥👄💋✊✨🎩👆👉🎵🎼🎧🎈😹😌🐺🐾🐴🐎🍓💖💃👯👱👸👧👩👻👼🎭💎",
	links: [{
		title: "daddy's little princess",
		url: "http://hagb4rd.tumblr.com/post/142329606174/daddys-little-princess",
		tags: "flowerstory animated lolita"
	}]
};


exports.random = function* random(iterable) {
	var keys = lib.range(0,iterable.length-1).map(x=>({key:x, val:iterable[x], taken:false}));
	var result = [];
	var pull = () => {
		var untaken = keys.filter(x=>!x.taken);
		//all taken?
		if(!untaken.length) {
			return undefined;
		}
		//pick next random element
		var next = untaken[lib.rand(untaken.length)];
		//mark as taken
		next.taken = true;
		//return element
		return next.val;
	};

	var next;
	while (next=pull()) {
		yield next;
	}
};

exports.kv = function* kv(tree) { for (var key of Object.keys(tree)) (typeof tree[key] === 'object' && tree[key] !== null ? yield* kv(tree[key]) : yield [key, tree[key]]) }
exports.kv.help = 'for(var leaf of kv(tree)) { console.log(leaf); } //use function* kv(tree) to iterate over hiearchies/nodeLists';
exports.kv.tree = {	year: 2016,	user: 'earendel', leaves: { leafA: 'blue', leafB: 'red', leafC: {'cheeks': 'yummy'}}};

function Enum(key,val) { this.key=key; this.val=val; }; Enum.prototype.toString=function(){return this.key }; Enum.prototype.valueOf = function() { return this.val }; 
class Access extends Enum { constructor(key,val) { super(key,val); }; static create(...flags) { return flags.map((flag,i)=>new Access(flag,Math.pow(2,i))) }; }; 
Access.help="var execute,write,read; [execute,write,read] = Access.create('execute','write','read'); execute | read";

exports.Enum = Enum;
exports.Access = Access;


var inspect = (who,depth,hidden) => {depth=depth||null; hidden=hidden||false; var i=util.inspect(who,{depth:depth,showHidden:hidden,colors:true}); console.log(i); return who };
exports.inspect = inspect;

var letters = () => lib.range(65,90).map(x=>String.fromCodePoint(x));
exports.letters = letters;