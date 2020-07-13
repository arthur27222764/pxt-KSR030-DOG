/**
 * KSR030_Dog V0.010
 */
//% weight=10 color=#00A6F0 icon="\uf085" block="KSR030_Dog"
namespace KSR030_Dog {

    const SERVOMIN = 104 // this is the 'minimum' pulse length count (out of 4096)
    const SERVOMAX = 510 // this is the 'maximum' pulse length count (out of 4096)
    const IIC_ADDRESS = 0x40
    const LED0_ON_L = 0x06



    export enum DogServoNum {
        //% blockId="Head" block="Head"
        Head = 2,
        //% blockId="Tail" block="Tail"
        Tail = 3,
        //% blockId="L_Upper_Arm" block="L_Upper_Arm"
        L_Upper_Arm = 11,
        //% blockId="L_Forearm" block="L_Forearm"
        L_Forearm = 7,
        //% blockId="R_Upper_Arm" block="R_Upper_Arm"
        R_Upper_Arm = 10,
        //% blockId="R_Forearm" block="R_Forearm"
        R_Forearm = 6,
        //% blockId="L_Upper_Thigh" block="L_Upper_Thigh"
        L_Upper_Thigh = 8,
        //% blockId="L_Lower_Thigh" block="L_Lower_Thigh"
        L_Lower_Thigh = 4,
        //% blockId="R_Upper_Thigh" block="R_Upper_Thigh"
        R_Upper_Thigh = 9,
        //% blockId="R_Lower_Thigh" block="R_Lower_Thigh"
        R_Lower_Thigh = 5,

    }

    export enum DogState {
        //% blockId="Wagging_tail" block="calibration"
        calibration = 1,
        //% blockId="Forward" block="walk"
        walk = 2,
        //% blockId="Go_Left" block="Leftward"
        Leftward = 3,
        //% blockId="GO_Right" block="Rightward"
        Rightward = 4,
        //% blockId="Backward" block="stand_up"
        stand_up = 5,
        //% blockId="Leftward" block="sit_down"
        sit_down = 6,
        //% blockId="Rightward" block="get_down"
        get_down = 7,
        //% blockId="Stop" block="nodding"
        nodding = 8,
        //% blockId="Wagging_tail" block="Wagging_tail"
        Wagging_tail = 9,
        //% blockId="Wagging_tail" block="shake_hands"
        shake_hands = 10,
        //% blockId="Forward" block="run"
        run = 11,
        //% blockId="Wagging_tail" block="friendly"
        friendly = 12
        

    }


    function servo_map(x: number, in_min: number, in_max: number, out_min: number, out_max: number) {
        return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
    }

    function setPwm(channel: number, on: number, off: number): void {
        if (channel < 0 || channel > 15)
            return;

        let buf = pins.createBuffer(5);
        buf[0] = LED0_ON_L + 4 * channel;
        buf[1] = on & 0xff;
        buf[2] = (on >> 8) & 0xff;
        buf[3] = off & 0xff;
        buf[4] = (off >> 8) & 0xff;
        pins.i2cWriteBuffer(IIC_ADDRESS, buf);
    }

