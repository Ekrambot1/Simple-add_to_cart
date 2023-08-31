const stars = document.querySelectorAll('.star');
const current_rating = document.querySelector('.current-rating');
let rate = document.querySelector('.ratings-word');
let submit= document.querySelector('.submit');
let container=document.querySelector('.container');

stars.forEach((star, index) => {
    star.addEventListener('click', () => {

        let current_star = index + 1;
        current_rating.innerText = `${current_star} of 5`;
        submit.style.display='block';

        stars.forEach((star, i) => {
            if (current_star >= i + 1) {
                star.innerHTML = '&#9733;';
            }
            else {
                star.innerHTML = '&#9734;';
            }

            switch (current_star) {
                case 1:
                    rate.textContent = 'Very Bad';
                    break;
                case 2:
                    rate.textContent = 'Bad';
                    break;
                case 3:
                    rate.textContent = 'Ok';
                    break;
                    case 4:
                    rate.textContent = 'Good';
                    break;
                    case 5:
                    rate.textContent = 'Exellent';
                    break;
                default:
                    break;
            }
        });


    });
});

submit.addEventListener("click",function(){
   container.innerHTML='';
   container.innerHTML='<h1 style="text-align:center;">Thank You For Your Feedback</h2>';
   setTimeout(() => {
    window.location.href='index.html';
   }, 1000);
})