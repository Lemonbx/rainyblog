$(function() {
	$("#log").submit(function() {
		$("input").attr('disabled', "disabled")
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
		$.auth.login(loginName,passwd);
		return false;
	})
})
