<template>
<div class="gallery">
    <renderer ref="renderer" resize="window" orbit-ctrl>
      <Camera :position="{ x:15, y: 15, z: 1590 }" :zoom="0.5" />

        <Scene ref="scene" background="#d3d3d3">

          
          <Box ref="box" v-for="image in isBestOfImageFilter.items"
              :key="image.sortingNumber"
              :position="{x:image.coords.x, y:image.coords.y, z:image.coords.z}"
              :size="2"
              >
            <BasicMaterial :props="{ transparent: true, opacity: 0.5 }">
              <Texture :src="getSourcePath(image)"/> 
            </BasicMaterial>

          <!-- <router-link :to="`/image/${image.sortingNumber}`"> <img :src="getSourcePath(image)"></router-link> -->
          </Box>

        </Scene>

    </renderer>
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
  // mounted() {

  // },
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
        let itemPosition = {"x" :  10, "y" :  10, "z" :  filteredImgData.items[i].sortingInfo.year };
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
          console.log("TEST in IF: " + filteredImgData.items[i].coords.x);
        } else {
         // filteredImgData.items[i].coords.z = filteredImgData.items[i].coords.z + 5;
        }

      }
      console.log(filteredImgData);
      


      return filteredImgData;
    },
  },
  methods: {
    getSourcePath(filteredImage) {
      let proxyServerSubString = "https://lucascranach.org/data-proxy/image.php?subpath=/";
      let imageServer = filteredImage.images.overall.images[0].sizes.xsmall.src;
      let imgPathString = imageServer.slice(42,200);
      let proxyServerFullString = proxyServerSubString + imgPathString;
      return proxyServerFullString;
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
<!-- 
<template>
  <Renderer ref="renderer">
    <Camera :position="{ x:0, y: 0, z: 5 }" />
    <Scene>
      <SpotLight :position="{ y: 50, z: 50 }" />
      <Box ref="box">
        <BasicMaterial />
      </Box>
    </Scene>
  </Renderer>
</template>

<script>
export default {
  mounted() {
    const renderer = this.$refs.renderer;
    const box = this.$refs.box.mesh;
    renderer.onBeforeRender(() => {
      box.rotation.x += 0.01;
    });
  },
};
</script> -->