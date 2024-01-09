export class Modal {
  constructor(modalRef, modalBtn, modalCloseBtnRef, type) {
    this.modal = document.getElementById(modalRef);
    this.modalBtn = document.getElementById(modalBtn);
    this.modalCloseBtn = document.getElementById(modalCloseBtnRef);
    this.modalHeader = this.modal.querySelector('h2');
    this.type = type;
    this.visible = false;

    this.modalBtn.addEventListener('click', () => this.show());
    this.modalCloseBtn.addEventListener('click', () => this.hide());
    this.modal.addEventListener('click', (e) => {
      if(this.visible && e.target === this.modal) this.hide();
    });
  }

  show() {
    this.modal.style.display = 'block';
    this.modalHeader.innerText = this.type[0].toUpperCase() + this.type.slice(1,) + ' Statistics';
    this.visible = true;
  }

  hide() {
    this.modal.style.display = 'none';
    this.visible = false;
  }
}