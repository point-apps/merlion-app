import { ref } from 'vue'
import { format } from 'date-fns'
import { useDateHelper } from '@/composable/date-helper'

const dateHelper = useDateHelper()
const currentDate = new Date()
const dateFrom = ref<string>(format(currentDate, 'dd-MM-yyyy'))
const dateTo = ref<string>(format(currentDate, 'dd-MM-yyyy'))
const filterYear = ref<number>(Number(format(currentDate, 'yyyy')))
const filterSemester = ref<string>(dateHelper.getCurrentSemester(currentDate))

export function useFilterHelper() {
  const update = () => {
    currentDate.setFullYear(Number(filterYear.value))
    if (filterSemester.value === 'odd') {
      dateFrom.value = format(currentDate, '01-01-yyyy')
      dateTo.value = format(currentDate, '30-06-yyyy')
    } else {
      dateFrom.value = format(currentDate, '01-07-yyyy')
      dateTo.value = format(currentDate, '31-12-yyyy')
    }
  }

  return { currentDate, dateFrom, dateTo, filterSemester, filterYear, update }
}
