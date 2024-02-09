
import { Scene } from '@kurtbruns/vector';
import './initialize';

// Insert your code here
class ExampleScene extends Scene {
    constructor(){
        super();

        this.frame.control(100,100);
    }
}

new ExampleScene();