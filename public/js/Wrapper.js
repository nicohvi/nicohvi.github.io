export default class Wrapper {

  constructor (node) {
    this.node = node;
  }

  hasClass (className) {
    return this.node.className.indexOf(className) > -1;
  }

  addClass (className) {
    if (this.hasClass(className)) return;
    this.node.className += ` ${className}`;
    this.node.className = this.node.className.trim();
  }

  removeClass (className) { 
    this.node.className = this.node.className.replace(className, '');
  }

  toggleClass (className) {
    this.hasClass(className) 
    ? this.removeClass(className) 
    : this.addClass(className);
  }
  
  attr (name, val) {
    val ? this.node.setAttribute(name, val) : this.node.getAttribute(val);
  }

  data (name) {
    return this.node.dataset[name];
  }

  text (val) {
    this.node.textContent = val;
  }

  append (element) { 
    this.node.appendChild(element.node);
  }

  on (event, handler) {
    this.node.addEventListener(event, handler);
  }

  tooltip () {
    const element = new Wrapper(document.createElement('section'));
    element.addClass('tooltip');
    element.text(this.data('tooltip'));
    this.append(element);
  
    this.on('mouseover', e => element.addClass('visible'));
    this.on('mouseleave', e => element.removeClass('visible'));
  }

}
