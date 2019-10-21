/**
 * 请先按顺序引用jquery.js jquery.cookie.js layer.js
 */

var host = "http://localhost:8081";
var token = "Rainy-Token";
(function($) {
	$.extend({
		auth: {
			login: function(username, password) {
				$.ajax({
					url: host + "/api/login",
					method: "post",
					data: {
						username: username,
						password: password
					},
					xhrFields: {
						withCredentials: true
					},
					success: function(str) {
						console.log(str)
						if (str.code == 200) {
							$.cookie(token, str.data);
							layer.msg("登录成功，正在跳转...", {
								icon: 1,
								time: 3000
							})
							window.location.href = "/";
						} else if (str.code == 500) {
							layer.msg(str.msg, {
								icon: 2
							})
							$("input").removeAttr('disabled')
							$('button').removeAttr('disabled');
							$('#login').html("登录");
						} else {
							layer.msg(str.msg, {
								icon: 2
							});
							$("input").removeAttr('disabled')
							$('button').removeAttr('disabled');
							$('#login').html("登录");
						}
					}
				})
			},
			getToken: function() {
				return $.cookie(token);
			}
		},
		request: {
			common: function(d) {
				var option = {
					url: d.url,
					method: d.method,
					data: d.data,
					xhrFields: {
						withCredentials: true
					},
					headers: {
						'Access-Control-Allow-Origin': "*",
						"Access-Control-Allow-Headers": "Cookie,Set-Cookie,Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Origin,rainytoken",
						"Access-Control-Allow-Methods": "PUT,POST,GET,DELETE,OPTIONS",
						"X-Powered-By": "3.2.1",
						"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
					},
					success: function(str) {
						if (str.code == 200) {
							d.success(str);
						} else if(str.code==401) {
							layer.msg("登录失效，3秒后跳转到登录页面", {
								icon: 2
							});
							setTimeout(function() {
								window.location.href = "/login";
							}, 3000);
						}else{
							layer.msg(str.msg, {
								icon: 2
							});
						}
					}
				}
				if (typeof $.auth.getToken() != "undefined") {
					// option.headers
					option.data.rainysessionid = $.auth.getToken()
				}
				$.ajax(option);
			},
			get: function(d) {
				d.url = host + d.url;
				d.data = !d.data ? {} : d.data;
				d.method = "get";
				$.request.common(d);
			},
			post: function(d) {
				d.url = host + d.url;
				d.data = !d.data ? {} : d.data;
				d.method = "post";
				$.request.common(d);
			},
		},
	})
})(jQuery);
