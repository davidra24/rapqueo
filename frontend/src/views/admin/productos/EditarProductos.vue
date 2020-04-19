<template>
  <div class="container">
    <div class="row">
      <div class="col-12" v-if="loadingProduct">
        <Loading />
      </div>
      <div class="col-12" v-else>
        <div class="container">
          <div class="row">
            <div class="col-12 col-md-6">
              <div class="d-flex justify-content-center">
                <div style="width: 100%;">
                  <img v-if="form.foto" :src="form.foto" alt="Skyscraper" />
                  <div v-else>
                    <Loading />
                  </div>
                  <div v-if="!showCamera">
                    <md-button class="md-primary" @click="changeCamera()"
                      >Tomar foto</md-button
                    >
                    <md-button
                      class="md-primary"
                      @click="console.log('examinar')"
                      >Examinar</md-button
                    >
                  </div>
                  <md-dialog
                    md-fullscreen
                    :md-active.sync="showCamera"
                    class="d-flex justify-content-center"
                  >
                    <div class="wrapper">
                      <video
                        class="video"
                        :class="activeDevice === 0 ? 'front' : ''"
                        ref="video"
                      />
                      <canvas style="display:none" ref="canva" />
                      <button
                        v-if="videoDevices.length > 1"
                        class="button is-rounded is-outlined switch-button"
                        @click="switchCamera"
                      >
                        <font-awesome-icon icon="sync-alt"></font-awesome-icon>
                      </button>
                      <div class="photo-button-container">
                        <button class="button photo-button" @click="TakePhoto">
                          <font-awesome-icon icon="camera"></font-awesome-icon>
                        </button>
                      </div>
                    </div>
                  </md-dialog>
                </div>
              </div>
            </div>
            <div class="col-12 col-md-6">
              <div class="d-flex justify-content-start">
                <div v-if="photo">
                  <img :src="photo" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { getOneOrManyApi } from '../../../util/api';
import { products } from '../../../util/constants';
import Loading from '../../../components/loading';
export default {
  name: 'EditarProductos',
  components: { Loading },
  data() {
    return {
      showCamera: false,
      loadingProduct: false,
      form: {
        nombre: '',
        foto: '',
        caracteristicas: {
          peso: '',
          unidad: '',
          cantidad: '',
          sabor: '',
          precio: '',
          marca: '',
        },
        idCategoria: '',
      },
      photo: '',
      mediaStream: null,
      videoDevices: [],
      activeDevice: 0,
    };
  },
  computed: {
    ...mapState(['product', 'categories']),
  },
  methods: {
    ...mapActions(['setProduct', 'setCategories']),
    async changeCamera() {
      this.showCamera = true;
      const devices = await navigator.mediaDevices.enumerateDevices();
      this.videoDevices = devices.filter((d) => d.kind === 'videoinput');
      this.StartRecording(0);
    },
    fetchProduct(id) {
      this.loadingProduct = true;
      getOneOrManyApi(products, id)
        .then((res) => {
          this.setProduct(res.data);
          this.form = Object.assign({}, this.product);
          this.loadingProduct = false;
        })
        .catch((err) => {
          this.setError(err);
          this.loadingProduct = false;
        });
    },
    fetchCategories() {},
    searchCategorie(id) {
      this.categories.find((value) => {
        return value._id === id;
      });
    },

    async StartRecording(deviceIdx) {
      let video = this.$refs.video;
      this.mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { deviceId: { exact: this.videoDevices[deviceIdx].deviceId } },
      });
      video.srcObject = await this.mediaStream;
      video.play();
    },
    async TakePhoto() {
      let video = this.$refs.video;
      let canva = this.$refs.canva;
      let width = video.videoWidth;
      let height = video.videoHeight;
      canva.width = width;
      canva.height = height;
      let ctx = canva.getContext('2d');
      ctx.save();
      if (this.activeDevice === 0) {
        ctx.scale(-1, 1);
        ctx.drawImage(video, width * -1, 0, width, height);
      } else {
        ctx.drawImage(video, 0, 0);
      }
      ctx.restore();
      this.photo = canva.toDataURL('image/png');
      this.showCamera = false;
    },
    switchCamera() {
      const tracks = this.mediaStream.getVideoTracks();
      tracks.forEach((track) => {
        track.stop();
      });
      this.StartRecording((this.activeDevice + 1) % 2);
      this.activeDevice = (this.activeDevice + 1) % 2;
    },
  },
  async mounted() {
    const id = this.$route.params.id;
    if (!this.product || this.product._id !== id) {
      // this.fetchProduct(id);
    } else {
      this.form = await Object.assign({}, this.categorie);
    }
  },
};
</script>

<style scoped>
.video.front {
  -webkit-transform: scaleX(-1);
  transform: scaleX(-1);
}
.wrapper {
  background-color: black;
  display: grid;
  width: 100vw;
  height: 100vh;
  grid-template-columns: [left] 90vw [bs] 5vw [es] 5vw [right];
  grid-template-rows: [top] 5vh [bs] 5vh [es] 60vh [middle] 10vh [bottom] 20vh [end];
  justify-items: center;
  overflow: hidden;
  margin-right: auto;
  margin-left: auto;
}
.video {
  height: 100%;
  grid-column: left/right;
  grid-row: top / bottom;
  user-select: none;
  max-width: unset;
}
.switch-button {
  grid-column: bs / es;
  grid-row: bs / es;
  z-index: 5;
  border-radius: 100%;
  width: 6vh;
  height: 6vh;
  font-size: 2vh;
}
.photo-button-container {
  grid-column: left / right;
  grid-row: middle / bottom;
  z-index: 5;
  width: 100vw;
  height: 20vh;
  display: flex;
  justify-content: center;
}
.photo-button {
  width: 10vh;
  height: 10vh;
  border-radius: 100%;
}
.photo-button {
  font-size: 4vh;
  color: black;
}
.gallery {
  grid-column: left / right;
  grid-row: bottom / end;
}
</style>
