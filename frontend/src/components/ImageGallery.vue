<template>

<div class="gallery">

    <Renderer ref="renderer" resize="window" >
      <Camera ref="camera" :position="{ x: 0, y:  1, z: 100}"/>
    
        <Scene ref="scene" background="#d3d3d3">
          <Box ref="box" v-for="image in isBestOfImageFilter.items"
              :key="image.sortingNumber"
              :scale="{x: getScaleX(image), y: getScaleY(image), z: getScaleZ(image)}"
              :position="{x:image.coords.x, y:image.coords.y + getScaleY(image)/2 , z: image.coords.z}"
              @click="onEvent(image.sortingNumber)"
              >
            <BasicMaterial>
              <Texture :src="getSourcePath(image)"/> 
            </BasicMaterial>
          </Box>

          <!-- HelperBox -->
          <Box ref="boxHelper" :position="{x: 0, y: 0 , z: -130}"> <BasicMaterial color="#000000" > </BasicMaterial></Box>

          <Plane :height="1600" :width="1300" :rotation="{x: -Math.PI/2, y: 0, z: 0}" :position="{x:30, y: 0, z: -70}" > 
          <BasicMaterial color="#444a47" > </BasicMaterial> </Plane>
        </Scene>
    </Renderer>
</div>

</template>


<script>
//TODO issue4 -> feld im json: references...zugehörige werke, gibt aber noch mehr beziehungstypen
// Man muss nicht alle 4 typen unbedingt machen, hauptsächlich mal gucken wie das so klappt
// vllt als caroussel oder so darstellen...mhhhh da hab ich bock meine clickinteraction geht aber auch :> nice
 import imgData from '@/data/cda-paintings-2022-04-22.de.json';
 import * as THREE from 'three';
 import {Text} from 'troika-three-text';
 import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls";

