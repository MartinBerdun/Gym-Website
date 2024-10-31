/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
    navToggle = document.getElementById('nav-toggle'),
    navClose = document.getElementById('nav-close');


/* ====== Menu show ======== */
/* Validate if constant exists */
if(navToggle){
    navToggle.addEventListener('click', ()=> {
        navMenu.classList.add('show-menu')
    })
}

/* ====== Menu HIDDEN ======== */
/* Validate if constant exists */

if(navClose){
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu')
    })
}

/*=============== REMOVE MENU MOBILE ===============*/
//PARA QUE CADA VEZ QUE SE APRIETE UN LINK EL NAV SE GUARDE

const navLink = document.querySelectorAll('.nav__link');

const linkAction = () => {
    const navMenu = document.getElementById('nav-menu');
    //when we click on each nav__link, we remove the show-menu
    navMenu.classList.remove('show-menu');
}

navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== CHANGE BACKGROUND HEADER ===============*/

const scrollHeader = () => {
    const header = document.getElementById('header');
    //when the scroll is greater than 50 viewport heigth, add the scroll-header class
    this.scrollY >= 50 ? header.classList.add('bg-header')
                        : header.classList.remove('bg-header')
}

window.addEventListener('scroll', scrollHeader);

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/

const sections = document.querySelectorAll('section[id]');

const scrollActive = () => {
    const scrollY = window.screenY;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 58;
        const sectionId = current.getAttribute('id');
        const sectionClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            sectionClass.classList.add('active-link')
        } else {
            sectionClass.classList.remove('active-link')
        }
    })
}

window.addEventListener('scroll', scrollActive)


/*=============== SHOW SCROLL UP ===============*/ 

const scrollup = () => {
    const scrollUp = document.getElementById('scroll-up');

    this.scrollY >= 350 ? scrollUp.classList.add('show-scroll')
                        : scrollUp.classList.remove('show-scroll')
}

window.addEventListener('scroll', scrollup)



/*=============== SCROLL REVEAL ANIMATION ===============*/

const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2500,
    delay : 400,
})

sr.reveal('.home__datam,.footer__container, .footer__group')
sr.reveal('.home__img', {delay: 700, origin:'bottom'})
sr.reveal('.logos__img, .program__card, .pricing__card', {interval: 100})
sr.reveal('.choose__img, .calculate__content', {origin: 'left'})
sr.reveal('.choose__content, .calculate__img', {origin: 'right'})


/*=============== CALCULATE JS ===============*/
const calculateForm = document.getElementById('calculate-form'),
    calculateCm = document.getElementById('calculate-cm'),
    calculateKg = document.getElementById('calculate-kg'),
    calculateMessage = document.getElementById('calculate-message');

const calculateBmi = (e) => {
    e.preventDefault();

    //Check if fields have a value

    if(calculateCm.value === '' || calculateKg,value === ''){
        //add and remove color
        calculateMessage.classList.remove('color-green')
        calculateMessage.classList.add('color-red')

        //Show message
        calculateMessage.textContent = 'Fill in the height and Weight';

        //Remove message three seconds
        setTimeout(()=> {
            calculateMessage.textContent = ''
        }, 3000)

    } else {
        //BMI FORMULA
        const cm = calculateCm.value/100,
            kg = calculateKg.value,
            bmi = Math.round(kg / (cm * cm));

        //show your health status
        if(bmi< 18.5){
            //Add color and display message
            calculateMessage.classList.add('color-green');
            calculateMessage.textContent = `Your BMI is ${bmi} and you are skinny`
        } else if ( bmi < 25){
            calculateMessage.classList.add('color-green');
            calculateMessage.textContent = `Your BMI is ${bmi} and you are healthy`
        } else{
            calculateMessage.classList.add('color-green');
            calculateMessage.textContent = `Your BMI is ${bmi} and you are overweight`
        }

        //to clear the input field
        calculateCm.value = ''
        calculateKg.value = ''

        //remove message four seconds
        setTimeout(()=> {
            calculateMessage.textContent = ''
        }, 4000)
    }

}

calculateForm.addEventListener('submit', calculateBmi)

/*=============== EMAIL JS ===============*/

const contactForm = document.getElementById('contact-form'),
    contactMessage = document.getElementById('contact-message'),
    contactUser = document.getElementById('contact-user');

const sendEmail = (e)=>{
    e.preventDefault();

    //check if the field has a value

    if(contactUser.value === '' ){
        //Add and remove color
        contactMessage.classList.remove('color-green');
        contactMessage.classList.add('color-red');

        //show message
        contactMessage.textContent = 'You must enter your email'
        
        //remove message three seconds
        setTimeout(() => {
            contactMessage.textContent = ''
        }, 3000);

    }else {
        //serviceID - templateID - #form - publicKey
        emailjs.sendForm('service_o8szh0r', 'template_lariojt', '#contact-form', 'l25L7rkJK3Tbx46ob')
            .then(()=>{
                //show message and add color
                contactMessage.classList.add('color-green')
                contactMessage.textContent = 'You registered succesfully!';

                setTimeout(() => {
                    contactMessage.textContent = ''
                }, 3000);
            }, (error) =>{
                //mail sending error
                alert('Something has failed! Try againn!' , error)
            })

        //clear the input field
        contactUser.value = ''
    }

}


contactForm.addEventListener('submit', sendEmail)