enum BodyLightsPart {
    //% block="Left 1"
    Left1,
    //% block="Left 2"
    Left2,
    //% block="Right 1"
    Right1,
    //% block="Right 2"
    Rigth2,
    //% block="All"
    All,
}

enum HandPosition {
    Center,
    Left,
    Right
}
enum EyePosition {
    Center,
    Left,
    Right
}
enum Eyes {
    //% block="Left Eye"
    Left,
    //% block="Right Eye"
    Right,
    //% block="Both Eyes"
    Both
}

enum Language {
    English,
    Spanish
}


namespace robot {
    let kitroniKStrip: neopixel.Strip = null
    let leftEyeStrip: neopixel.Strip = null
    let righEyeStrip: neopixel.Strip = null

    let bodyLightsStrip: neopixel.Strip = null

    let currentDisplayText: string = null

    basic.forever(function () {
        if (currentDisplayText != null) {
            max7219_matrix.scrollText(
                currentDisplayText,
                75,
                500
            )
            currentDisplayText = null
        }
    })
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

        bodyLightsStrip = neopixel.create(DigitalPin.P2, 4, NeoPixelMode.RGB_RGB)

        Kitronik_Robotics_Board.servoWrite(Kitronik_Robotics_Board.Servos.Servo1, 90)
        Kitronik_Robotics_Board.servoWrite(Kitronik_Robotics_Board.Servos.Servo2, 90)
        Kitronik_Robotics_Board.servoWrite(Kitronik_Robotics_Board.Servos.Servo5, 90)

        pins.setAudioPinEnabled(false)
        serial.redirect(
            SerialPin.P8,
            SerialPin.P0,
            BaudRate.BaudRate9600
        )

    }


    //% block="say $text in $language"
    //% group="Sound"
    export function say(text: string, language: Language) {
        const serialData = {
            type: "TTS",
            text,
            lg: language == Language.English ? 'EN' : 'ES'
        }
        const jsonData = JSON.stringify(serialData)
        serial.writeLine(jsonData)
    }

    //% block
    //% group="Display"
    export function showText(text: string) {
        currentDisplayText = text
    }
    //% block
    //% group="Display"
    export function clearText() {
        max7219_matrix.clearAll()
    }

    //% block="change $eyes lights to $color"
    //% color.shadow="colorNumberPicker"
    //% group="Lights"
    export function showEyesColor(eyes: Eyes, color: number) {
        switch (eyes) {
            case Eyes.Left:
                leftEyeStrip.showColor(color)
                break;
            case Eyes.Right:
                righEyeStrip.showColor(color)
                break;
            case Eyes.Both:
                leftEyeStrip.showColor(color)
                righEyeStrip.showColor(color)
                break;
        }
    }

    //% block="turn $eyes lights off"
    //% group="Lights"
    export function clearEyesColor(eyes: Eyes) {
        showEyesColor(eyes, NeoPixelColors.Black)
    }




    //% block="change $bodyPart body lights to $color"
    //% color.shadow="colorNumberPicker"
    //% group="Lights"
    export function showBodyColor(bodyPart: BodyLightsPart, color: number) {
        switch (bodyPart) {
            case BodyLightsPart.Left1:
                bodyLightsStrip.setPixelColor(1, color)
                break;
            case BodyLightsPart.Left2:
                bodyLightsStrip.setPixelColor(0, color)
                break;
            case BodyLightsPart.Right1:
                bodyLightsStrip.setPixelColor(2, color)
                break;
            case BodyLightsPart.Rigth2:
                bodyLightsStrip.setPixelColor(3, color)
                break;
            case BodyLightsPart.All:
                bodyLightsStrip.setPixelColor(0, color)
                bodyLightsStrip.setPixelColor(1, color)
                bodyLightsStrip.setPixelColor(2, color)
                bodyLightsStrip.setPixelColor(3, color)
                break;
        }
        bodyLightsStrip.show()
    }

    //% block="turn $bodyPart body lights off"
    //% color.shadow="colorNumberPicker"
    //% group="Lights"
    export function clearBodyColor(bodyPart: BodyLightsPart) {
        showBodyColor(bodyPart, NeoPixelColors.Black)
    }


    //% block="move $eye to the $eyePosition"
    //% group="Servos"
    export function moveEye(eye: Eyes, eyePosition: EyePosition) {
        if (eye == Eyes.Left) {
            if (eyePosition == EyePosition.Left) {
                Kitronik_Robotics_Board.servoWrite(Kitronik_Robotics_Board.Servos.Servo5, 120)
            }
            else if (eyePosition == EyePosition.Right) {
                Kitronik_Robotics_Board.servoWrite(Kitronik_Robotics_Board.Servos.Servo5, 60)
            }
            else {
                Kitronik_Robotics_Board.servoWrite(Kitronik_Robotics_Board.Servos.Servo5, 90)
            }
        }
        else if (eye == Eyes.Right) {
            if (eyePosition == EyePosition.Left) {
                Kitronik_Robotics_Board.servoWrite(Kitronik_Robotics_Board.Servos.Servo2, 120)
            }
            else if (eyePosition == EyePosition.Right) {
                Kitronik_Robotics_Board.servoWrite(Kitronik_Robotics_Board.Servos.Servo2, 60)
            }
            else {
                Kitronik_Robotics_Board.servoWrite(Kitronik_Robotics_Board.Servos.Servo2, 90)
            }
        }
        else {
            if (eyePosition == EyePosition.Left) {
                Kitronik_Robotics_Board.servoWrite(Kitronik_Robotics_Board.Servos.Servo2, 120)
                Kitronik_Robotics_Board.servoWrite(Kitronik_Robotics_Board.Servos.Servo5, 120)
            }
            else if (eyePosition == EyePosition.Right) {
                Kitronik_Robotics_Board.servoWrite(Kitronik_Robotics_Board.Servos.Servo2, 60)
                Kitronik_Robotics_Board.servoWrite(Kitronik_Robotics_Board.Servos.Servo5, 60)
            }
            else {
                Kitronik_Robotics_Board.servoWrite(Kitronik_Robotics_Board.Servos.Servo2, 90)
                Kitronik_Robotics_Board.servoWrite(Kitronik_Robotics_Board.Servos.Servo5, 90)
            }
        }
    }


    //% block="move hand to the $handPosition"
    //% group="Servos"
    export function moveHand(handPosition: HandPosition) {
        if (handPosition == HandPosition.Left) {
            Kitronik_Robotics_Board.servoWrite(Kitronik_Robotics_Board.Servos.Servo1, 110)
        }
        else if (handPosition == HandPosition.Right) {
            Kitronik_Robotics_Board.servoWrite(Kitronik_Robotics_Board.Servos.Servo1, 70)
        }
        else {
            Kitronik_Robotics_Board.servoWrite(Kitronik_Robotics_Board.Servos.Servo1, 90)
        }
    }


    //% block
    //% group="Sensor"
    export function onMotionDetected(handler: () => void) {
        basic.forever(function () {
            const analogRead = pins.analogReadPin(AnalogPin.P10)
            pins.digitalReadPin(DigitalPin.P10);
            if (analogRead > 700) {
                handler();
            }
            basic.pause(3000)
        })
    }


    init()
}
