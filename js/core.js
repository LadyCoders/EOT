const accordions = document.querySelectorAll('.accordion')

accordions.forEach((accordion) => {
  accordion.addEventListener('click', () => {
    // Закрываем все аккордионы перед открытием текущего
    accordions.forEach((otherAccordion) => {
      if (otherAccordion !== accordion) {
        otherAccordion.querySelector('.accordion-body').classList.remove('active')
      }
    })

    // Открываем или закрываем текущий аккордион
    const body = accordion.querySelector('.accordion-body')
    body.classList.toggle('active')
  })
})

