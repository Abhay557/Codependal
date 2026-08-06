function update() {
	
	let htmlCode=document.getElementById("htmlCode").value;
	let cssCode=document.getElementById("cssCode").value;
	let javascriptCode=document.getElementById("javascriptCode").value;
	let text=htmlCode+"<style>"+cssCode+"</style>"+"<scri"+"pt>"+javascriptCode+"</scri"+"pt>";
	let iframe=document.getElementById('viewer').contentWindow.document;
	iframe.open();
	iframe.write(text);
	iframe.close();
	
}

const gutter = document.getElementById("gutter");
const leftPanel = document.querySelector(".container");
const rightPanel = document.querySelector(".iframe-container");

const MIN_PANEL_WIDTH = 240;

function setPanelWidths(leftWidth) {
	const workspaceWidth = gutter.parentElement.clientWidth;
	const gutterWidth = gutter.getBoundingClientRect().width;
	const maxLeftWidth = workspaceWidth - gutterWidth - MIN_PANEL_WIDTH;
	const clampedLeftWidth = Math.min(Math.max(leftWidth, MIN_PANEL_WIDTH), maxLeftWidth);
	leftPanel.style.flexBasis = `${clampedLeftWidth}px`;
	rightPanel.style.flexBasis = `${workspaceWidth - gutterWidth - clampedLeftWidth}px`;
}

let isDragging = false;

gutter.addEventListener("pointerdown", (event) => {
	isDragging = true;
	gutter.setPointerCapture(event.pointerId);
	document.body.style.cursor = "ew-resize";
	document.body.style.userSelect = "none";
});

gutter.addEventListener("pointermove", (event) => {
	if (!isDragging) {
		return;
	}

	const workspaceRect = gutter.parentElement.getBoundingClientRect();
	setPanelWidths(event.clientX - workspaceRect.left);
});

function stopDragging() {
	if (!isDragging) {
		return;
	}

	isDragging = false;
	document.body.style.cursor = "";
	document.body.style.userSelect = "";
}

gutter.addEventListener("pointerup", stopDragging);
gutter.addEventListener("pointercancel", stopDragging);
window.addEventListener("resize", () => {
	setPanelWidths(leftPanel.getBoundingClientRect().width);
});

setPanelWidths(window.innerWidth * 0.5);