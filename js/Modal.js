export class Modal {
  constructor(modalRef, modalBtn, modalCloseBtnRef) {
    this.modal = document.getElementById(modalRef);
    this.modalBtn = modalBtn;
    this.modalCloseBtn = document.getElementById(modalCloseBtnRef);
    this.visible = false;

    this.modalBtn.addEventListener('click', () => this.show());
    this.modalCloseBtn.addEventListener('click', () => this.hide());
    this.modal.addEventListener('click', (e) => {
      if(this.visible && e.target === this.modal) this.hide();
    });
  }

  show() {
    this.modal.style.display = 'block';
    this.visible = true;
  }

  hide() {
    this.modal.style.display = 'none';
    this.visible = false;
  }
}