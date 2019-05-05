export interface IWrapper {
  attr: (name: string, val?: string) => string | null;
  node: HTMLElement;
  on: (event: string, handler: (e: any) => void) => void;
  toggleClass: (name: string) => void;
  tooltip: () => void;
}

class Wrapper implements IWrapper {
  node: HTMLElement;

  constructor(node: HTMLElement) {
    this.node = node;
  }

  hasClass(className: string) {
    return this.node.className.indexOf(className) > -1;
  }

  addClass(className: string) {
    if (this.hasClass(className)) return;
    const newName = `${this.node.className} ${className}`;
    this.node.className = newName.trim();
  }

  removeClass(className: string) {
    this.node.className = this.node.className.replace(className, '');
  }

  toggleClass(className: string) {
    this.hasClass(className)
      ? this.removeClass(className)
      : this.addClass(className);
  }

  attr(name: string, val: string) {
    if (val) this.node.setAttribute(name, val);
    return this.node.getAttribute(name);
  }

  data(name: string) {
    return this.node.dataset[name];
  }

  text(val: string) {
    this.node.textContent = val;
  }

  append(element: IWrapper) {
    this.node.appendChild(element.node);
  }

  on(event: string, handler: (e: Event) => void) {
    this.node.addEventListener(event, handler);
  }

  tooltip() {
    const element = new Wrapper(document.createElement('div'));
    element.addClass('tooltip');
    element.text(this.data('tooltip') || '');
    this.append(element);

    this.on('mouseover', _ => element.addClass('visible'));
    this.on('mouseleave', _ => element.removeClass('visible'));
  }
}

export default Wrapper;
