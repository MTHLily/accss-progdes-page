<template>
  <div class="container">
    <h1 class="display-6 text-center">Simple Dynamic Cipher</h1>
    <p class="lead text-justify">
      A cipher is a series of steps you can follow to encrypt a certain message.
      For this challenge, create a simple dynamic cipher program whose steps are
      a list of ASCII character pairs. Each pair consists of the original ASCII
      character, and the destination character. All original characters must be
      unique, but not the destination characters. During the encryption process,
      every character that matches with the list of character pairs will be
      replaced by the new character.
    </p>
    <div class="d-flex justify-content-center m-4">
      <ul class="list-group w-50">
        <li class="list-group-item bg-light">Criteria</li>
        <li class="list-group-item">
          Add a new character pair. <span class="float-right">1 pt</span>
        </li>
        <li class="list-group-item">
          Update an existing character pair.
          <span class="float-right">1 pt</span>
        </li>
        <li class="list-group-item">
          Delete an existing pair. <span class="float-right">1 pt</span>
        </li>
        <li class="list-group-item">
          Display the list of character pairs.
          <span class="float-right">1 pt</span>
        </li>
        <li class="list-group-item">
          Encrypt and display the message.
          <span class="float-right">3 pts</span>
        </li>
        <li class="list-group-item">
          Automatically update the encrypted message whenever the list of pairs
          is changed or when the original message is modified
          <span class="float-right">2 pts</span>
        </li>
        <li class="list-group-item">
          The function for the message encryption consists of only one
          statement<span class="float-right">5 pts</span>
        </li>
      </ul>
    </div>

    <div class="row">
      <div class="col">
        <textarea
          cols="30"
          rows="10"
          class="form-control"
          v-model="originalText"
        />
        <textarea
          cols="30"
          rows="10"
          class="form-control"
          :value="encodedText"
          readonly
        ></textarea>
      </div>
      <div class="col-4 bg-light overflow-auto">
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Original</th>
              <th>New</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input
                  type="text"
                  class="form-control"
                  v-model="newCode.original"
                  maxlength="1"
                />
              </td>
              <td>
                <input
                  type="text"
                  class="form-control"
                  v-model="newCode.new"
                  maxlength="1"
                />
              </td>
              <td>
                <button class="btn btn-primary" @click="addCode">
                  Add/Update
                </button>
              </td>
            </tr>
            <tr v-for="(code, index) in cipher" :key="index">
              <td>{{ index }}</td>
              <td>{{ code }}</td>
              <td>
                <button class="btn btn-danger" @click="deleteCode(index)">
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    encodedText() {
      this.cipher;
      this.newCode;
      return this.originalText
        .split("")
        .map((c) => (this.cipher[c] != null ? this.cipher[c] : c))
        .reduce((acc, curr) => acc + curr);
    },
  },
  data() {
    return {
      cipher: {
        L: "a",
        " ": "/",
      },
      originalText:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis corporis porro suscipit architecto itaque odio voluptates sit delectus consequuntur. Nulla ullam autem itaque non, ex laboriosam ea excepturi eum repudiandae!",
      newCode: {
        original: "",
        new: "",
      },
    };
  },
  methods: {
    addCode() {
      this.cipher[this.newCode.original] = !this.newCode.new
        ? ""
        : this.newCode.new;
      this.newCode = {
        original: "",
        new: "",
      };
    },
    deleteCode(index) {
      delete this.cipher[index];
      this.$forceUpdate();
      this.newCode = {
        original: "",
        new: "",
      };
    },
  },
};
</script>

<style scoped></style>
