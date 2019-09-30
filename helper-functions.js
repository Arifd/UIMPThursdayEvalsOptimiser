// apply a class to an element, with error checking and option to hide the element after. 
function applyClass(className, element, hide-after = false)
{
  if (element.classList.contains(className))
  {
    element.classList.remove(className);
    void element.offsetWidth; // Trigger reflow before re-adding
    element.classList.add(className);
    // wait for animation to end then remove the element.
    if (hide-after) element.addEventListener('animationend', function() { element.style.display = 'none'; }, {once: true});
  }
  else element.classList.add(className);
  // wait for animation to end then remove the element.
  if (hide-after) element.addEventListener('animationend', function() { element.style.display = 'none'; }, {once: true});
}
