<template>
  <div class="lightbox" @click.self="closeLightbox">
    <img :src="imageUrl(image)" />

    <div class="lightbox-info">
      <div class="lightbox-info-inner">
        <p v-if="image.metadata.title"> Titel: {{ image.metadata.title }}</p>
        <p v-if="image.metadata.date"> Datierung: {{ image.metadata.date }}</p>
        <p v-if="image.medium"> Art des Werks: {{ removeParenthesis(image.medium) }}</p>
        <p v-if="image.repository"> Besitzer: {{ image.repository }}</p>
        <p v-if="image.involvedPersons[0].name"> Künstler: {{ image.involvedPersons[0].name }}</p>
        <p>_________ ISSUE 4 _________</p>
        <p v-if="image.inventoryNumber"> THIS Img: {{ image.inventoryNumber }} </p>
        <p v-if="image.references.length != 0">Referenz: Es gibt Referenzen!</p>
        <p v-else >Referenz: Es gibt keine Referenzwerke!</p>
      </div>
    </div>

    <div class="ref-box" v-if="image.references.length != 0">
      <div class="ref-box-inner" v-for="item in image.references" :key="item.inventoryNumber">
        <!-- <P>Beziehungstyp:  {{ item.kind }}</P> -->
        <p>Beziehungstyp: {{ item.text }} </p>
        <p>InvNumber: {{ item.inventoryNumber }} </p>

        <router-link :to="`/image/${findSortingNumber(item.inventoryNumber)}`">
        <img :src="findReferenceImages(item.inventoryNumber)" />
        </router-link>

      </div> 
    </div>
    
  </div>
</template>

<script>
// 2refs: http://localhost:8080/image/1508-008    3refs http://localhost:8080/image/1509-006
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
      return img.images.overall.images[0].sizes.small.src;
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
    findSortingNumber(refInventoryNumber){
      let sortNumb;

      data.items.forEach(item => {
        if(item.inventoryNumber.match(refInventoryNumber)){
          console.log("YES, found it!");
           console.log("Path: " + item.sortingNumber);
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
  grid-gap: 1rem;
}

.lightbox img {
  margin: auto;
  width: auto;
  height: auto;
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
  margin: auto;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  grid-column-start: 3;
  color:orange;
}
.ref-box-inner{
  width: auto;
  height: 50%;
}
.ref-box img{
  margin: auto;
  width: 50%;
  height: 50%;
}

</style>
