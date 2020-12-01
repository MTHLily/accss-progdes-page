<template>
  <div class="container">
    <div class="card">
      <div class="card-header">
        <h5 class="card-title">Add New</h5>
      </div>
      <div class="card-body">
        <div class="input-group">
          <div class="input-group-prepend">
            <select class="custom-select" v-model="newItem.course">
              <option value="BS-IT">BS-IT</option>
              <option value="BS-IS">BS-IS</option>
              <option value="BS-CS">BS-CS</option>
              <option value="BS-DS">BS-DS</option>
            </select>
          </div>
          <input
            type="text"
            class="form-control"
            placeholder="Name"
            v-model="newItem.name"
          />
          <input
            type="number"
            min="1"
            max="4"
            class="form-control"
            placeholder="Year Level"
            v-model="newItem.year"
          />
          <div class="input-group-append">
            <button
              class="btn btn-outline-success"
              :disabled="valid"
              @click="addItem"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
    <table class="table">
      <thead>
        <th>Name</th>
        <th>Course</th>
        <th>Year</th>
        <th>Actions</th>
      </thead>
      <tbody v-if="items.length != 0">
        <tr v-for="item in items" :key="item.index">
          <td>{{ item.name }}</td>
          <td>{{ item.course }}</td>
          <td>{{ item.year }}</td>
          <td class="d-flex justify-center align-center">
            <button class="btn btn-danger" @click="deleteItem(item.index)">
              &times;
            </button>
          </td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr>
          <td colspan="4" class="text-center">No items found.</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  computed: {
    valid() {
      return (
        this.newItem.name == null ||
        this.newItem.course == null ||
        this.newItem.year > 5 ||
        this.newItem.year < 0 ||
        this.newItem.year == null
      );
    },
  },
  data() {
    return {
      items: [
        {
          name: "Mike Espera",
          course: "BS-CS",
          year: 3,
        },
      ],
      newItem: {
        name: null,
        course: null,
        year: null,
      },
    };
  },
  methods: {
    deleteItem(index) {
      this.items.splice(index, 1);
    },
    addItem() {
      this.items.push(this.newItem);
      this.newItem = {
        name: null,
        course: null,
        year: null,
      };
    },
  },
};
</script>

<style></style>
