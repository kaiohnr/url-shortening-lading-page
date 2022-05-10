class ShortUrl {
  openMenuBtn = document.querySelector('.menu-btn');
  navMenu = document.querySelector('.nav__links');
  btnShortUrl = document.querySelector('.btn-short-url');
  warnInvalidLink = document.querySelector('small');
  containerLinks = document.querySelector('.links__container ul');
  originalUrl = document.querySelector('.url-link');

  constructor() {
    this.openMenu();
    this.btnShortUrl.addEventListener('click', this.createMarkup.bind(this));
  }

  async shortLink() {
    const originalUrl = document.querySelector('.url-link');

    if (originalUrl.value.length == 0) {
      this.warnInvalidLink.style.display = 'block';
      originalUrl.classList.add('wrong-url');
    } else {
      this.warnInvalidLink.style.display = 'none';
      originalUrl.classList.remove('wrong-url');
    }

    try {
      const response = await fetch(
        `https://api.shrtco.de/v2/shorten?url=${originalUrl.value}`
      );
      if (!response.ok) throw new Error();
      const data = await response.json();

      return data.result.full_short_link;
    } catch (error) {
      console.log('Something went wrong. Try again!');
    }
  }

  async createMarkup() {
    const shortedLink = await this.shortLink();

    if (!shortedLink) return;

    const markup = `<li>
    <p class="original-link">${this.originalUrl.value} </p>
    <p class="shorted-link">${shortedLink} </p>
    <p class="btn-copy-link">Copy</p>
    </li>`;
    this.containerLinks.insertAdjacentHTML('afterbegin', markup);

    this.containerLinks.addEventListener('click', function (event) {
      if (event.target.classList.contains('btn-copy-link')) {
        navigator.clipboard.writeText(
          document.querySelector('.shorted-link').textContent
        );
        document.querySelector('.btn-copy-link').textContent = 'Copied!';
        document.querySelector('.btn-copy-link').style.backgroundColor =
          'hsl(257, 27%, 26%)';
        this.originalUrl.value = '';
      }
    });
  }

  openMenu() {
    this.openMenuBtn.addEventListener('click', () => {
      if (this.navMenu.classList.contains('nav-active')) {
        this.navMenu.classList.remove('nav-active');
      } else {
        this.navMenu.classList.add('nav-active');
      }

      // Menu Button Animation
      this.openMenuBtn.classList.toggle('animate');
    });
  }
}

new ShortUrl();
