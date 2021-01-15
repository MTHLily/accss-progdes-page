<template>
  <div class="container">
    <h1 class="display-6 text-center">College Scheduler</h1>
    <p class="lead text-justify">
      Create a schedule application that will take a class and its details and
      display it on a schedule. A class can only occur between 6AM up until 8AM.
      Additionally, give it a feature that allows users to export and import
      their schedules.
    </p>
    <div class="d-flex justify-content-center m-4">
      <ul class="list-group w-50">
        <li class="list-group-item bg-light">Criteria</li>
        <li class="list-group-item">
          Add a scheduled class.
          <span class="float-right">2 pts</span>
        </li>
        <li class="list-group-item">
          Add validation for the subject name, start and end times
          <b>with no overlap</b>, day and professor name.
          <span class="float-right">3 pts</span>
        </li>
        <li class="list-group-item">
          Display the schedule on a table.<span class="float-right">5 pts</span>
        </li>
        <li class="list-group-item">
          Remove a scheduled class.<span class="float-right">2 pts</span>
        </li>
        <li class="list-group-item">
          Export a schedule as a file.<span class="float-right">1 pt</span>
        </li>
        <li class="list-group-item">
          Import a schedule from an uploaded file.<span class="float-right"
            >2 pts</span
          >
        </li>
      </ul>
    </div>

    <div></div>

    <div class="row p-4 bg-light">
      <div class="col-9">
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text">Subject</span>
          </div>
          <input type="text" class="form-control" v-model="newSlot.subject" />
        </div>
        <div
          class="input-group mb-3"
          v-for="(slot, index) in newSlot.time"
          :key="index"
        >
          <div class="input-group-prepend">
            <span class="input-group-text">{{ index }}</span>
          </div>
          <input
            type="number"
            min="1"
            max="12"
            class="form-control"
            v-model="slot.hours"
          />
          <input
            type="number"
            min="0"
            max="60"
            class="form-control"
            v-model="slot.minutes"
          />
          <div class="input-group-append">
            <div class="input-group-text">
              <input
                class="mx-1"
                type="radio"
                v-model="slot.AM"
                :name="`${index}-AMPM`"
                :value="true"
                :id="`${index}-AM`"
              />
              <label :for="`${index}-AM`" class="mb-0">AM</label>
              <input
                class="mx-1"
                type="radio"
                v-model="slot.AM"
                :name="`${index}-AMPM`"
                :value="false"
                :id="`${index}-PM`"
              />
              <label :for="`${index}-PM`" class="mb-0">PM</label>
            </div>
          </div>
        </div>
        <div class="input-group mb-3">
          <div class="input-group-append">
            <div class="input-group-text bg-white">
              Day:
              <div
                v-for="(day, index) in days"
                :key="index"
                class="d-inline-block mx-1"
              >
                <input
                  type="radio"
                  name="day"
                  class="mr-1"
                  v-model="newSlot.day"
                  :id="`day-${index}`"
                  :value="index"
                />
                <label :for="`day-${index}`">{{ day }}</label>
              </div>
            </div>
          </div>
        </div>
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text">Professor</span>
          </div>
          <input type="text" class="form-control" v-model="newSlot.professor" />
        </div>
        <button class="btn btn-primary" :disabled="!validSlot" @click="addSlot">
          Add Subject
        </button>
      </div>
      <div class="col-3">
        <div class="row p-4 mx-auto">
          <h4 class="mx-auto">Import Schedule</h4>
          <input
            type="file"
            accept="application/JSON"
            class="mx-auto"
            @change="importSchedule"
          />
        </div>
        <div class="row p-4 mx-auto">
          <a
            class="btn btn-success mx-auto"
            download="schedule.json"
            :href="scheduleJSON"
            >Export Schedule</a
          >
        </div>
      </div>
    </div>

    <div class="schedule-container mt-4">
      <table class="table">
        <tr>
          <td width="50px">Time</td>
          <td width="100px">Monday</td>
          <td width="100px">Tuesday</td>
          <td width="100px">Wednesday</td>
          <td width="100px">Thursday</td>
          <td width="100px">Friday</td>
          <td width="100px">Saturday</td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td><span>7:00AM</span></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td><span>8:00AM</span></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td><span>9:00AM</span></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td><span>10:00AM</span></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td><span>11:00AM</span></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td><span>12:00NN</span></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td><span>1:00PM</span></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td><span>2:00PM</span></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td><span>3:00PM</span></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td><span>4:00PM</span></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td><span>5:00PM</span></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td><span>6:00PM</span></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td><span>7:00PM</span></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td><span>8:00PM</span></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </table>

      <div
        class="timeslot"
        v-for="(slot, index) in schedule"
        :key="index"
        :style="slotStyle(slot)"
      >
        <button class="close" @click="schedule.splice(index, 1)">
          &times;
        </button>
        <div class="timeslot-title">{{ slot.subject }}</div>
        <div class="timeslot-time">
          {{ `${timeString(slot.time.Start)} - ${timeString(slot.time.End)}` }}
        </div>
        <div class="timeslot-time">{{ slot.professor }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    scheduleJSON() {
      return (
        "data:text/json;charset=utf-8," +
        encodeURIComponent(JSON.stringify(this.schedule))
      );
    },
    validSlot() {
      if (
        !this.newSlot.subject ||
        !this.newSlot.professor ||
        !this.newSlot.time.Start.minutes ||
        !this.newSlot.time.End.minutes ||
        this.newSlot.time.Start.hours > 12 ||
        this.newSlot.time.Start.hours < 1 ||
        this.newSlot.time.Start.minutes > 60 ||
        this.newSlot.time.Start.minutes < 0 ||
        this.newSlot.time.End.hours > 12 ||
        this.newSlot.time.End.hours < 1 ||
        this.newSlot.time.End.minutes > 60 ||
        this.newSlot.time.End.minutes < 0
      )
        return false;

      const startInMinutes = this.absoluteTimeInMinutes(
        this.newSlot.time.Start
      );
      const endInMinutes = this.absoluteTimeInMinutes(this.newSlot.time.End);

      //Only accepts from 6AM to 8PM, and starttime starts before endtime
      if (
        startInMinutes <= 6 * 60 - 1 ||
        endInMinutes <= 6 * 60 - 1 ||
        startInMinutes >= 20 * 60 + 1 ||
        endInMinutes >= 20 * 60 + 1 ||
        startInMinutes >= endInMinutes
      )
        return false;

      let overlap = true;

      this.schedule.forEach((slot) => {
        if (slot.day == this.newSlot.day) {
          if (
            (startInMinutes >= this.absoluteTimeInMinutes(slot.time.Start) &&
              startInMinutes <= this.absoluteTimeInMinutes(slot.time.End)) ||
            (endInMinutes >= this.absoluteTimeInMinutes(slot.time.Start) &&
              endInMinutes <= this.absoluteTimeInMinutes(slot.time.End))
          )
            overlap = false;
        }
      });

      return overlap;
    },
  },
  data() {
    return {
      schedule: [
        {
          subject: "CS 1234",
          day: 2,
          time: {
            Start: {
              hours: 7,
              minutes: 40,
              AM: true,
            },
            End: {
              hours: 1,
              minutes: 0,
              AM: false,
            },
          },
          professor: "Sir Marco",
        },
      ],
      days: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      newSlot: {
        subject: "",
        day: 0,
        time: {
          Start: {
            hours: 6,
            minutes: 40,
            AM: true,
          },
          End: {
            hours: 7,
            minutes: 20,
            AM: true,
          },
        },
        professor: "",
      },
    };
  },
  methods: {
    addSlot() {
      this.schedule.push(this.newSlot);
      this.newSlot = {
        subject: "",
        day: 0,
        time: {
          Start: {
            hours: 6,
            minutes: 40,
            AM: true,
          },
          End: {
            hours: 7,
            minutes: 20,
            AM: true,
          },
        },
        professor: "",
      };
    },
    absoluteTimeInMinutes(time) {
      return (
        parseInt(time.hours * 60) +
        parseInt(time.minutes) +
        parseInt(!time.AM * 12 * 60)
      );
    },
    timeString(time) {
      const minutes = time.minutes < 10 ? "0" + time.minutes : time.minutes;
      return `${time.hours}:${minutes}`;
    },
    slotStyle(slot) {
      const translateY = this.absoluteTimeInMinutes(slot.time.Start) - 6 * 60;
      const translateX = slot.day > 0 ? slot.day * 160 + 1 : 0;
      const height = this.totalMinutes(slot.time.Start, slot.time.End);

      return `transform: translate( ${translateX}px, ${translateY}px ); height: ${height}px`;
    },
    totalMinutes(start, end) {
      return (
        this.absoluteTimeInMinutes(end) - this.absoluteTimeInMinutes(start)
      );
    },
    importSchedule(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.setSchedule(files[0]);
    },
    setSchedule(schedule) {
      let reader = new FileReader();
      reader.onload = (e) => {
        this.schedule = JSON.parse(e.target.result);
        // console.log(this.readFile);
      };
      reader.readAsText(schedule);
    },
  },
};
</script>

<style scoped>
.schedule-container {
  position: relative;
}

.schedule-container td {
  text-align: center;
  vertical-align: top;
  height: 20px !important;
}

.schedule-container tr {
  height: 60px !important;
}

.schedule-container table tr:not(*:first-child) td {
  padding: 0;
  margin: 0;
  transform: translateY(-0.75rem);
}

.schedule-container table tr:not(*:first-child) td:first-child span {
  background: white;
}

.timeslot {
  overflow: auto;
  word-wrap: break-word;
  position: absolute;
  top: 60px;
  left: 139px;
  width: 160px;
  border-radius: 5px;
  padding: 1%;
  border: 1px solid lightgray;
  background: white;
}
</style>
