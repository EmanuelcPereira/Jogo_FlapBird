console.log('Flappy Bird');

const sprites = new Image();
sprites.src = './sprites.png';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');


//Plano de Fundo
const planoDeFundo = {
    spriteX: 390,
    spriteY: 0,
    largura: 275,
    altura: 204,
    x: 0,
    y: canvas.height - 204,
    desenha() {
        contexto.fillStyle = '#70c5ce',
        contexto.fillRect(0,0, canvas.width, canvas.height),

        contexto.drawImage(
            sprites,
            planoDeFundo.spriteX, planoDeFundo.spriteY,
            planoDeFundo.largura, planoDeFundo.altura,
            planoDeFundo.x, planoDeFundo.y,
            planoDeFundo.largura, planoDeFundo.altura,
        );

        contexto.drawImage(
            sprites,
            planoDeFundo.spriteX, planoDeFundo.spriteY,
            planoDeFundo.largura, planoDeFundo.altura,
            (planoDeFundo.x + planoDeFundo.largura), planoDeFundo.y,
            planoDeFundo.largura, planoDeFundo.altura,
        );
    },
};

// [Chao]
const chao = {
    spriteX: 0,
    spriteY: 610,
    largura: 224,
    altura: 112,
    x: 0,
    y: canvas.height - 112,
    desenha() {
        contexto.drawImage(
            sprites,
            chao.spriteX, chao.spriteY,
            chao.largura, chao.altura,
            chao.x, chao.y,
            chao.largura, chao.altura,
        );

        contexto.drawImage(
            sprites,
            chao.spriteX, chao.spriteY,
            chao.largura, chao.altura,
            (chao.x + chao.largura), chao.y,
            chao.largura, chao.altura,
        );

        
    },
}

const FlappyBird = {
    spriteX: 0,
    spriteY: 0,
    largura: 33,
    altura: 24,
    x: 10,
    y: 50,
    gravidade:0.25,
    velocidade: 0,
    atualiza() {
        FlappyBird.velocidade += FlappyBird.gravidade; 
        FlappyBird.y += FlappyBird.velocidade;
    },

    desenha() {
        contexto.drawImage(
            sprites,
            FlappyBird.spriteX, FlappyBird.spriteY,
            FlappyBird.largura, FlappyBird.altura,
            FlappyBird.x, FlappyBird.y,
            FlappyBird.largura, FlappyBird.altura,
        );
    }
}


// Mensagem Inicial
const mensagemGetReady = {
    sX: 134,
    sY: 0,
    w: 174,
    h: 152,
    x: (canvas.width /2) - 174 /2,
    y: 50,
    desenha() {
        contexto.drawImage(
            sprites,
            mensagemGetReady.sX, mensagemGetReady.sY,
            mensagemGetReady.w, mensagemGetReady.h,
            mensagemGetReady.x, mensagemGetReady.y,
            mensagemGetReady.w, mensagemGetReady.h,
        );      
    },
}


//
//
//

let telaAtiva = {};
function mudaParaTela(novaTela) {
    telaAtiva = novaTela;
}

const telas = {
    inicio: {
        desenha(){
            planoDeFundo.desenha();
            chao.desenha();
            FlappyBird.desenha();
            mensagemGetReady.desenha();
        },

        click() {
            mudaParaTela(telas.JOGO);
        },
        atualiza() {

        }
    },
};

telas.JOGO = {
    desenha() {
        planoDeFundo.desenha();
        chao.desenha();
        FlappyBird.desenha();
    },
    atualiza() {
        FlappyBird.atualiza();
    }
}

function loop() {
    
    telaAtiva.desenha();
    telaAtiva.atualiza();
    
    requestAnimationFrame(loop);

}

window.addEventListener('click', function() {
    if (telaAtiva.click) {
        telaAtiva.click();
    }
});

mudaParaTela(telas.inicio);

loop();






























