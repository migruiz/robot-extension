enum BodyPart {
    //% block="Left Eye"
    LeftEye,
    //% block="Right Eye"
    RightEye,
    //% block="Body"
    Body,
}
namespace robot {
    let strip: neopixel.Strip = null
    function init() {
        max7219_matrix.setup(
            4,
            DigitalPin.P16,
            DigitalPin.P15,
            DigitalPin.P14,
            DigitalPin.P13
        )
        max7219_matrix.for_4_in_1_modules(
            rotation_direction.clockwise,
            false
        )
        strip = neopixel.create(DigitalPin.P1, 10, NeoPixelMode.RGB)
    }

    //% block
    export function showText(text:string) {
        max7219_matrix.scrollText(
            text,
            75,
            500
        )
    }
    //% block
    export function clearText() {
        max7219_matrix.clearAll()
    }

    //% block="set $bodyPart to color $color"
    //% color.shadow="colorNumberPicker"
    export function showColor(bodyPart: BodyPart, color: number) {
       /* let components = {
            r: (color & 0xff0000) >> 16,
            g: (color & 0x00ff00) >> 8,
            b: (color & 0x0000ff)
        };
        */
        strip.showColor(color)
    }


    init()
}
