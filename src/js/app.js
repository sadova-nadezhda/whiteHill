const toggleClass = (element, className, condition) => {
  condition ? element.classList.add(className) : element.classList.remove(className);
};

window.addEventListener("load", function () {
  const header = document.querySelector("header");
  let link = document.querySelector(".header__burger");
  let menu = document.querySelector(".header__nav");
  if (menu) {
    link.addEventListener(
      "click",
      function () {
        link.classList.toggle("active");
        menu.classList.toggle("open");
      },
      false
    );
    window.addEventListener("scroll", () => {
      if (menu.classList.contains("open")) {
        link.classList.remove("active");
        menu.classList.remove("open");
      }
    });
    document.addEventListener("click", (e) => {
      let target = e.target;
      if (
        !target.classList.contains("header__nav") &&
        !target.classList.contains("header__burger")
      ) {
        link.classList.remove("active");
        menu.classList.remove("open");
      }
    });
  }

  // Обработчик скролла
  const handleScroll = () => {
    toggleClass(header, "scroll", window.scrollY > 0);
  };

  handleScroll();

  // Fancybox

  Fancybox.bind("[data-fancybox]");

  // Tabs

  const allTabs = document.querySelectorAll("[data-tabs]");

  if (allTabs.length > 0) {
    allTabs.forEach((tabElement) => {
      const selector = `[data-tabs="${tabElement.getAttribute("data-tabs")}"]`;
      const tabs = new Tabby(selector);
    });
  }

  // AOS Animate

  AOS.init({
    duration: 1200,
    offset: 0
  });

  // Показать еще
  const showMore = document.querySelector('.layouts__button.show');
  const ShowPerClick = 2;

  if(showMore) {
    showMore.addEventListener('click', function () {
      const rows = document.querySelectorAll('.layouts__cards .hidden');
      
      if (rows.length === 0) {
        showMore.style.display = 'none';
        return;
      }

      Array.from(rows)
        .slice(0, ShowPerClick)
        .forEach(row => row.classList.remove('hidden'));
        
      if (!document.querySelector('.layouts__cards .hidden')) {
        showMore.style.display = 'none';
      }
    });
  }

  // Swipers

  var mainSwiper = new Swiper(".mainSwiper", {
    navigation: {
      nextEl: ".slider-next",
      prevEl: ".slider-prev",
    },
    pagination: {
      el: ".slider-pagination",
    },
  });

  // Modals

  function hideModal(modal) {
    modal.addEventListener('click', function(e) {
      const target = e.target;
      if (
        target.classList.contains("modal__close") ||
        target.classList.contains("modals") ||
        target.classList.contains("close")
      ) {
        modal.style.transition = "opacity 0.4s";
        modal.style.opacity = "0";
        setTimeout(() => {
          modal.style.display = "none";
        }, 400);
      }
    });
  }

  function showModal(modal) {
    modal.style.display = "flex";
    setTimeout(() => {
      modal.style.transition = "opacity 0.4s";
      modal.style.opacity = "1";
    }, 10);
  } 

  let modals = document.querySelector('.modals')
  let modalAll = document.querySelectorAll('.modal')
  let modalBtns = document.querySelectorAll(".modal-btn");

  if(modals && modalBtns){
    hideModal(modals);
    modalBtns.forEach( btn => {
      btn.addEventListener('click', () => {
        showModal(modals)
        let typeBtn = btn.dataset.type;
        modalAll.forEach( modal => {
          let typeModal = modal.dataset.type;
          modal.style.display = 'none'
          if(typeBtn == typeModal) {
            modal.style.display = 'block'
          }
        });
      })
    })
  }

  window.addEventListener("scroll", () => {
    handleScroll();
  });
});
