(function () {
  const body = document.querySelector('.page-body');
  const header = body.querySelector('.page-header');
  const logo = body.querySelector('.page-header__logo');
  const loginHeader = header.querySelector('.page-header__login');
  const cart = header.querySelector('.page-header__cart');
  const navToggle = header.querySelector('.nav-toggle');
  const headerMain = header.querySelector('.page-header__main');
  const overlay = body.querySelector('.overlay');
  const sliderSwiper = body.querySelector('.slider');
  const faq = body.querySelectorAll('.faq');
  const filterTitle = body.querySelector('.filter__title');
  const filterCatalogTitle = body.querySelectorAll('.filter-catalog__title');
  const loginPopap = body.querySelector('.login-popap');
  const loginPopapClose = body.querySelector('.login-popap__button-close');
  const loginForm = body.querySelector('.login-form');
  const loginEmail = body.querySelector('#email-login');
  const loginPassword = body.querySelector('#password');

  header.classList.remove('page-header--nojs');
  logo.classList.remove('page-header__logo--nojs');
  loginHeader.classList.remove('page-header__login--nojs');
  cart.classList.remove('page-header__cart--nojs');
  navToggle.classList.remove('nav-toggle--nojs');
  headerMain.classList.remove('page-header__main--nojs');

  let storageEmail = '';
  storageEmail = localStorage.getItem('email');

  if (storageEmail) {
    loginEmail.value = storageEmail;
  }

  const monitorsWindowSizeOverlay = () => {
    if (window.innerWidth >= 1024) {
      overlay.classList.remove('overlay--open');
    } else {
      overlay.classList.add('overlay--open');
    }
  };

  const monitorsWindowSizeHeaderMain = () => {
    if (window.innerWidth >= 1024) {
      headerMain.style.marginTop = '';
    } else {
      headerMain.style.marginTop = '10px';
    }
  };

  const closesdNavigation = () => {
    window.removeEventListener('resize', monitorsWindowSizeOverlay, monitorsWindowSizeHeaderMain);
    headerMain.style.marginTop = '';
    overlay.classList.remove('overlay--open');
    header.classList.remove('page-header--opened');
    logo.classList.remove('page-header__logo--opened');
    loginHeader.classList.remove('page-header__login--opened');
    cart.classList.remove('page-header__cart--opened');
    cart.classList.add('page-header__cart--closed');
    headerMain.classList.add('page-header__main--closed');
    headerMain.classList.remove('page-header__main--opened');
    navToggle.classList.add('nav-toggle--closed');
    navToggle.classList.remove('nav-toggle--opened');
  };

  navToggle.addEventListener('click', () => {
    if (headerMain.classList.contains('page-header__main--closed')) {
      window.addEventListener('resize', monitorsWindowSizeOverlay, monitorsWindowSizeHeaderMain);
      headerMain.style.marginTop = '10px';
      body.classList.add('page-body--popup');
      overlay.classList.add('overlay--open');
      header.classList.add('page-header--opened');
      logo.classList.add('page-header__logo--opened');
      loginHeader.classList.add('page-header__login--opened');
      cart.classList.remove('page-header__cart--closed');
      cart.classList.add('page-header__cart--opened');
      headerMain.classList.remove('page-header__main--closed');
      headerMain.classList.add('page-header__main--opened');
      navToggle.classList.remove('nav-toggle--closed');
      navToggle.classList.add('nav-toggle--opened');
    } else {
      closesdNavigation();
      body.classList.remove('page-body--popup');
    }
  });

  loginHeader.addEventListener('click', (evt) => {
    evt.preventDefault();

    closesdNavigation();
    loginPopap.classList.add('login-popap--active');
    body.classList.add('page-body--popup');
    loginEmail.focus();
  });

  window.addEventListener('keydown', (evt) => {
    if (evt.keyCode === 27) {
      if (loginPopap.classList.contains('login-popap--active')) {
        evt.preventDefault();

        loginPopap.classList.remove('login-popap--active');
        body.classList.remove('page-body--popup');
      }
    }
  });

  loginPopap.addEventListener('click', (evt) => {
    if (evt.target === loginPopap) {
      loginPopap.classList.remove('login-popap--active');
      body.classList.remove('page-body--popup');
    }
  });

  loginPopapClose.addEventListener('click', (evt) => {
    evt.preventDefault();

    loginPopap.classList.remove('login-popap--active');
    body.classList.remove('page-body--popup');
  });

  loginForm.addEventListener('submit', (evt) => {
    if (!loginEmail.value || !loginPassword.value) {
      evt.preventDefault();
    } else {
      evt.preventDefault();

      loginPopap.classList.remove('login-popap--active');
      body.classList.remove('page-body--popup');
      localStorage.setItem('email', loginEmail.value);
    }
  });

  if (faq) {
    for (let i = 0; i < faq.length; i++) {
      faq[i].classList.remove('faq--nojs');
      faq[i].addEventListener('click', () => {
        faq[i].classList.toggle('faq--active');
      });

      faq[i].addEventListener('keydown', (evt) => {
        if (evt.key === ' ') {
          evt.preventDefault();
          faq[i].classList.toggle('faq--active');
        }
      });
    }
  }

  /*global Swiper*/
  /*eslint no-undef: "error"*/

  if (sliderSwiper) {
    sliderSwiper.querySelector('.slider__container').classList.remove('slider__container--nojs');
    sliderSwiper.querySelector('.swiper').classList.remove('swiper--nojs');
    sliderSwiper.querySelector('.swiper-wrapper').classList.remove('swiper-wrapper--nojs');
    sliderSwiper.querySelectorAll('.swiper-button').forEach((elem) => {
      elem.classList.remove('swiper-button--nojs');
    });
    sliderSwiper.querySelectorAll('.swiper-slide').forEach((elem) => {
      elem.classList.remove('swiper-slide--nojs');
      elem.classList.remove('swiper-slide--invisible-desktop');
      elem.classList.remove('swiper-slide--invisible-tablet');
    });

    const swiper = new Swiper('.swiper', {
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },

      spaceBetween: 30,
      grabCursor: true,
      simulateTouch: false,

      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },

      breakpoints: {
        0: {
          slidesPerView: 2,
          slidesPerGroup: 2,
          pagination: {
            type: 'custom',
            renderCustom: function (_swiper, current, total) {
              return `${current} &nbsp;of&nbsp; ${total}`;
            },
          },
        },
        768: {
          slidesPerView: 2,
          slidesPerGroup: 2,
          pagination: {
            type: 'bullets',
            renderBullet: function (index, className) {
              return `<span class="${className}">${index + 1}</span>`;
            },
          },
        },

        1024: {
          slidesPerView: 4,
          slidesPerGroup: 4,
          grabCursor: false,
          pagination: {
            type: 'bullets',
            renderBullet: function (index, className) {
              return `<span class="${className}">${index + 1}</span>`;
            },
          },
        },
      },
    });

    window.addEventListener('resize', () => {
      swiper.pagination.update();
      swiper.pagination.render();
    });
  }

  if (filterCatalogTitle) {
    for (let i = 0; i < filterCatalogTitle.length; i++) {
      filterCatalogTitle[i].classList.remove('filter-catalog__title--nojs');

      filterCatalogTitle[i].addEventListener('click', () => {
        filterCatalogTitle[i].classList.toggle('filter-catalog__title--active');
      });

      filterCatalogTitle[i].addEventListener('keydown', (evt) => {
        if (evt.key === ' ') {
          evt.preventDefault();
          filterCatalogTitle[i].classList.toggle('filter-catalog__title--active');
        }
      });
    }
  }

  if (filterTitle) {
    const filterWrapper = body.querySelector('.filter__wrapper');
    const filterCloseButton = body.querySelector('.filter__close-button');

    filterTitle.classList.remove('filter__title--nojs');
    filterWrapper.classList.remove('filter__wrapper--nojs');

    const monitorsWindowSizeFilter = () => {
      if (window.innerWidth >= 1024) {
        body.classList.remove('page-body--popup');
      } else {
        body.classList.add('page-body--popup');
      }
    };

    filterTitle.addEventListener('click', (evt) => {
      evt.preventDefault();
      window.addEventListener('resize', monitorsWindowSizeFilter);

      filterWrapper.classList.add('filter__wrapper--active');
      filterCloseButton.classList.add('filter__close-button--active');
      body.classList.add('page-body--popup');
    });

    if (filterCloseButton) {
      filterCloseButton.addEventListener('click', (evt) => {
        evt.preventDefault();
        window.removeEventListener('resize', monitorsWindowSizeFilter);

        filterCloseButton.classList.remove('filter__close-button--active');
        filterWrapper.classList.remove('filter__wrapper--active');
        body.classList.remove('page-body--popup');
      });
    }

    window.addEventListener('keydown', (evt) => {
      if (evt.keyCode === 27) {
        if (filterWrapper.classList.contains('filter__wrapper--active')) {
          evt.preventDefault();
          window.removeEventListener('resize', monitorsWindowSizeFilter);

          filterCloseButton.classList.remove('filter__close-button--active');
          filterWrapper.classList.remove('filter__wrapper--active');
          body.classList.remove('page-body--popup');
        }
      }
    });
  }
})();
