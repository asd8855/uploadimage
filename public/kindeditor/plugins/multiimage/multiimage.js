
function baseUrl() {
	//url 匹配
	const url = window.location.origin
	let baseUrl = "https://api-dev.imxyb.com"
	if (url == 'https://web.imxyb.com') {
		if (window.location.pathname.indexOf('/test') > -1) {
			baseUrl = "https://api-test.imxyb.com"
		} else if (window.location.pathname.indexOf('/dev') > -1) {
			baseUrl = "https://api-dev.imxyb.com"
		} else {
			baseUrl = "https://api.imxyb.com"
		}
	}
	return baseUrl
}

KindEditor.plugin('multiimage', function (K) {
	var self = this, name = 'multiimage';
	self.clickToolbar(name, function () {
		self.options.multiimage()
	});

	KindEditor.insetimage = function (url, title, width, height, border, align) {
		self.exec('insertimage', url, title, width, height, border, align);
	}

});





