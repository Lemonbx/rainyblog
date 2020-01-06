$(function() {
	$("#log").submit(function() {
		$("input").attr('disabled', "disabled");
		$('button').attr('disabled', "disabled");
		$('#login').html("登录中...");

		var loginName = $("#loginName").val().trim();
		var passwd = $("#passwd").val().trim();
		if (loginName == "" || $.trim(loginName).length == 0) {
			$("input").removeAttr('disabled')
			$('button').removeAttr('disabled');
			$('#login').html("登录");
			layer.msg("请输入用户名", {
				icon: 2
			});
			$("#loginName").val("");
			$("#loginName").focus();
			return false;
		}
		if (passwd == "" || $.trim(passwd).length == 0) {
			layer.msg("请输入密码", {
				icon: 2
			});
			$("input").removeAttr('disabled')
			$('button').removeAttr('disabled');
			$('#login').html("登录");
			$("#passwd").val("");
			$("#passwd").focus();
			return false;
		}
		$.auth.login(loginName, passwd);
		return false;
	});
	$("#reg").submit(function() {
		$("input").attr('disabled', "disabled");
		$('button').attr('disabled', "disabled");
		$('#login').html("注册中...");

		var loginName = $("#loginName").val().trim();
		var passwd = $("#passwd").val().trim();
		var email = $("#email").val().trim();
		var name = $("#name").val().trim();
		if (loginName == "" || $.trim(loginName).length == 0) {
			$("input").removeAttr('disabled')
			$('button').removeAttr('disabled');
			$('#login').html("注册");
			layer.msg("请输入用户名", {
				icon: 2
			});
			return false;
		}
		if (passwd == "" || $.trim(passwd).length == 0) {
			layer.msg("请输入密码", {
				icon: 2
			});
			$("input").removeAttr('disabled')
			$('button').removeAttr('disabled');
			$('#login').html("注册");
			return false;
		}
		if (name == "" || $.trim(name).length == 0) {
			layer.msg("请输入昵称", {
				icon: 2
			});
			$("input").removeAttr('disabled')
			$('button').removeAttr('disabled');
			$('#login').html("注册");
			return false;
		}
		if (email == "" || $.trim(email).length == 0) {
			layer.msg("请输入Email", {
				icon: 2
			});
			$("input").removeAttr('disabled')
			$('button').removeAttr('disabled');
			$('#login').html("注册");
			return false;
		}
		$.ajax({
			url: host + "/api/regist",
			method: "post",
			data: {
				loginCode: loginName,
				name: name,
				email: email,
				password: passwd
			},
			success: function(res) {
				if (res.code == 200) {
					layer.msg("注册成功，3秒后跳转到登录页面", {
						icon: 1
					});
					setTimeout(function() {
						window.location.href = "/login";
					}, 3000);
				} else {
					$("input").removeAttr('disabled');
					$('button').removeAttr('disabled');
					$('#login').html("注册");
					layer.msg(res.msg, {
						icon: 2
					});
				}
			}
		})
		return false;
	})
})
