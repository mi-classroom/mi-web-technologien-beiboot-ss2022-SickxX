<template>
  <div class="lightbox" @click.self="closeLightbox">
    <img :src="imageUrl(image)" />

    <div class="lightbox-info">
      <div class="lightbox-info-inner">

        <p v-if="image.metadata.title"> Titel: {{ image.metadata.title }}</p>

        <p v-if="image.metadata.date">Datierung: {{ image.metadata.date }}</p>

        <p v-if="image.medium"> Art des Werks: {{ removeParenthesis(image.medium) }}</p>

        <p v-if="image.repository">Besitzer: {{ image.repository }}</p>

        <p v-if="image.involvedPersons[0].name">Künstler: {{ image.involvedPersons[0].name }}</p>
        <p>_________ ISSUE 4 _________</p>

        <!-- new stuff for issue 4 (and 5) -->
        <p v-if="image.references">THIS Img: {{ image.inventoryNumber }} </p>

        <p v-if="image.references">Art: {{ image.references[0].kind }} -> 
                  Image-ref: {{ image.references[0].inventoryNumber }} 
         </p>

      </div>
    </div>
    <div class="ref-box">
      <img  v-for="item in image.references"
              :key="item.inventoryNumber" :src="findReferenceImages(item.inventoryNumber)" />
    </div>
    
  </div>
</template>

<script>
// 0 hat keine ref, 2 hat 1 ref, 7 hat 2 ref
//                                http://localhost:8080/image/1508-008
import data from '@/data/cda-paintings-2022-04-22.de.json';

export default {
  name: "ImageComponent",
  data() {
    return {
      data,
    };
  },
  computed: {
    image() {
      return this.data.items.find((image) => {
        return image.sortingNumber === this.$route.params.id;
      });
    },
  },
  methods: {
    imageUrl(img) {
      return img.images.overall.images[0].sizes.medium.src;
    },
    findReferenceImages(imgReferenceInventoryNumber){
      let path;
      data.items.forEach(item => {
        if(item.inventoryNumber.match(imgReferenceInventoryNumber)){
          console.log("YES, found it!");
           console.log("Path: " + item.images.overall.images[0].sizes.xsmall.src);
         path = item.images.overall.images[0].sizes.xsmall.src;
        }
      });
      return path;
    },

    closeLightbox() {
      this.$router.push('/');
    },
    removeParenthesis(string){
      let result = string.replace(/(\[.*?\])/gm, ' ');
      let secresult = result.replace(/(\(.*?\))/gm, ' ');
      console.log(secresult);
      return secresult;
    },
  },
};
</script>

<style>
.lightbox {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 2rem;
}

.lightbox img {
  margin: auto;
  width: 60%;
  height: 60%;
  grid-column-start: 1;
}

.lightbox-info {
  margin: auto 1rem auto 0;
}

.lightbox-info-inner {
  background-color: #ffffff;
  display: inline-block;
  padding: 2rem;
}

.ref-box {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  display: block;
  grid-column-start: 3;
  
}

.ref-box img{
  margin: auto;
  width: 50%;
  height: 50%;
}
</style>
