<template>
<div class="gallery">
    <renderer ref="renderer" resize="window" orbit-ctrl>
      <Camera :position="{ x:15, y: 15, z: 15 }" />

        <Scene ref="scene" background="#ff1970">

          <Box ref="box" v-for="i in n"
              :key="i"
              :position="{x:10, y:10, z: i}"
              :size="1"
              >
            <!-- <router-link :to="`/image/${image.sortingNumber}`"> -->
            <!-- <img :src="getSourcePath(image)"> -->
            <BasicMaterial color="#ffffff"/>
            <!-- </router-link> -->
          </Box>
        </Scene>

    </renderer>
</div>
</template>

<script>
// import imgData from '@/data/cda-paintings-2022-04-22.de.json';
// let testImgData = {"items": []};
const n = 30;

export default {
  name: 'ImageGallery',
  data() {
    return {
      n,
    };
  },
  // mounted() {

  // },
  // computed: {
  //   isBestOfImageFilter() {
  //     let filteredImgData = {"items": []};
  //     for (let i = 0; i < this.imgData.items.length; i++) {
  //       if(this.imgData.items[i].isBestOf) {
  //         filteredImgData.items.push(this.imgData.items[i]);
  //       }
  //     }

  //     filteredImgData.items.sort(function(a, b){

  //      let year1 = a.sortingNumber.match(/([0-9]{4})/gm);
  //      let year2 = b.sortingNumber.match(/([0-9]{4})/gm);
  //      let firstPosition1 = a.sortingNumber.match(/\w{3}$/gm);
  //      let firstPosition2 = b.sortingNumber.match(/\w{3}$/gm);
  //      let secondPosition1 = a.sortingNumber.match(/\w{2}$/gm);
  //      let secondPosition2 = b.sortingNumber.match(/\w{2}$/gm);

  //       if (Number(year1) === Number(year2)) {
  //             //console.log("TEST in Year IF: " + a.sortingNumber.match(/([0-9]{4})/gm ).toString());
  //               if (a.sortingNumber.match(/-\w{3}$/gm) 
  //                   && b.sortingNumber.match(/-\w{3}$/gm)) {
  //                 //console.log("Test in Position IF: " + a.sortingNumber.match(/-\w{3}$/gm).toString());
  //                   return firstPosition1 - firstPosition2;
  //               } 
  //               else if (a.sortingNumber.match(/-\w{2}$/gm) 
  //                       && b.sortingNumber.match(/-\w{2}$/gm && a.sortingNumber.match(/[-](\d{3})/g).toString().slice(1) === b.sortingNumber.match(/[-](\d{3})/g).toString().slice(1)) 
  //                       ) {
  //                         return secondPosition1 - secondPosition2;

  //                     } else {
  //                       //zurück zur position1
  //                        //console.log("3er gleich, 2er nicht: a= " + a.sortingNumber.match(/[-](\d{3})/g).toString().slice(1) + " b= " + b.sortingNumber.match(/[-](\d{3})/g).toString().slice(1) );
  //                         return a.sortingNumber.match(/[-](\d{3})/g).toString().slice(1)
  //                           - b.sortingNumber.match(/[-](\d{3})/g).toString().slice(1);
  //                     }

  //           }
  //       return year1 - year2;
  //     });
  //     return filteredImgData.items;
  //   },
  //   testData () {
  //     console.log("TESTFUNC: ");
  //   for (let i = 0; i < this.imgData.items.length; i++) {
  //       if(this.imgData.items[i].isBestOf) {
  //         testImgData.items.push(this.imgData.items[i]);
  //       }
  //     }
  // return testImgData;
  //   },
  // },
  // methods: {
  //   getSourcePath(filteredImage) {
  //     let src = filteredImage.images.overall.images[0].sizes.xsmall.src;
  //     return src;
  //   },
  // },
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