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

      </div>
    </div>
  </div>
</template>

<script>
import images from '@/data/cda-paintings-2022-04-22.de.json';

export default {
  name: "ImageComponent",
  data() {
    return {
      images,
    };
  },
  computed: {
    image() {
      return this.images.items.find((image) => {
        return image.sortingNumber === this.$route.params.id;
      });
    },
  },
  methods: {
    imageUrl(img) {
      let src = img.images.overall.images[0].sizes.medium.src;
      return src;
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
  width: 100%;
  grid-column-start: 2;
}

.lightbox-info {
  margin: auto 1rem auto 0;
}

.lightbox-info-inner {
  background-color: #ffffff;
  display: inline-block;
  padding: 2rem;
}
</style>
