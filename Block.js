class Block{
    constructor(x, y, z) {
        this.isInFront = false;
        this.isInBack = false;
        this.isInLeft = false;
        this.isInRight = false;
        this.isInTop = false;
        this.isInDown = false;
        this.isInMiddleVerF = false;
        this.isInMiddleVerR = false;
        this.isInMiddleHor = false;
        //this.setSide(x, y, z); // uses x, y, z to define the atributes above

        this.frontSideColor = 0x000000;
        this.backSideColor = 0x000000;
        this.leftSideColor = 0x000000;
        this.rightSideColor = 0x000000;
        this.upSideColor = 0x000000;
        this.downSideColor = 0x000000;
        this.mesh = this.color();
        //this.mesh = this.getMesh(); // uses the atributes defined by setSide to define the atributes above
        // and returns a mesh
        this.positionMesh(x, y, z);
    }

    setSide(x, y, z){
        //window.alert("x: "+x+", y: "+y+", z: "+z);
        if (x === 0) {
            this.isInRight = true;
        } else if (x === 1) {
            this.isInMiddleVerF = true;
        } else if (x === 2) {
            this.isInLeft = true;
        }
        if (y === 0) {
            this.isInTop = true;
        } else if (y === 1) {
            this.isInMiddleHor = true;
        } else if (y === 2) {
            this.isInDown = true;
        }
        if (z === 0) {
            this.isInFront = true;
        } else if (z === 1) {
            this.isInMiddleVerR = true;
        } else if (z === 2) {
            this.isInBack = true;
        }
    }

    color() {
        let colors = [this.rightSideColor, this.leftSideColor, this.upSideColor, this.downSideColor,
            this.frontSideColor, this.backSideColor];
        let materials = [];
        for (const c of colors) {
            materials.push(new THREE.MeshBasicMaterial({color: c}));
        }

        return new THREE.Mesh(new THREE.CubeGeometry(block_width, block_width, block_width, 1, 1, 1), materials);
    }

    getMesh(){
        if (this.isInRight) {
            //window.alert("is in right");
            this.rightSideColor = 0x0000ff; // azul
            this.leftSideColor = 0x000000; // preto
        } else if (this.isInMiddleVerF) {
            //window.alert("is in middle ver f");
            this.rightSideColor = 0x000000; // preto
            this.backSideColor = 0x000000; //preto
        } else if (this.isInLeft) {
            //window.alert("is in left");
            this.rightSideColor = 0x000000; // preto
            this.leftSideColor = 0x5fe36c; // verde
        }

        if (this.isInTop) {
            //window.alert("is in top");
            this.upSideColor = 0xff0000; // vermelho
            this.downSideColor = 0x000000; // preto
        } else if (this.isInMiddleHor) {
            //window.alert("is in middle hor");
            this.upSideColor = 0x000000; //preto
            this.downSideColor = 0x000000; //preto
        } else if (this.isInDown) {
            //window.alert("is in down");
            this.upSideColor = 0x000000; // preto
            this.downSideColor = 0xffaa00; //laranja
        }

        if (this.isInFront) {
            //window.alert("is in front");
            this.frontSideColor = 0xffff00; // amarelo
            this.backSideColor = 0x000000; // preto
        } else if (this.isInMiddleVerR) {
            //window.alert("is in ver r");
            this.frontSideColor = 0x000000; // preto
            this.backSideColor = 0x000000; // preto
        } else if (this.isInBack) {
            //window.alert("is in back");
            this.frontSideColor = 0x000000; // preto
            this.backSideColor = 0xffffff; // branco
        }

        return this.color();
    }

    positionMesh(x, y, z){
        this.mesh.position.x = (1 - x)*block_width + (1 - x)*block_padding;
        this.mesh.position.z = (1 - z)*block_width + (1 - z)*block_padding;
        this.mesh.position.y = (1 - y)*block_width + (1 - y)*block_padding;
        //window.alert("x: "+this.mesh.position.x+", y: "+this.mesh.position.y+", z: "+this.mesh.position.z);
    }

}