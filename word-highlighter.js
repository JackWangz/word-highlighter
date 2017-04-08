(function() {
	/*
		指定的URI
		觸發事件:定位點選段落->嵌入<tag>於對應的反白字串
		todo: 改變反白顏色
	*/

	'use strict';

	var highlighter = function () {

		var colorCode = "#f00",
				tagName = "highlight",
				tagPatternStart = "<"+tagName+" style='color: "+colorCode+";'>",
				tagPatternEnd = "</"+tagName+">";

		highlighter.prototype.getSelectionText = function () {
			var text = "";
			if (window.getSelection) {
				text = window.getSelection().toString();
			} else {
				console.log("window.getSelection is not exist!")
				return;
			}
			return text;
		};

		highlighter.prototype.getSelectionNode = function () {
			var node;
			if (window.getSelection) {
				node = window.getSelection().focusNode;
			} else {
				console.log("window.getSelection is not exist!")
				return;
			}
			return node;
		};

		highlighter.prototype.getParentNode = function () {
			var node;
			if (window.getSelection) {
				node = window.getSelection().focusNode.parentNode;
			} else {
				console.log("window.getSelection is not exist!")
				return;
			}
			return node;
		};

		highlighter.prototype.apply = function () {
			var token = this.getSelectionText(),
					html = this.getParentNode().innerHTML,
			//split and concat
					tokenIndex = html.indexOf(token),
					firstPart = html.substr(0, tokenIndex),
					secondPart = html.substr(tokenIndex+token.length),
					output = firstPart+tagPatternStart+token+tagPatternEnd+secondPart;
			// apply
			this.getParentNode().innerHTML = output;
		}

	};

	var app = new highlighter();
	app.apply();
	
})()