<template>

<div class="gallery">

    <Renderer ref="renderer" resize="window" >
      <Camera ref="camera" :position="{ x: 0, y:  1.8, z: 50}"/>
    
        <Scene ref="scene" background="#d3d3d3">
          
          <div id="info">
            <p id="info-p">Info</p>
            <p>press "Enter" to enter movementcontrols</p>
            <p>move with W,A,S,D and Mouse</p>
            <p>leave movementcontrols with "ESC"</p>
            <p>you can klick on the images to get more information, only outside controlmode</p>
          </div>

          <Box ref="box" v-for="image in isBestOfImageFilter.items"
              :key="image.sortingNumber"
              :scale="{x: getScale(image)[0], y: getScale(image)[1], z: getScaleZ()}"
              :position="{x:image.coords.x, y:image.coords.y + getScale(image)[1]/2 , z: image.coords.z}"
              @click="onEvent(image.sortingNumber)"
              >
            <BasicMaterial>
              <Texture :src="getSourcePath(image)"/> 
            </BasicMaterial>
          </Box>

          <Plane :height="1600" :width="1300" :rotation="{x: -Math.PI/2, y: 0, z: 0}" :position="{x:30, y: 0, z: -70}" > 
          <BasicMaterial color="#444a47" > </BasicMaterial> </Plane>
        </Scene>
    </Renderer>
    
</div>

</template>


<script>
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
      let gap = 0;

      
      for (let i = 0; i < this.imgData.items.length; i++) {
        if(this.imgData.items[i].isBestOf) {
          filteredImgData.items.push(this.imgData.items[i]);
        }
      }
      for (let i = 0; i < filteredImgData.items.length; i++) {
        let itemPosition = {"x" :  0, "y" :  0, "z" : 0 };
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
        let firstIndex = Number(filteredImgData.items[i].sortingNumber.match(/([0-9]{4})/gm));
        let secondIndex = Number(filteredImgData.items[i+1].sortingNumber.match(/([0-9]{4})/gm));

        if(firstIndex === secondIndex){
          filteredImgData.items[i+1].coords.x = filteredImgData.items[i].coords.x + 15;
          filteredImgData.items[i+1].coords.z = filteredImgData.items[i].coords.z;
        } 
        else {
          //Abstand soll größer sein, wenn die Jahre weiter als 1 außeinander sind
            if((secondIndex - firstIndex) < 2) {
              gap += 10;
            } else {gap += 20}
            filteredImgData.items[i+1].coords.z = filteredImgData.items[i+1].coords.z - gap;
        }  
      }
      console.log(filteredImgData);
      return filteredImgData;
    },
  },
  methods: {
  init(){
    const scene = this.$refs.scene.scene;
    const cam = this.$refs.camera.camera;
    this.velocity = new THREE.Vector3();
    this.direction = new THREE.Vector3();
    this.clock = new THREE.Clock();
    this.controls = new PointerLockControls (cam, document.body);

    document.body.addEventListener("keypress", (event) => {

        if(event.key === 'Enter') {
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
    let pictureScalingFactor = 20;
    const imageDim = image.dimensions;
    
    if (imageDim.includes("Rahmen:")) {
        return returnInfo(imageDim.match(/Rahmen:.*/gi)[0]);
    } else {
        return returnInfo(imageDim);
    }
      function returnInfo(infoClean) {
        // console.log("Image: "+ image.metadata.title + " ImageDimText: " + infoClean);
        let cmSize = String(infoClean).match(/[+-]?\d+(,\d+)?/g).map(function(v) { return Math.abs(parseFloat(v.replace(',', '.'))); }).slice(0, 2);
        if(imageDim.includes("Durchmesser")){
          return [cmSize[0]/Math.sqrt(2)/pictureScalingFactor, cmSize[0]/Math.sqrt(2)/pictureScalingFactor];
        }
        return [cmSize[1]/pictureScalingFactor, cmSize[0]/pictureScalingFactor];
      }
    },
    getScaleZ(){
      let z = 0.01;
      return z;
    },
    getTimeline(scene){
    for(let i = 0; i < this.isBestOfImageFilter.items.length; i++) {
      const myText = new Text();

      myText.fontSize = 1;
      myText.color = 0xffffff;

      myText.position.x  = -10;
      myText.position.y  = 5;
      myText.position.z = this.isBestOfImageFilter.items[i].coords.z;

      myText.text ="- " + this.isBestOfImageFilter.items[i].sortingInfo.year + " -";

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
					this.direction.normalize();
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

<style lang="scss">
@import "../styles/scss/abstracts/variables.scss";

  #info {
  background-color: $medium;
	position: absolute;
	top: 10px;
  left: 30px;
	width: 40%;
	text-align: left;
  font-family: $font-sans-serif;
  font-size: 14px;
  color: $darkest;
	z-index: 100;
	display:block;
  padding: 1px 5px;
}
  #info-p {
    font-size: 18px;
  }
</style>