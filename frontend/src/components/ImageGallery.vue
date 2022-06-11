<template>
<div class="gallery">
    <Renderer ref="renderer" resize="window" orbitCtrl antialias>
      <Camera ref ="camera" :position="{ x: 15, y:  15, z: 1700 }" />
    
        <Scene ref="scene" background="#d3d3d3">

          <Box ref="box" v-for="image in isBestOfImageFilter.items"
              :key="image.sortingNumber"
              :position="{x:image.coords.x, y:image.coords.y, z: image.coords.z}"
              :scale="{x: getScaleX(image), y: getScaleY(image), z: getScaleZ(image)}"
              @click="onEvent(image.sortingNumber)"
              ><!--Dimensionen des Bildes an x und y übergeben -->
              
            <BasicMaterial>
              <Texture :src="getSourcePath(image)"/> 
            </BasicMaterial>
          </Box>
          <Plane :height="180" :width="80" :rotation="{x: -Math.PI/2, y: 0, z: 0}" :position="{x:15, y: 10, z: 1590}" > <BasicMaterial color="#444a47" ></BasicMaterial> </Plane>

        </Scene>

    </Renderer>
</div>
</template>

<script>
 import imgData from '@/data/cda-paintings-2022-04-22.de.json';
  
 let timelineStart = 1500;
 let timelineEnd = 1570;


export default {
  name: 'ImageGallery',
  data() {
    return {
      imgData,
      timelineStart,
      timelineEnd,
    };
  },
  mounted() {
    const orbitCtrl = this.$refs.renderer.three.cameraCtrl;
    orbitCtrl.enabled = true;
    orbitCtrl.panSpeed = 0.05;
    orbitCtrl.rotateSpeed = 0.05;
    orbitCtrl.zoomSpeed = 0.03;
    orbitCtrl.update();
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
        let itemPosition = {"x" :  10, "y" :  10.5, "z" :  filteredImgData.items[i].sortingInfo.year };
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
        if(Number(filteredImgData.items[i].sortingNumber.match(/([0-9]{4})/gm)) === Number(filteredImgData.items[i+1].sortingNumber.match(/([0-9]{4})/gm))){
          filteredImgData.items[i+1].coords.x = filteredImgData.items[i].coords.x + 5;
        } else {
            filteredImgData.items[i+1].coords.z = filteredImgData.items[i+1].coords.z + i;
        }

      }
      console.log(filteredImgData);
      return filteredImgData;
    },
  },
  methods: {
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
    getScale(image) {
      //Hier kommen die Dimensions-Berechnungen hin!
       console.log(image);
      return;
    },
    getScaleX(image){
      let x = 2;
      this.getScale(image);
      return x;
    },
    getScaleY(image){
      let y = 2;
      this.getScale(image);
      return y;
    },
    getScaleZ(image){
      let z = 0.01;
      this.getScale(image);
      return z;
    },
  },
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
</style>