export default {
  name: 'ImageGallery',
  data() {
    return {
      imgData,
      controls: null,
      clock: null,
      velocity: null,
      direction: null,
      moveForward: false,
      moveBackward: false,
      moveLeft: false,
      moveRight: false,
    };
  },
  mounted() {
    this.init();
    this.animate();

   },

  computed: {
    isBestOfImageFilter() {

      let filteredImgData = {"items": []};
      filteredImgData = JSON.parse(JSON.stringify(filteredImgData));

      
      for (let i = 0; i < this.imgData.items.length; i++) {
        if(this.imgData.items[i].isBestOf) {
          filteredImgData.items.push(this.imgData.items[i]);
        }
      }
      for (let i = 0; i < filteredImgData.items.length; i++) {
        let zCoord = (-filteredImgData.items[i].sortingInfo.year/1000);
        let itemPosition = {"x" :  0, "y" :  0, "z" : zCoord };
          filteredImgData.items[i].coords = itemPosition;
      }

      filteredImgData.items.sort(function(a, b){
      
       let year1 = a.sortingNumber.match(/([0-9]{4})/gm);
       let year2 = b.sortingNumber.match(/([0-9]{4})/gm);
       let firstPosition1 = a.sortingNumber.match(/\w{3}$/gm);
       let firstPosition2 = b.sortingNumber.match(/\w{3}$/gm);
       let secondPosition1 = a.sortingNumber.match(/\w{2}$/gm);
       let secondPosition2 = b.sortingNumber.match(/\w{2}$/gm);

        if (Number(year1) === Number(year2)) {
              //Jahr ist bei beiden Items gleich
                if (a.sortingNumber.match(/-\w{3}$/gm) 
                    && b.sortingNumber.match(/-\w{3}$/gm)) {
                    //check auf die erste Posi-nummer
                    return firstPosition1 - firstPosition2;
                } 
                else if (a.sortingNumber.match(/-\w{2}$/gm) 
                        && b.sortingNumber.match(/-\w{2}$/gm) && a.sortingNumber.match(/[-](\d{3})/g).toString().slice(1) === b.sortingNumber.match(/[-](\d{3})/g).toString().slice(1)) 
                         {
                          //Check auf zweite Posi-nummer, wenn erste Posi-nummer gleich ist
                          return secondPosition1 - secondPosition2;
                      } else {
                        //Sonst check auf erste Posi-nummer, welche zweite Posi-nummer enthält
                        return a.sortingNumber.match(/[-](\d{3})/g).toString().slice(1) - b.sortingNumber.match(/[-](\d{3})/g).toString().slice(1);
                      }

            }
        return year1 - year2;
      });
      
      for (let i = 0; i < filteredImgData.items.length -1; i++) {
        let gap = filteredImgData.items[i].sortingNumber.match(/([0-9]{4})/gm).toString().slice(2);
        // console.log(" GAP: " + gap);
        if(Number(filteredImgData.items[i].sortingNumber.match(/([0-9]{4})/gm)) === Number(filteredImgData.items[i+1].sortingNumber.match(/([0-9]{4})/gm))){
        
          filteredImgData.items[i+1].coords.x = filteredImgData.items[i].coords.x + 10;
          filteredImgData.items[i+1].coords.z = filteredImgData.items[i].coords.z;
        } 
        else {
          filteredImgData.items[i+1].coords.z = filteredImgData.items[i+1].coords.z - gap*5;
        }  
        // console.log("in isBestOf - X: " + filteredImgData.items[i].coords.x+ " Y: " + filteredImgData.items[i].coords.y + 
        // " Z: " + filteredImgData.items[i].coords.z + " Img: " + filteredImgData.items[i].sortingInfo.year);
      }
      console.log(filteredImgData);
      return filteredImgData;
    },
  },
  methods: {
  init(){

    // const orbitCtrl = this.$refs.renderer.three.cameraCtrl;
    const scene = this.$refs.scene.scene;
    // cam.fov = 45;
    // cam.near = 1;
    // cam.far = 1000;
    // cam.updateProjectionMatrix();

    // orbitCtrl.enabled = true;
    // orbitCtrl.panSpeed = 0.5;
    // orbitCtrl.rotateSpeed = 0.5;
    // orbitCtrl.zoomSpeed = 1; //0.03
    // orbitCtrl.minZoom = 5000;

    // orbitCtrl.update();

    this.velocity = new THREE.Vector3();
    this.direction = new THREE.Vector3();
    this.clock = new THREE.Clock();
    const cam = this.$refs.camera.camera;

    this.controls = new PointerLockControls (cam, document.body);
    // console.log(controls);

    document.body.addEventListener("click", (event) => {
            // Left click 
            if(event.button === 0) {
                if(!this.controls.isLocked) {
                    this.controls.lock();
                }
            }
        }, false);
      
      scene.add(this.controls.getObject() );

      const onKeyDown = ( event ) => {
					switch ( event.code ) {
						case 'ArrowUp':
						case 'KeyW':
							this.moveForward = true;
							break;
						case 'ArrowLeft':
						case 'KeyA':
							this.moveLeft = true;
							break;
						case 'ArrowDown':
						case 'KeyS':
							this.moveBackward = true;
							break;
						case 'ArrowRight':
						case 'KeyD':
							this.moveRight = true;
							break;
					}
				};
				const onKeyUp = ( event ) => {
					switch ( event.code ) {
						case 'ArrowUp':
						case 'KeyW':
							this.moveForward = false;
							break;
						case 'ArrowLeft':
						case 'KeyA':
							this.moveLeft = false;
							break;
						case 'ArrowDown':
						case 'KeyS':
							this.moveBackward = false;
							break;
						case 'ArrowRight':
						case 'KeyD':
							this.moveRight = false;
							break;
					}
				};
        document.addEventListener( 'keydown', onKeyDown );
				document.addEventListener( 'keyup', onKeyUp );
    
    this.getTimeline(scene);

  },
    getSourcePath(filteredImage) {
      let proxyServerSubString = "https://lucascranach.org/data-proxy/image.php?subpath=/";
      let imageServer = filteredImage.images.overall.images[0].sizes.medium.src;
      let imgPathString = imageServer.slice(42,200);
      let proxyServerFullString = proxyServerSubString + imgPathString;
      return proxyServerFullString;
    },
    onEvent(imgSortNumb) {
      this.$router.push('/image/' + imgSortNumb);
    },
    gcd (a, b) {
      return (b == 0) ? a : this.gcd (b, a%b);
    },
    getScale(image) {
      //Hier kommen die Dimensions-Berechnungen hin!
      //CM into pixel
      let imgMaxDimWidth = image.images.overall.infos.maxDimensions.width;
      let imgMaxDimHeight = image.images.overall.infos.maxDimensions.height;
      // let divisor = this.gcd(imgMaxDimWidth, imgMaxDimHeight);
      // let aspectRatio = imgMaxDimWidth/imgMaxDimHeight;

      //let stringSplit = image.dimensions.replace(/[\])}[{(]/g, ' ').split(' ');
      // let StringCut = stringSplit.slice();
      //let stringDigits = image.dimensions.match(/\d/g);

      // console.log("NEW IMAGE: ");
      // console.log("getScaleFunc: Width: " + imgMaxDimWidth + " Height: " + imgMaxDimHeight );
      // console.log("getScaleFunc: Divisor: " + divisor + " AspectRatio: " + aspectRatio );
      // console.log(image.dimensions); 


      return [imgMaxDimWidth/1000, imgMaxDimHeight/1000];
    },
    getScaleX(image){
      // let x = 2;
      this.getScale(image);
      return this.getScale(image)[0];
    },
    getScaleY(image){
      // let y = 2;
      return  this.getScale(image)[1];
    },
    getScaleZ(image){
      let z = 0.01;
      this.getScale(image);
      return z;
    },
    getTimeline(scene){
    for(let i = 0; i < this.isBestOfImageFilter.items.length; i++) {
      const myText = new Text();

      myText.fontSize = 1;
      myText.color = 0xffffff;

      myText.position.x  = -10;
      myText.position.y  = 1;
      myText.position.z = this.isBestOfImageFilter.items[i].coords.z;

      myText.text =this.isBestOfImageFilter.items[i].sortingInfo.year + "---------";

      scene.add(myText);
    }
    },
    animate() {
      const renderer = this.$refs.renderer.renderer;
      const cam = this.$refs.camera.camera;
      const scene = this.$refs.scene.scene;

      requestAnimationFrame(this.animate);
      if ( this.controls.isLocked === true ) {
					const delta = this.clock.getDelta();
					this.velocity.x -= this.velocity.x * 10.0 * delta;
					this.velocity.z -= this.velocity.z * 10.0 * delta;
					this.direction.z = Number( this.moveForward ) - Number( this.moveBackward );
					this.direction.x = Number( this.moveRight ) - Number( this.moveLeft );
					this.direction.normalize(); // this ensures consistent movements in all directions
					if ( this.moveForward || this.moveBackward )this. velocity.z -= this.direction.z * 400.0 * delta;
					if ( this.moveLeft || this.moveRight ) this.velocity.x -= this.direction.x * 400.0 * delta;
					this.controls.moveRight( - this.velocity.x * delta );
					this.controls.moveForward( - this.velocity.z * delta );
				}
      renderer.render(scene, cam);
    },
  }, //MEthods end here
};

</script>

<style>
  /* .gallery {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
    grid-gap: 1rem;
    max-width: 50rem;
    margin: 5rem auto;
    padding: 0 3rem;
  } */

  /* .gallery-panel img {
    width: 50%;
    height: 14vw;
    object-fit: cover;
    border-radius: 0.75rem;
  } */

  /* canvas {
  display: block;
  } */

  /* #info {
	position: absolute;
	top: 100px;
	width: 100%;
	text-align: center;
	z-index: 100;
	display:block;
} */
</style>