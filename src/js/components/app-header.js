class AppHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <header>
        <h1>INAV</h1>
        <nav>
          <a href="/">Início</a>
          <a href="/quem-somos">Quem Somos</a>
          <a href="/educacao-infantil">Educação Infantil</a>
          <a href="/transparencia.html">Transparência</a>
        </nav>
      </header>
    `;
  }
}

customElements.define('app-header', AppHeader);
