function introducao () {
    for (let index = 0; index < 2; index++) {
        criar_sequencia()
        for (let índice = 0; índice <= 3; índice++) {
            ativar_leds(sequencia[índice], 10)
        }
    }
    basic.showLeds(`
        # # . # #
        # # . # #
        . . . . .
        # . . . #
        . # # # .
        `)
    basic.showLeds(`
        # # . . .
        # # . # #
        . . . . .
        # . . . #
        . # # # .
        `)
    basic.showLeds(`
        # # . # #
        # # . # #
        . . . . .
        # . . . #
        . # # # .
        `)
    basic.clearScreen()
}
function criar_sequencia () {
    direcao = [
    "N",
    "O",
    "S",
    "L"
    ]
    temporaria = []
    sequencia = []
    for (let índice = 0; índice <= direcao.length - 1; índice++) {
        temporaria.push(direcao[índice])
    }
    for (let index = 0; index < 4; index++) {
        posicao = randint(0, temporaria.length - 1)
        sequencia.unshift(temporaria[posicao])
        temporaria.removeAt(posicao)
    }
}
function ativar_leds (seta: string, tempo_exposicao: number) {
    brilho = 9
    while (brilho > -1) {
        if (seta == "N") {
            led.plotBrightness(2, 0, Math.map(brilho, 0, 9, 0, 255))
            led.plotBrightness(3, 0, Math.map(brilho, 0, 9, 0, 255))
            led.plotBrightness(4, 0, Math.map(brilho, 0, 9, 0, 255))
            led.plotBrightness(3, 1, Math.map(brilho, 0, 9, 0, 255))
            led.plotBrightness(4, 1, Math.map(brilho, 0, 9, 0, 255))
            led.plotBrightness(4, 2, Math.map(brilho, 0, 9, 0, 255))
            if (brilho == 9) {
                music.playTone(440, music.beat(BeatFraction.Whole))
            }
        }
        if (seta == "L") {
            led.plotBrightness(4, 2, Math.map(brilho, 0, 9, 0, 255))
            led.plotBrightness(3, 3, Math.map(brilho, 0, 9, 0, 255))
            led.plotBrightness(4, 3, Math.map(brilho, 0, 9, 0, 255))
            led.plotBrightness(2, 4, Math.map(brilho, 0, 9, 0, 255))
            led.plotBrightness(3, 4, Math.map(brilho, 0, 9, 0, 255))
            led.plotBrightness(4, 4, Math.map(brilho, 0, 9, 0, 255))
            if (brilho == 9) {
                music.playTone(659, music.beat(BeatFraction.Whole))
            }
        }
        if (seta == "S") {
            led.plotBrightness(0, 2, Math.map(brilho, 0, 9, 0, 255))
            led.plotBrightness(0, 3, Math.map(brilho, 0, 9, 0, 255))
            led.plotBrightness(1, 3, Math.map(brilho, 0, 9, 0, 255))
            led.plotBrightness(0, 4, Math.map(brilho, 0, 9, 0, 255))
            led.plotBrightness(1, 4, Math.map(brilho, 0, 9, 0, 255))
            led.plotBrightness(2, 4, Math.map(brilho, 0, 9, 0, 255))
            if (brilho == 9) {
                music.playTone(277, music.beat(BeatFraction.Whole))
            }
        }
        if (seta == "O") {
            led.plotBrightness(0, 0, Math.map(brilho, 0, 9, 0, 255))
            led.plotBrightness(0, 1, Math.map(brilho, 0, 9, 0, 255))
            led.plotBrightness(0, 2, Math.map(brilho, 0, 9, 0, 255))
            led.plotBrightness(1, 0, Math.map(brilho, 0, 9, 0, 255))
            led.plotBrightness(1, 1, Math.map(brilho, 0, 9, 0, 255))
            led.plotBrightness(2, 0, Math.map(brilho, 0, 9, 0, 255))
            if (brilho == 9) {
                music.playTone(330, music.beat(BeatFraction.Whole))
            }
        }
        brilho += -1
        basic.pause(tempo_exposicao)
    }
}
let opcao_jogador = ""
let brilho = 0
let posicao = 0
let temporaria: string[] = []
let direcao: string[] = []
let sequencia: string[] = []
let velocidade = 30
game.setScore(0)
introducao()
criar_sequencia()
basic.forever(function () {
    while (!(game.isGameOver())) {
        basic.clearScreen()
        basic.showLeds(`
            # # # # #
            # . . . .
            # # # # #
            . . . . #
            # # # # #
            `)
        basic.pause(1000)
        basic.clearScreen()
        for (let índice = 0; índice <= sequencia.length - 1; índice++) {
            ativar_leds(sequencia[índice], velocidade)
        }
        basic.showString("#")
        basic.pause(1000)
        basic.clearScreen()
        for (let índice = 0; índice <= sequencia.length - 1; índice++) {
            opcao_jogador = "#"
            while (opcao_jogador == "#") {
                if (input.acceleration(Dimension.Y) < 40 && input.acceleration(Dimension.X) > 40) {
                    opcao_jogador = "N"
                }
                if (input.acceleration(Dimension.Y) > 40 && input.acceleration(Dimension.X) > 40) {
                    opcao_jogador = "L"
                }
                if (input.acceleration(Dimension.Y) > 40 && input.acceleration(Dimension.X) < 40) {
                    opcao_jogador = "S"
                }
                if (input.acceleration(Dimension.Y) < 40 && input.acceleration(Dimension.X) < 40) {
                    opcao_jogador = "O"
                }
                ativar_leds(opcao_jogador, velocidade)
            }
            if (opcao_jogador != sequencia[índice]) {
                game.gameOver()
            }
        }
        velocidade += -2
        game.addScore(1)
        sequencia.push(direcao[randint(0, 3)])
        basic.pause(500)
    }
})
