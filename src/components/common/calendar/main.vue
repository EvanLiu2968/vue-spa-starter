<template>
  <div class="el-calendar">
    <el-row class="app-calendar__header">
      <el-col :span="12" class="app-calendar__header-item app-calendar__divided">
        <div class="app-calendar__header-day">{{ now.format('dd') }}</div>
        <div class="app-calendar__header-week">{{ now.format('星期E') }}</div>
      </el-col>
      <el-col :span="12" class="app-calendar__header-item">
        <div>
          <div class="el-calendar__button-group pull-left" v-if="validatedRange.length === 0">
            <span class="el-calendar__button" @click="selectDate('prev-month')"><i class="el-icon-arrow-left"></i></span>
          </div>
          <span class="app-calendar__header-date">{{ i18nDate }}</span>
          <div class="el-calendar__button-group pull-right" v-if="validatedRange.length === 0">
            <span class="el-calendar__button" @click="selectDate('next-month')"><i class="el-icon-arrow-right"></i></span>
          </div>
        </div>
        <div class="app-calendar__header-lunar">{{ lunarDate }}</div>
      </el-col>
    </el-row>
    <div
      class="el-calendar__body"
      v-if="validatedRange.length === 0"
      key="no-range">
      <date-table
        :date="date"
        :selected-day="realSelectedDay"
        :first-day-of-week="realFirstDayOfWeek"
        @pick="pickDay" />
    </div>
    <div
      v-else
      class="el-calendar__body"
      key="has-range">
      <date-table
        v-for="(range, index) in validatedRange"
        :key="index"
        :date="range[0]"
        :selected-day="realSelectedDay"
        :range="range"
        :hide-header="index !== 0"
        @pick="pickDay" />
    </div>
    <slot name="calendar-footer"></slot>
  </div>
</template>

<script>
import Locale from 'element-ui/src/mixins/locale'
import fecha from 'element-ui/src/utils/date'
import DateTable from './date-table'
import { validateRangeInOneMonth } from 'element-ui/src/utils/date-util'

import lunar from './lunar'

const validTypes = ['prev-month', 'today', 'next-month']
const oneDay = 86400000

export default {
  name: 'ElCalendar',

  components: {
    DateTable
  },

  mixins: [Locale],

  props: {
    value: [Date, String, Number],
    range: {
      type: Array,
      validator(range) {
        if (Array.isArray(range)) {
          return range.length === 2 && range.every(
            item => typeof item === 'string' ||
            typeof item === 'number' ||
            item instanceof Date)
        } else {
          return true
        }
      }
    },
    firstDayOfWeek: {
      type: Number,
      default: 1
    }
  },

  provide() {
    return {
      elCalendar: this
    }
  },

  data() {
    const now = new Date()
    return {
      selectedDay: '',
      now,
      lunarDate: `农历${lunar.getMonth(now)}${lunar.getDay(now)}`
    }
  },

  computed: {
    prevMonthDatePrefix() {
      const temp = new Date(this.date.getTime())
      temp.setDate(0)
      return fecha.format(temp, 'yyyy-MM')
    },

    curMonthDatePrefix() {
      return fecha.format(this.date, 'yyyy-MM')
    },

    nextMonthDatePrefix() {
      const temp = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 1)
      return fecha.format(temp, 'yyyy-MM')
    },

    formatedDate() {
      return fecha.format(this.date, 'yyyy-MM-dd')
    },

    i18nDate() {
      const year = this.date.getFullYear()
      const month = this.date.getMonth() + 1
      return `${year} ${this.t('el.datepicker.year')} ${this.t('el.datepicker.month' + month)}`
    },

    formatedToday() {
      return fecha.format(this.now, 'yyyy-MM-dd')
    },

    realSelectedDay: {
      get() {
        if (!this.value) return this.selectedDay
        return this.formatedDate
      },
      set(val) {
        this.selectedDay = val
        const date = new Date(val)
        this.$emit('input', date)
      }
    },

    date() {
      if (!this.value) {
        if (this.realSelectedDay) {
          return new Date(this.selectedDay)
        } else if (this.validatedRange.length) {
          return this.validatedRange[0][0]
        }
        return this.now
      } else {
        return this.toDate(this.value)
      }
    },

    // if range is valid, we get a two-digit array
    validatedRange() {
      let range = this.range
      if (!range) return []
      const expetedMap = {
        0: {
          value: 1,
          message: 'start of range should be Monday.'
        },
        1: {
          value: 0,
          message: 'end of range should be Sunday.'
        }
      }
      range = range.reduce((prev, val, index) => {
        const date = this.toDate(val)
        if (date.getDay() !== expetedMap[index].value) {
          console.warn('[ElementCalendar]', expetedMap[index].message, ' invalid range will be ignored')
        } else {
          prev = prev.concat(date)
        }
        return prev
      }, [])
      if (range.length === 2) {
        const [start, end] = range
        if (start > end) {
          console.warn('[ElementCalendar]end time should be greater than start time')
          return []
        }
        // start time and end time in one month
        if (validateRangeInOneMonth(start, end)) {
          return [
            [start, end]
          ]
        }
        const data = []
        let startDay = new Date(start.getFullYear(), start.getMonth() + 1, 1)
        const lastDay = this.toDate(startDay.getTime() - oneDay)
        if (!validateRangeInOneMonth(startDay, end)) {
          console.warn('[ElementCalendar]start time and end time interval must not exceed two months')
          return []
        }
        data.push([
          start,
          lastDay
        ])
        let interval = startDay.getDay()
        interval = interval <= 1 ? Math.abs(interval - 1) : (8 - interval)
        startDay = this.toDate(startDay.getTime() + interval * oneDay)
        if (startDay.getDate() < end.getDate()) {
          data.push([
            startDay,
            end
          ])
        }
        return data
      }
      return []
    },

    realFirstDayOfWeek() {
      if (this.firstDayOfWeek < 1 || this.firstDayOfWeek > 6) {
        return 0
      }
      return Math.floor(this.firstDayOfWeek)
    }
  },

  methods: {
    pickDay(day) {
      this.realSelectedDay = day
    },

    selectDate(type) {
      if (validTypes.indexOf(type) === -1) {
        throw new Error(`invalid type ${type}`)
      }
      let day = ''
      if (type === 'prev-month') {
        day = `${this.prevMonthDatePrefix}-01`
      } else if (type === 'next-month') {
        day = `${this.nextMonthDatePrefix}-01`
      } else {
        day = this.formatedToday
      }

      if (day === this.formatedDate) return
      this.pickDay(day)
    },

    toDate(val) {
      if (!val) {
        throw new Error('invalid val')
      }
      return val instanceof Date ? val : new Date(val)
    }
  }
}
</script>