    /**
     * Used to move the given servo to the specified degrees (0-180) connected to the KSR030
     * @param channel The number (1-16) of the servo to move
     * @param degrees The degrees (0-180) to move the servo to 
     */
    //% blockId=KSR030_DogServo
    //% block="Servo channel %channel|degrees %degree"
    //% weight=86
    //% degree.min=0 degree.max=180
    export function DogServo(channel: DogServoNum, degree: number): void {

        // 50hz: 20,000 us
        //let servo_timing = (degree*1800/180+600) // 0.55 ~ 2.4
        //let pulselen = servo_timing*4096/20000
        //normal 0.5ms~2.4ms
        //SG90 0.5ms~2.0ms

        KSR030.Servo(DogServoNum, degree)

        //let pulselen = servo_map(degree, 0, 180, SERVOMIN, SERVOMAX);
        //let pulselen = servo_map(degree, 0, 180, servomin, servomax);
        //setPwm(channel, 0, pulselen);

    }
    //% blockId=KSR030_Dog_Action
    //% block="Action %index|Speed %speed"
    //% weight=87
    //% speed.min=0 speed.max=255
    export function Dog_Action(index: DogState, speed: number): void {
        switch (index) {
            case DogState.calibration:
                DogServo(KSR030_Dog.DogServoNum.Head, 90)
                DogServo(KSR030_Dog.DogServoNum.Tail, 90)
                basic.pause(100)
                DogServo(KSR030_Dog.DogServoNum.L_Upper_Thigh, 90)
                DogServo(KSR030_Dog.DogServoNum.L_Lower_Thigh, 90)
                DogServo(KSR030_Dog.DogServoNum.R_Upper_Thigh, 90)
                DogServo(KSR030_Dog.DogServoNum.R_Lower_Thigh, 90)
                basic.pause(100)
                DogServo(KSR030_Dog.DogServoNum.L_Upper_Arm, 90)
                DogServo(KSR030_Dog.DogServoNum.L_Forearm, 90)
                DogServo(KSR030_Dog.DogServoNum.R_Upper_Arm, 90)
                DogServo(KSR030_Dog.DogServoNum.R_Forearm, 90)
                basic.pause(100)
                break;
            case DogState.stand_up:
                DogServo(KSR030_Dog.DogServoNum.Head, 90)
                DogServo(KSR030_Dog.DogServoNum.Tail, 90)
                basic.pause(100)
                DogServo(KSR030_Dog.DogServoNum.L_Upper_Thigh, 70)
                DogServo(KSR030_Dog.DogServoNum.L_Lower_Thigh, 60)
                DogServo(KSR030_Dog.DogServoNum.R_Upper_Thigh, 110)
                DogServo(KSR030_Dog.DogServoNum.R_Lower_Thigh, 120)
                basic.pause(100)
                DogServo(KSR030_Dog.DogServoNum.L_Upper_Arm, 110)
                DogServo(KSR030_Dog.DogServoNum.L_Forearm, 135)
                DogServo(KSR030_Dog.DogServoNum.R_Upper_Arm, 70)
                DogServo(KSR030_Dog.DogServoNum.R_Forearm, 45)
                basic.pause(100)
                break;
            case DogState.nodding:
                DogServo(KSR030_Dog.DogServoNum.Head, 90)
                basic.pause(500)
                DogServo(KSR030_Dog.DogServoNum.Head, 30)
                basic.pause(500)
                DogServo(KSR030_Dog.DogServoNum.Head, 90)
                break;
            case DogState.Wagging_tail:
                DogServo(KSR030_Dog.DogServoNum.Tail, 120)
                basic.pause(300)
                DogServo(KSR030_Dog.DogServoNum.Tail, 60)
                basic.pause(300)
                break;
            case DogState.get_down:
                DogServo(KSR030_Dog.DogServoNum.Head, 90)
                DogServo(KSR030_Dog.DogServoNum.Tail, 90)
                basic.pause(100)
                DogServo(KSR030_Dog.DogServoNum.L_Upper_Arm, 10)
                DogServo(KSR030_Dog.DogServoNum.R_Upper_Arm, 170)
                DogServo(KSR030_Dog.DogServoNum.L_Upper_Thigh, 170)
                DogServo(KSR030_Dog.DogServoNum.R_Upper_Thigh, 10)
                basic.pause(100)
                DogServo(KSR030_Dog.DogServoNum.L_Forearm, 90)
                DogServo(KSR030_Dog.DogServoNum.R_Forearm, 90)
                DogServo(KSR030_Dog.DogServoNum.L_Lower_Thigh, 90)
                DogServo(KSR030_Dog.DogServoNum.R_Lower_Thigh, 90)
                basic.pause(100)
                break;
            case DogState.sit_down:
                DogServo(KSR030_Dog.DogServoNum.Head, 90)
                DogServo(KSR030_Dog.DogServoNum.Tail, 90)
                basic.pause(100)
                DogServo(KSR030_Dog.DogServoNum.L_Upper_Arm, 70)
                DogServo(KSR030_Dog.DogServoNum.L_Forearm, 150)
                DogServo(KSR030_Dog.DogServoNum.R_Upper_Arm, 110)
                DogServo(KSR030_Dog.DogServoNum.R_Forearm, 30)
                basic.pause(100)
                DogServo(KSR030_Dog.DogServoNum.L_Upper_Thigh, 45)
                DogServo(KSR030_Dog.DogServoNum.R_Upper_Thigh, 135)
                basic.pause(100)
                DogServo(KSR030_Dog.DogServoNum.L_Lower_Thigh, 90)
                DogServo(KSR030_Dog.DogServoNum.R_Lower_Thigh, 90)
                basic.pause(100)
                break;
            case DogState.shake_hands:
                DogServo(KSR030_Dog.DogServoNum.L_Forearm, 135)
                basic.pause(300)
                DogServo(KSR030_Dog.DogServoNum.L_Upper_Arm, 20)
                basic.pause(500)
                DogServo(KSR030_Dog.DogServoNum.L_Upper_Arm, 60)
                basic.pause(500)
                DogServo(KSR030_Dog.DogServoNum.L_Upper_Arm, 20)
                basic.pause(500)
                DogServo(KSR030_Dog.DogServoNum.L_Upper_Arm, 60)
                break;
            case DogState.friendly:
                DogServo(KSR030_Dog.DogServoNum.Head, 60)
                DogServo(KSR030_Dog.DogServoNum.Tail, 90)
                basic.pause(100)
                DogServo(KSR030_Dog.DogServoNum.L_Forearm, 120)
                DogServo(KSR030_Dog.DogServoNum.R_Forearm, 60)
                DogServo(KSR030_Dog.DogServoNum.L_Lower_Thigh, 150)
                DogServo(KSR030_Dog.DogServoNum.R_Lower_Thigh, 30)
                basic.pause(100)
                DogServo(KSR030_Dog.DogServoNum.L_Upper_Arm, 30)
                DogServo(KSR030_Dog.DogServoNum.R_Upper_Arm, 150)
                DogServo(KSR030_Dog.DogServoNum.L_Upper_Thigh, 60)
                DogServo(KSR030_Dog.DogServoNum.R_Upper_Thigh, 120)
                basic.pause(100)
                DogServo(KSR030_Dog.DogServoNum.Head, 30)
                DogServo(KSR030_Dog.DogServoNum.Tail, 120)
                basic.pause(700)
                DogServo(KSR030_Dog.DogServoNum.Head, 60)
                DogServo(KSR030_Dog.DogServoNum.Tail, 60)
                basic.pause(700)
                DogServo(KSR030_Dog.DogServoNum.Head, 30)
                DogServo(KSR030_Dog.DogServoNum.Tail, 120)
                basic.pause(700)
                DogServo(KSR030_Dog.DogServoNum.Head, 60)
                DogServo(KSR030_Dog.DogServoNum.Tail, 60)
                basic.pause(700)
                break;


        }
    }



}
