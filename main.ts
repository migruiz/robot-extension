enum BodyPart {
    //% block="Left Eye"
    LeftEye,
    //% block="Right Eye"
    RightEye,
    //% block="Body"
    Body,
}
namespace robot {
    let kitroniKStrip: neopixel.Strip = null
    let leftEyeStrip: neopixel.Strip = null
    let righEyeStrip: neopixel.Strip = null
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
        kitroniKStrip = neopixel.create(DigitalPin.P1, 10, NeoPixelMode.RGB)
        leftEyeStrip = kitroniKStrip.range(0, 5)
        righEyeStrip = kitroniKStrip.range(5, 5)
    }

    //% block
    export function showText(text: string) {
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

    //% block="set $bodyPart leds color to $color"
    //% color.shadow="colorNumberPicker"
    export function showColor(bodyPart: BodyPart, color: number) {
        switch (bodyPart) {
            case BodyPart.LeftEye:
                leftEyeStrip.showColor(color)
                break;
            case BodyPart.RightEye:
                righEyeStrip.showColor(color)
                break;
        }
    }

    //% block="turn $bodyPart leds off"
    //% color.shadow="colorNumberPicker"
    export function clearColor(bodyPart: BodyPart) {
        switch (bodyPart) {
            case BodyPart.LeftEye:
                leftEyeStrip.showColor(NeoPixelColors.Black)
                break;
            case BodyPart.RightEye:
                righEyeStrip.showColor(NeoPixelColors.Black)
                break;
        }
    }

    init()
}
