namespace time {

    //% block="pause3 $ms"
    //% ms.shadow="timePicker"
    export function pause3(ms: number) {
Kitronik_Robotics_Board.servoStop(Kitronik_Robotics_Board.Servos.Servo1)
    }

    /**
     * Custom text dropdown
     */

    /**
      * Get the word field editor
      * @param word
      */
    //% blockId=wordPicker block="$word"
    //% blockHidden=true
    //% colorSecondary="#FFFFFF"
    //% word.fieldEditor="textdropdown"
    //% word.fieldOptions.decompileLiterals=true
    //% word.fieldOptions.values='hi,hello'
    //% word.defl='hello'
    export function __wordPicker(word: string): string {
        return word;
    }


    //% block="say $word"
    //% word.shadow="wordPicker"
    export function say(word: string) {

    }
}
