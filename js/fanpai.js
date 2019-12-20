var tag = [];

// 抽奖前

    $('.s1_over').click(function(){
        tag.splice(0,tag.length);
        $('.nav_youhui').css('top','185px');
        $('.nav_kecheng').css('top','148px');
        $('.nav_ziliao').css('top','219px');
        $('.zhanshi1').css('animation','none');
        $('.zhanshi2').css('animation','none');
        $('.zhanshi3').css('animation','none');
        $('.zhegai,.cj_back,.zg_mask').hide();
    });

$('.sm_p3').click(function () {
    $('.s1_start').trigger("click");
    $('.nav').addClass('nav_fix');

});




class MixOrMatch {
    constructor(totalTime, cards) {
        this.cardsArray = cards;
        this.totalTime = totalTime;
        this.timeRemaining = totalTime;
        this.timer = document.getElementById('time-remaining')
        this.ticker = document.getElementById('flips');
        
    }

    startGame() {
       /* document.getElementById('zhegai').classList.add('hidden');
        document.getElementById('zgsm_d1').classList.add('hidden');*/
        this.totalClicks = 0;
        this.timeRemaining = this.totalTime;
        this.cardToCheck = null;
        this.matchedCards = [];
        this.busy = true;
        setTimeout(() => {
           
            this.shuffleCards(this.cardsArray);
            this.countdown = this.startCountdown();
            this.busy = false;
        }, 500)
        this.hideCards();
        this.timer.innerText = this.timeRemaining;
        this.ticker.innerText = this.totalClicks;
    }
    startCountdown() {
        return setInterval(() => {
            this.timeRemaining--;
            this.timer.innerText = this.timeRemaining;
            if(this.timeRemaining === 0)
                this.gameOver();
        }, 1000);
    }
    gameOver() {
        clearInterval(this.countdown);
       
       
        document.getElementById('game-over-text').classList.add('visible');
    }
//  victory() {
//      clearInterval(this.countdown);
//    
//      document.getElementById('victory-text').classList.add('visible');
//  }
    hideCards() {
        this.cardsArray.forEach(card => {
            card.classList.remove('visible');
            card.classList.remove('matched');
        });
    }
    flipCard(card) {
        if(this.canFlipCard(card)) {
            
            this.totalClicks++;
            this.ticker.innerText = this.totalClicks;
            card.classList.add('visible');

            if(this.cardToCheck) {
                this.checkForCardMatch(card);
            } else {
                this.cardToCheck = card;
            }
        }
    }
    
    checkForCardMatch(card) {
        if(this.getCardType(card) === this.getCardType(this.cardToCheck))
            this.cardMatch(card, this.cardToCheck);
        else 
            this.cardMismatch(card, this.cardToCheck);

        this.cardToCheck = null;
    }
    
   
    cardMatch(card1, card2) {
        /////////////
        this.matchedCards.push(card1);
        this.matchedCards.push(card2);
        card1.classList.add('matched');
        card2.classList.add('matched');
        if( $(".matched").hasClass("ka1") ){
            setTimeout(function(){
                $('.nav_kecheng').css('top','50px');
            },2000)
            $('.zhanshi1').css('animation','zhanshi1 2s forwards')
             tag.push('1');
         }
        if( $(".matched").hasClass("ka2") ){
            setTimeout(function(){
                $('.nav_youhui').css('top','80px')
            },2000)
            $('.zhanshi2').css('animation','zhanshi1 2s forwards')
            tag.push('1');
         }
        if( $(".matched").hasClass("ka3") ){
            setTimeout(function(){
                $('.nav_ziliao').css('top','20px');
            },2000)
            $('.zhanshi3').css('animation','zhanshi1 2s forwards')
            tag.push('1');
         }
        if(tag.length>=6){
            setTimeout(function(){
               $('.zhegai,.cj_back,.zg_mask').fadeIn(150);
                clearInterval(this.countdown);
            },1500)
        return false;
    }
        if(this.matchedCards.length === this.cardsArray.length)
            this.victory();
    }
    
    cardMismatch(card1, card2) {
        this.busy = true;
        setTimeout(() => {
            card1.classList.remove('visible');
            card2.classList.remove('visible');
            this.busy = false;
        }, 1000);
    }
    shuffleCards(cardsArray) {
        for (let i = cardsArray.length - 1; i > 0; i--) {
            const randIndex = Math.floor(Math.random() * (i + 1));
            [cardsArray[i], cardsArray[randIndex]] = [cardsArray[randIndex], cardsArray[i]];
        }
        cardsArray = cardsArray.map((card, index) => {
            card.style.order = index;
        });
    }
    getCardType(card) {
        return card.getElementsByClassName('card-value')[0].src;
    }
    canFlipCard(card) {
        return !this.busy && !this.matchedCards.includes(card) && card !== this.cardToCheck;
    }
}

if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    let overlays = Array.from(document.getElementsByClassName('overlay-text'));
    let cards = Array.from(document.getElementsByClassName('card'));
    let game = new MixOrMatch(30, cards);

    overlays.forEach(overlay => {
        overlay.addEventListener('click', () => {
            overlay.classList.remove('visible');
            game.startGame();
        });
    });

    cards.forEach(card => {
        card.addEventListener('click', () => {
            game.flipCard(card);
        });
    });
}




//关闭抽奖
$('.cj_close').click(function(){
    $('.nav').removeClass('nav_fix');
    $('.zhegai,.cj_back,.zg_mask').hide();
});
