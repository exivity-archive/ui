import FontFaceObserver from 'fontfaceobserver'

// Add loaded class
window.onload = function () {
  document.body.classList.add('ex-loaded')
}

// Fix for unloaded "Material Icons" font displaying in regular text
new FontFaceObserver('Material Icons').load().then(function () {
  document.body.classList.add('ex-loaded--material-icons')
}).catch(() => {})
