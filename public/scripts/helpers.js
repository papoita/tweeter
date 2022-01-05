const escape = function (str) {
		const div = document.createElement("div");
		div.appendChild(document.createTextNode(str));
		return div.innerHTML;
	};

  module.exports = {escape}