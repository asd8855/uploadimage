export default {
	/**
	 * 编辑器的宽度，可以设置px或%，比textarea输入框样式表宽度优先度高。
	 * 数据类型: String
	 * 默认值: textarea输入框的宽度
	 * */
	width: '100%',
	height: '500px',
	resizeType: 0,
	items: [
		'source', '|', 'selectall', 'undo', 'redo', '|', 'code',
		'plainpaste', 'wordpaste', '|', 'justifyleft', 'justifycenter', 'justifyright',
		'justifyfull', 'insertorderedlist', 'insertunorderedlist', 'indent', 'outdent', 'subscript',
		'superscript',  '|', 'print', 'preview', 'fullscreen',
		'formatblock', 'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold',
		'italic', 'underline', 'strikethrough', 'lineheight', 'removeformat', 'clearhtml', '|', 'image',
		'multiimage',
		'table', 'hr', 'emoticons',
		'link', 'unlink'
	],
}
