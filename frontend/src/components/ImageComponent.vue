<template>
  <div class="lightbox">
    
    <div >
      <button class="backToGallery" @click="closeLightbox">Back to Gallery</button>
    </div>

    <div class="imageGrid">
      <h1>Werk</h1>
      <img  :src="imageUrl(image)" />
    </div>
    
    <div class="lightbox-info">
      <h2>Info-Box</h2>
      <div class="lightbox-info-inner">
        <p v-if="image.metadata.title"> Titel: <br> {{ image.metadata.title }}</p>
        <p v-if="image.metadata.date"> Datierung:    {{ image.metadata.date }}</p>
        <p v-if="image.medium"> Art des Werks: {{ removeParenthesis(image.medium) }}</p>
        <p v-if="image.repository"> Besitzer: <br>{{ image.repository }}</p>
        <p v-if="image.involvedPersons[0].name"> Künstler: {{ image.involvedPersons[0].name }}</p>
        <a class="href" :href="'https://lucascranach.org/' + 'de'+'/'+ image.inventoryNumber" target="_blank" >
        lucascranach.org/de/{{ image.inventoryNumber }}</a>
        <p v-if="image.references.length != 0">Referenzen zum Bild siehe rechte Seite</p>
        <p v-else >Es gibt keine Referenzwerke zu diesem Bild</p>
      </div>
    </div>

    <div class="ref-box-wrapper" v-if="image.references.length != 0">
      <h3>Referenzen</h3>
      <div class="ref-box" >
    
        <div class="ref-box-inner" v-for="item in image.references" :key="item.inventoryNumber">
          <!-- <P>Beziehungstyp:  {{ item.kind }}</P> -->
          <div class="ref-box-text">
          <p class="box-p">Beziehung zum Bild: {{ item.text }} </p>
          <a class="box-href" :href="'https://lucascranach.org/' + 'de'+'/'+ item.inventoryNumber" target="_blank" >
          Link zur Detailseite</a>
          </div>
          <router-link :to="`/image/${findSortingNumber(item.inventoryNumber)}`">
          <img :src="findReferenceImages(item.inventoryNumber)" />
          </router-link>
        </div>
      </div>
    </div>
    <div class="ref-box2" v-else>
      <h3>Referenzen</h3>
        <div class="ref-box-error">
            <p class="ref-box-error-p">Es gibt keine Referenzwerke!</p>
        </div>
    </div>
      
  </div>
</template>

<script>
import data from '@/data/cda-paintings-2022-04-22.de.json';
 import { camPosi } from './store';

export default {
  name: "ImageComponent",
  data() {
    return {
      data,
      camPosi,
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
      return img.images.overall.images[0].sizes.small.src;
    },
    findReferenceImages(imgReferenceInventoryNumber){
      let path;
      data.items.forEach(item => {
        if(item.inventoryNumber.match(imgReferenceInventoryNumber)){
         path = item.images.overall.images[0].sizes.xsmall.src;
        }
      });
      return path;
    },
    findSortingNumber(refInventoryNumber){
      let sortNumb;

      data.items.forEach(item => {
        if(item.inventoryNumber.match(refInventoryNumber)){
         sortNumb = item.sortingNumber;
        }
      });
      return sortNumb;
    },
    closeLightbox() {
      this.$router.push('/');
    },
    removeParenthesis(string){
      let result = string.replace(/(\[.*?\])/gm, ' ');
      let secresult = result.replace(/(\(.*?\))/gm, ' ');
      return secresult;
    },
    findURL(invNumb){
      const langkey = "de";
      return `https://lucascranach.org/${langkey}/${invNumb}/`;

    },
  },
};
</script>

<style lang="scss">
// 2refs: /image/1508-008    3refs /image/1509-006   viele /image/1539-012
@import "../styles/scss/abstracts/variables.scss";

.backToGallery {
  background-color: $medium;
  font-family: $font-sans-serif;
  color: $accent-dark;
  width: 100px;
  height: 50px;
}
.lightbox {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: $light;
  display: grid;
  grid-template-columns: auto auto auto;
  gap: 10px 10px;
  font-family: $font-sans-serif;
  color: $darkest;
}
.lightbox-info {
  margin: auto;
  width: 500px;
}
.lightbox-info-inner {
  background-color: $medium;
  width: auto;
  display: inline-block;
  padding: 50px 50px;
}
.lightbox img{
width: 270px;
}
.imageGrid{
  margin: auto;
  grid-column-start: 1;
}
.ref-box {
  background-color: $lighten-strong;
  display: grid;
  grid-template-columns:300px 300px;
  grid-template-rows: 280px 280px 280px;
  gap: 5px 5px;
  font-size: 10px;
}
.ref-box-inner{
  border: 1px solid $darkest;
}
.ref-box-text{
margin: auto;
font-size: 12px;
text-align: center;
}
.ref-box img{
  margin: auto;
  padding: 10px 115px;
  width: 22%;
}

.ref-box2{
  margin: auto;
  width: 500px;
}

.ref-box-error{
  width: auto;
  height: 30%;
  padding: 50px 50px;
  background-color: $dark;
  color: $error;
  text-align: center;
}
.ref-box-error-p{
  margin-top: 10px;
}
</style>
