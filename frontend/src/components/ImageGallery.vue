<template>

<div class="gallery">

  
   
    <Renderer ref="renderer" resize="window" orbitCtrl antialias>
      <Camera ref ="camera" :position="{ x: 15, y:  15, z: 1700 }" />
    
        <Scene ref="scene" background="#d3d3d3">

          <Box ref="box" v-for="image in isBestOfImageFilter.items"
              :key="image.sortingNumber"
              :scale="{x: getScaleX(image), y: getScaleY(image), z: getScaleZ(image)}"
              :position="{x:image.coords.x, y:image.coords.y + getScaleY(image)/2 , z: image.coords.z}"
              @click="onEvent(image.sortingNumber)"
              >
              <div id="info">Description</div>
            <BasicMaterial>
              <Texture :src="getSourcePath(image)"/> 
            </BasicMaterial>
          </Box>


          <Box 
          :position="{x:2, y:12, z: timelineEnd+100}"
          :size="2"
          >
          <BasicMaterial color="#ffffff" >
            <Texture  /> 
          </BasicMaterial>
          </Box>

          <Plane :height="180" :width="120" :rotation="{x: -Math.PI/2, y: 0, z: 0}" :position="{x:50, y: 10.5, z: 1590}" > 
          <BasicMaterial color="#444a47" > </BasicMaterial> </Plane>

          <Plane ref="timePlane"
           v-for="image in isBestOfImageFilter.items"
           :key="image.sortingNumber"
           :height="1" 
           :width="120" 
           :rotation="{x: -Math.PI/2, y: 0, z: 0}" 
           :position="{x:50, y: 11, z: image.coords.z}" > 
           <BasicMaterial color="#ffffff">   <Texture />  </BasicMaterial> </Plane>
           <!-- Theoretisch könnte in diese Plane der text reinkommen zu den Jahren, mit ref und dann
           plane.add(texture`?) -->
            
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
    const plane = this.$refs.timePlane;


    orbitCtrl.enabled = true;
    orbitCtrl.panSpeed = 0.05;
    orbitCtrl.rotateSpeed = 0.05;
    orbitCtrl.zoomSpeed = 0.03;
    orbitCtrl.update();

    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");
    ctx.font = "30px Arial";
    ctx.fillText("Hello World", 10, 50);
    plane(ctx);
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
          filteredImgData.items[i+1].coords.x = filteredImgData.items[i].coords.x + 10;
        } 
        
      // filteredImgData.items[i].coords.z = filteredImgData.items[i].coords.z;
        
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

  #info {
	position: absolute;
	top: 100px;
	width: 100%;
	text-align: center;
	z-index: 100;
	display:block;
}
</style>