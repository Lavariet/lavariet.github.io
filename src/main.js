window.addEventListener('DOMContentLoaded', function () {
	const year = new Date().getFullYear()
	const footer = document.getElementById('footer-text')
	footer.insertAdjacentHTML('beforeend', ` ${year}`);

})