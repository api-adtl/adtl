import path from 'path';
import files from "../libs/files";

// Math.round(new Date().getTime()/1000)
class Autoupdate {
    constructor() {
        this.path = path.join(__dirname, 'autoupdate.json');
        this.data = {
            'time': '1598443957'
        };
        files.read(this.path, this.data, (data) => {
            this.data = data;
        })
    }

    getinfo(){
        console.log('Autoupdate',this.data);
    }
}

export default Autoupdate;