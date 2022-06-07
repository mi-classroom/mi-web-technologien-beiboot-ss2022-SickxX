<template>
<div class="gallery">
    <renderer ref="renderer" resize="window" orbit-ctrl>
      <Camera :position="{ x:15, y: 15, z: 1590 }" />

        <Scene ref="scene" background="#ff1970">

          <Box ref="box" v-for="image in isBestOfImageFilter"
              :key="image.sortingNumber"
              :position="{x:10, y:10, z:image.sortingNumber.slice(0,4)}"  
              :size="2"
              >
            <BasicMaterial>
              <Texture :src="getSourcePath(image)" /> 
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

      let filteredImgData = {"items": [], "posis": []};

      
      //If Image is in BestOf, add to items
      for (let i = 0; i < this.imgData.items.length; i++) {
        if(this.imgData.items[i].isBestOf) {
          let itemPosition = { "ItemName"  :  "", "x" :  15, "y" :  15, "z" :  15 }
          filteredImgData.items.push(this.imgData.items[i]);
          itemPosition.ItemName = this.imgData.items[i].metadata.title;
          filteredImgData.posis.push(itemPosition);
        }
      }
      //korospondierendes array "posis" muss auch sortet sein? bzw. mit was wird verbindung hergestellt?
      // posi array erst nach dem sort über schleife füllen? dann ist der Index gleich?
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
                    //check auf die erste Posi-nummer. -> IF negative Value: x oder z posi des items b  = +2, else a
                    if (firstPosition1 - firstPosition2 < 0){
                      console.log("Test für Posi: Negativ - " );
                    } else {
                      console.log("Test für Posi: Positiv - " );
                    }
                    return firstPosition1 - firstPosition2;
                } 
                else if (a.sortingNumber.match(/-\w{2}$/gm) 
                        && b.sortingNumber.match(/-\w{2}$/gm && a.sortingNumber.match(/[-](\d{3})/g).toString().slice(1) === b.sortingNumber.match(/[-](\d{3})/g).toString().slice(1)) 
                        ) {
                          //Check auf zweite Posi-nummer, wenn erste Posi-nummer gleich ist ->IF negative Value: x oder z des items b = +2, else items a
                          return secondPosition1 - secondPosition2;

                      } else {
                        //Sonst check auf erste Posi-nummer, welche zweite Posi-nummer enthält -> IF negative Value: x oder z des items b = +2, else items a
                          return a.sortingNumber.match(/[-](\d{3})/g).toString().slice(1)
                            - b.sortingNumber.match(/[-](\d{3})/g).toString().slice(1);
                      }

            }
        // Sonst ist das Jahr nicht gleich und wird auf Zeitachse sortiert
        return year1 - year2;
      });
      console.log(filteredImgData);
      return filteredImgData.items;
    },
  },
  methods: {
    getSourcePath(filteredImage) {
      // console.log("Time: " + filteredImage.sortingNumber);
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