let camera, scene, renderer, blocks, controls, changePersp;
changePersp = false;
const block_width = 30, block_padding = 2;
let frontSideArr, backSideArr, leftSideArr, rightSideArr, topSideArr, downSideArr, middleVerFSideArr,
    middleVerRSideArr, middleVerHorSideArr;
frontSideArr = []; backSideArr = []; leftSideArr = []; rightSideArr = []; topSideArr = []; downSideArr = [];
middleVerFSideArr = []; middleVerRSideArr = []; middleVerHorSideArr= [];
let sidesArr = [frontSideArr, backSideArr, leftSideArr, rightSideArr, topSideArr, downSideArr,
    middleVerFSideArr, middleVerRSideArr, middleVerHorSideArr];
let frontSideObj, backSideObj, leftSideObj, rightSideObj, topSideObj, downSideObj, objsArr, middleVerFSideObj,
    middleVerRSideObj, middleVerHorSideObj;
frontSideObj = new THREE.Group(); backSideObj = new THREE.Group(); leftSideObj = new THREE.Group();
rightSideObj = new THREE.Group(); topSideObj = new THREE.Group(); downSideObj = new THREE.Group();
middleVerFSideObj = new THREE.Group(); middleVerRSideObj = new THREE.Group;
middleVerHorSideObj = new THREE.Group();
objsArr = [frontSideObj, backSideObj, leftSideObj, rightSideObj, topSideObj, downSideObj];

function init() {
    renderer = new THREE.WebGLRenderer({ canvas: document.getElementById("RCcanvas") });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    scene = new THREE.Scene();
    //var camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
    camera = new THREE.PerspectiveCamera(
        75,                                   // field of view
        window.innerWidth/window.innerHeight, // aspect ration
        1,                                    // near distance
        1000                                  // far distance
    );
    scene.add(camera);
    camera.position.set(110, 110, 250);
    camera.lookAt(scene.position);

    document.getElementById("camera").onclick = function(){
        if(changePersp){
            document.getElementById("camera").innerText="Change perspective";
        }else {
            controls = new THREE.TrackballControls(camera);
            controls.addEventListener("change", render);
            render();
            document.getElementById("camera").innerText="Fix perspective";
        }

        changePersp = !changePersp;
    };

    //var cam = document.getElementById("camera");


    //cam.addEventListener("click", function() {
    //});


    let block;
    for(const x of [0,1,2]){
        for(const y of [0,1,2]){
            for(const z of [0,1,2]){
                block = new Block(x,y,z);

                block.setSide(x, y, z); // uses x, y, z to define the atributes above

                block.mesh = block.getMesh(); // uses the atributes defined by setSide to define the atributes above
                // and returns a mesh
                block.positionMesh(x, y, z);

                if (x === 0) {
                    //scene.add(block.mesh);
                    rightSideArr.push(block);
                    //rightSideObj.add(block.getMesh());
                } else if (x === 1) {
                    //scene.add(block.mesh);
                    middleVerFSideArr.push(block);
                    //middleVerFSideObj.add(block.getMesh());
                } else if (x === 2) {
                    //scene.add(block.mesh);
                    leftSideArr.push(block);
                    //leftSideObj.add(block.getMesh());
                }
                if (z === 0) {
                    //frontSideArr.push(block);
                    frontSideObj.add(block.mesh);
                } else if (z === 1) {
                    //scene.add(block.mesh);
                    middleVerRSideArr.push(block);
                    //middleVerRSideObj.add(block.getMesh());
                } else if (z === 2){
                    //scene.add(block.mesh);
                    backSideArr.push(block);
                    //backSideObj.add(block.getMesh());
                }
                if (y === 0){
                    //scene.add(block.mesh);
                    topSideArr.push(block);
                    //topSideObj.add(block.getMesh());
                } else if (y === 1) {
                    //scene.add(block.mesh);
                    middleVerHorSideArr.push(block);
                    //middleVerHorSideObj.add(block.getMesh());
                } else if(y === 2){
                    //scene.add(block.mesh);
                    downSideArr.push(block);
                    //downSideObj.add(block.getMesh());
                }
            }
        }
    }

    sidesArr.forEach(function (side) {
        for(let block of side){
            scene.add(block.mesh);

            // block.mesh.addEventListener("mouseover", sideSelected(block));
        }
    });

    //scene.add(frontSideObj);
}

function sideSelected(block){
    if(block.isInFront){
        block.frontSideColor = 0xff00ae;
        block.mesh = block.getMesh();
    }
}

function animate() {
    requestAnimationFrame(animate);
    if(changePersp){
        controls.update();
    }
    //frontSideObj.rotation.z += 0.08;
    renderer.render(scene, camera);
}

function render(){
    renderer.render(scene, camera);
}

function runWebGL() {
    init();
    animate();
}