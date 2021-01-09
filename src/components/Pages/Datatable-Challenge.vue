<template>
  <div class="container">
    <h1 class="display-6 text-center">Datatables</h1>
    <p class="lead text-justify">
      Create a table that displays an array of students. You can add a student,
      however, you may not add one with bad data ( no course, no name and year
      level out of bounds (1-5) ). You can also remove students from the list.
      If you click the headers for name, course or year, it will sort the table.
      Clicking once will set the sorting mode to that header. Clicking beyond
      that toggles whether the data is sorted in ascending or descending order.
      When you add a student, the table is automatically sorted.
    </p>
    <div class="d-flex justify-content-center m-4">
      <ul class="list-group  w-50">
        <li class="list-group-item">Criteria</li>
        <li class="list-group-item">
          Show all students <span class="float-right">2 pts</span>
        </li>
        <li class="list-group-item">
          Add a student <span class="float-right">1 pts</span>
        </li>
        <li class="list-group-item">
          Update a student <span class="float-right">2 pts</span>
        </li>
        <li class="list-group-item">
          Delete a student <span class="float-right">2 pts</span>
        </li>
        <li class="list-group-item">
          Search through the table <span class="float-right">3 pts</span>
        </li>
        <li class="list-group-item">
          Order by name, course or year <span class="float-right">3 pts</span>
        </li>
      </ul>
    </div>
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

    <input
      type="text"
      class="form-control mt-3"
      placeholder="Search..."
      v-model="searchTerm"
    />

    <table class="table table-borderless">
      <thead>
        <th v-for="(header, index) in headers" :key="index">
          <button class="table-header" @click="sortTableFn(index)">
            {{ header.name }}
            <span v-if="index == sortTable.ind" class="table-header-desc">{{
              sortTable.desc ? "˅" : "˄"
            }}</span>
          </button>
        </th>
        <th>
          <button class="table-header">
            Actions
          </button>
        </th>
      </thead>
      <tbody v-if="items.length != 0">
        <tr v-for="(item, index) in tableItems" :key="index">
          <td>{{ item.name }}</td>
          <td>{{ item.course }}</td>
          <td>{{ item.year }}</td>
          <td class="d-flex justify-content-center">
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
  props: ["title", "description"],
  computed: {
    tableItems() {
      return this.items.filter((item) => {
        var isTrue = false;

        if (item.name.indexOf(this.searchTerm) >= 0) isTrue = true;
        if (item.course.indexOf(this.searchTerm) >= 0) isTrue = true;
        if (item.year == this.searchTerm) isTrue = true;

        return isTrue;
      });
    },
    valid() {
      return (
        this.newItem.name == null ||
        this.newItem.course == null ||
        this.newItem.year > 6 ||
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
      headers: [
        {
          name: "Name",
          model: "name",
        },
        {
          name: "Course",
          model: "course",
        },
        {
          name: "Year",
          model: "year",
        },
      ],
      sortTable: {
        ind: 0,
        desc: true,
      },
      newItem: {
        name: null,
        course: null,
        year: null,
      },
      searchTerm: "",
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
      this.sortTableFn(null, false);
    },
    sortTableFn(ind, change = true) {
      if (change) {
        if (this.sortTable.ind == ind)
          this.sortTable.desc = !this.sortTable.desc;
        else this.sortTable.ind = ind;
      }
      this.items.sort((a, b) => {
        if (this.sortTable.ind < 2) {
          const compare =
            a[this.headers[this.sortTable.ind].model] >
            b[this.headers[this.sortTable.ind].model]
              ? 1
              : -1;
          return this.sortTable.desc ? compare : -compare;
        } else {
          const compare =
            a[this.headers[this.sortTable.ind].model] -
            b[this.headers[this.sortTable.ind].model];
          return this.sortTable.desc ? compare : -compare;
        }
      });
    },
  },
};
</script>

<style scoped>
.table-header {
  position: relative;
  font-weight: bold;
  background: rgba(0, 0, 0, 0);
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
}

.table-header-desc {
  font-weight: normal;
  position: absolute;
  right: 1rem;
}
</style>
