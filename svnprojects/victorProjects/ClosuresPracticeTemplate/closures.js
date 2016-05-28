function startAt(x) {
	function incrementBy(y) {
		return x + y;
	}
	return incrementBy;
};

var closure1 = startAt(5);
console.log(closure1(5));
var closure2 = startAt(600);
var startAt = null;
console.log(closure2(20));

for (var a = 0; a < 100; a++) {
	for (var b = 0; b < 100; b++) {
		for (var c = 0; c < 100; c++) {
			if(a*10 + b*3 + c/2 == 100 && a + b + c == 100) {
				console.log("there are:",a,"a's, and:",b,"b's, and:",c,"c's");
			}
		}
	}
}